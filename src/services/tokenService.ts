// src/services/userService.ts
import jwt from "jsonwebtoken";
import { ENVIRONMENT, ERROR_ENVIRONMENT } from "../config/environment.js";

interface TokenPayload {
    userId: number;
    typeUser: number;
  }

class TokenService {

    decodeToken(token: string) {
        try {
            token = this.paramaToken(token);
            const decoded = jwt.verify(token, ENVIRONMENT.jwtSecret) as TokenPayload;

            if (typeof decoded?.userId === "undefined" || typeof decoded?.typeUser === "undefined") {
                throw new Error(ERROR_ENVIRONMENT.INVALID_TOKEN_DECODE);
            }

            return { decoded };

        } catch (error) {
            throw new Error(ERROR_ENVIRONMENT.INVALID_TOKEN);
        }
    }

    generateToken(userId: number, typeUser: number): string {
        try{
            const payload: TokenPayload = { userId, typeUser };
            return jwt.sign(payload, ENVIRONMENT.jwtSecret, { expiresIn: "1h" });
        } catch (error){
            throw new Error(JSON.stringify(ERROR_ENVIRONMENT.ERROR_GENERATING_TOKEN));
        }
    }

    paramaToken(token: string){
        
        if(!token) throw new Error(ERROR_ENVIRONMENT.MISSING_PARAMETERS);
        
        return token;
    }
}

export { TokenService };
