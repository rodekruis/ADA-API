import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import AuthService from "./auth.service";

@Injectable()
export default class EventGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const eventId = request.params.id;
        return this.authService.verifyEventAccess(eventId, authHeader);
    }
}
