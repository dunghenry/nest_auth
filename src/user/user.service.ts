import { UserDto } from "./user.dto";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "./interfaces/user.interface";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
    constructor(
        @InjectModel("User") private readonly userModel: Model<IUser>,
        private readonly jwtService: JwtService,
    ) {}
    async getUsers(): Promise<UserDto[]> {
        const users = await this.userModel.find();
        if (!users) {
            throw new HttpException("Not Found", 404);
        }
        return users;
    }
    async register(
        username: string,
        email: string,
        hashedPassword: string,
    ): Promise<UserDto> {
        const car = await new this.userModel({
            username,
            email,
            password: hashedPassword,
        });
        return car.save();
    }
    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        // console.log(user);
        if (user) {
            const isValidPass = await bcrypt.compare(password, user.password);
            if (isValidPass) {
                const accessToken = this.jwtService.sign({ userId: user._id });
                return { user, accessToken };
            }
        }
    }
}
