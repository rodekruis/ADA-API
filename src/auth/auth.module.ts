import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import EventCodeEntity from "src/event/event-code.entity";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "src/config/jwt.config";
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
