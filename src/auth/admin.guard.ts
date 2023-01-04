/* eslint-disable class-methods-use-this */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!(authHeader && authHeader.startsWith('Bearer ')))
            throw new UnauthorizedException();
        const token = authHeader.substring(7, authHeader.length);
        return token === process.env.ADMIN_CODE;
    }
}
