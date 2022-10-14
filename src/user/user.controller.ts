import { UserService } from "./user.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import bcrypt = require("bcrypt");
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }
    @Post("/register")
    async register(
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const rs = await this.userService.register(
            username,
            email,
            hashedPassword,
        );
        return rs;
    }
    @Post("/login")
    async login(
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        const rs = await this.userService.login(email, password);
        return rs;
    }
}
