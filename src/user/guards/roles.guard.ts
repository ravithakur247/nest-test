

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.decodedData;

        /**
         * due to lack of time here i am just checking the role we can also make a req to db for updated access levels of roles
         */

        return roles.some((role) => {
            return role === user.role.role;
        });
    }
}
