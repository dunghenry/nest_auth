import { VerifyMiddleware } from "./verify.middleware";
/* eslint-disable @typescript-eslint/no-var-requires */
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { MulterModule } from "@nestjs/platform-express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MulterModule.register({
            dest: "./uploads",
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VerifyMiddleware)
            .forRoutes({ path: "user", method: RequestMethod.GET });
    }
}
