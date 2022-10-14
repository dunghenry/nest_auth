import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import hbs = require("hbs");
import { join, resolve } from "path";
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useStaticAssets(resolve("./src/public"));
    app.setBaseViewsDir(resolve("./src/views"));
    hbs.registerPartials(resolve("./src/views/partials/"));
    // app.useStaticAssets(join(__dirname, "..", "public"))
    // app.setBaseViewsDir(join(__dirname, "..", "views"));
    // hbs.registerPartials(join(__dirname, "..", "views", "partials/"));

    app.setViewEngine("hbs");
    const port = process.env.PORT || 4000;
    console.log(`Server listening on http://localhost:${port}`);
    await app.listen(port);
}
bootstrap();
