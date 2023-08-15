import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async function Auth(req : Request, res : Response, next : NextFunction){
    const idToken = req.headers.authorization?.split(" ")[1];
    
    if(!idToken) return res.status(400).json({ message : "unauthorized" });
    jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET, (err : any, payload : any) => {
      if (err) return res.status(400).json({ message : "unauthorized" });
      req.userId = (payload as { id : number }).id;
      next();
    });   
}