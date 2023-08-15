import { UserSchema } from '@/prisma';
import { initContract } from '@ts-rest/core';
import {  z } from 'zod';

const contract = initContract();

const UserContract = contract.router({
    register: {
        method : 'POST',
        path: '/register',
        responses:{
            400 : contract.type<{ message: "User already exists" }>(),
            201: UserSchema
                  .omit({ password : true})
                  .merge(z.object({ token : z.string() }))
        },
        body: UserSchema.pick({ name : true, email : true, password : true}),
        summary : 'Register a user'
    },
    login: {
        method : 'POST',
        path : '/login',
        responses:{
          200 : UserSchema
                  .omit({ password : true})
                  .merge(z.object({ token : z.string() })),
          400 : contract.type<{ message : "Username or password incorrect"}>(),
        },
        body: UserSchema.pick({ email : true, password : true }),
        summary : 'login a user'
    }
}, {
    strictStatusCodes : true
});

export default UserContract;