import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import EventCodeEntity from "../event/event-code.entity";
import jwtConfig from "../config/jwt.config";
import AuthService from "./auth.service";

@Module({
    imports: [
        JwtModule.register({ secret: jwtConfig.secret }),
        TypeOrmModule.forFeature([EventCodeEntity]),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export default class AuthModule {}
