import jwt from "jsonwebtoken";
import { initServer } from "@ts-rest/express";
import { UserContract } from "@/contracts";
import { prisma } from "@/prisma";
import { encrypt } from "@/utils";

const s = initServer();

const UserRouter = s.router(UserContract, {
    register : async ({ body : { name, email, password }}) => {
      const userExists = await prisma.user.findFirst({ where : { email }});
      if(userExists) return { 
        status : 400,
        body : {
          message : "User already exists"
        }
      }
      const {password : _, ...user} = await prisma.user.create({ data : { name, email, password : encrypt(password) }});    
      const token = jwt.sign({ id : user.id}, process.env.ACCESS_TOKEN_SECRET);
      return {
        status : 201,
        body : {
          ...user,
          token
        }
      }
    },

    login : async ({ body : { email, password } }) => {
      const user = await prisma.user.findFirst({ where : { email }});
      const IncorrectUserOrPasswordResponse = {
        status : 400,
        body : {
          message : "Username or password incorrect"
        }
      } as const;
      if(!user) return IncorrectUserOrPasswordResponse;
      if(user.password !== encrypt(password)) return IncorrectUserOrPasswordResponse;
      const token = jwt.sign({ id : user.id}, process.env.ACCESS_TOKEN_SECRET);
      return {
        status : 200,
        body : {
          name : user.name,
          email : user.email,
          id : user.id,
          token
        }
      }
    }
});

export default UserRouter;