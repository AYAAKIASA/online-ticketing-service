import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum'; // 올바른 상대 경로

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);