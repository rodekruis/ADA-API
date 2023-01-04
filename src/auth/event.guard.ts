import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthService from './auth.service';

@Injectable()
export default class EventGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const eventId = request.params.id;
        let token;
        if (authHeader) {
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7, authHeader.length);
                if (!token) throw new UnauthorizedException();
            } else throw new UnauthorizedException();
        }
        const isAdmin = token === process.env.ADMIN_CODE;
        return isAdmin || this.authService.verifyEventAccess(eventId, token);
    }
}
