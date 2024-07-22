import { AppError } from "@errors/AppError";
import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";

export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
    
    const token = request.headers.authorization;

    if(!token)
    {
        throw new AppError("Token Missing", 402);
    }

    try{        
        const decoded = verify(token, "brasil123");

        if(!decoded.sub)
        {
            throw new  AppError("User does not exist.", 402)
        }

        const userId = decoded.sub.toString();

        if(userId != request.headers.userId)
        {
            throw new  AppError("User does not exist.", 402)
        }

        if(!request.headers.isAdmin)
        {
            throw new  AppError("User ins't admin", 402)
        }

        next();
    }catch{
        throw new AppError("Invalid Token", 402);
    }

    

    
} 
    
