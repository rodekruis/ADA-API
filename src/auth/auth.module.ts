import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from '../config/jwt.config';
import EventEntity from '../event/event.entity';
import EventCodeEntity from '../event/event-code.entity';
import AuthService from './auth.service';

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
