import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
interface IRequest extends Request {
    userId: string;
}
import * as jwt from "jsonwebtoken";
@Injectable()
export class VerifyMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        const token = req.headers.token;
        const accessToken = token.slice(7);
        const rs = accessToken.toString();
        jwt.verify(
            rs,
            process.env.ACCESS_TOKEN_SECRET,
            (err, userId: string) => {
                if (err) {
                    console.error("You are not allowed to access");
                    throw new HttpException(
                        "You are not allowed to access",
                        401,
                    );
                }
                req.userId = userId;
                next();
            },
        );
    }
}
