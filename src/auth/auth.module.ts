import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import AuthService from "./auth.service";
import EventCodeEntity from "../event/event-code.entity";
import EventEntity from "../event/event.entity";

@Module({
    imports: [
        JwtModule.register({ secret: jwtConfig.secret }),
        TypeOrmModule.forFeature([EventCodeEntity]),
        TypeOrmModule.forFeature([EventEntity]),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export default class AuthModule {}
