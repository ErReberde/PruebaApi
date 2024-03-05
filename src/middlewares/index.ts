import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction } from "express"
import { JwtPayload, verify } from 'jsonwebtoken'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req:Request, res:Response, next: NextFunction){
        try{
            const authorization = req.headers["authorization"]

            const method = authorization?.split(" ")[0]
            const token = authorization?.split(" ")[1]

            let tokenBody: string | JwtPayload
            
            tokenBody = verify(token, process.env.SECRET_WORD)

            if(tokenBody){ 
                req.body["user_data"] = tokenBody
                return next()
            
            }
        }
        catch(e){

            throw new HttpException("Token inválido o expirado" , HttpStatus.UNAUTHORIZED)
        }
    }
}