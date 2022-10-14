import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
@Module({
    imports: [
        JwtModule.register({
            secret: "key",
            signOptions: {
                expiresIn: "5h",
            },
        }),
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
