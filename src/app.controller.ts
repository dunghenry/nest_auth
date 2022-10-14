import {
    Bind,
    Body,
    Controller,
    Get,
    ParseFilePipeBuilder,
    Post,
    Render,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";
import { AppService } from "./app.service";
import { v4 as uuidv4 } from "uuid";
import { of } from "rxjs";
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Get()
    @Render("index.hbs")
    root() {
        return { title: "Home Page" };
    }
    @Post("upload")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./uploads");
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return of({ imagePath: file.filename });
    }
}
