import { useAppSelector } from 'Redux/Store';
import { Permission, ROLE_PERMISSIONS } from './roles';

interface IPermissionApi {
  has: (permission: Permission) => boolean;
  hasAny: (permissions: ReadonlyArray<Permission>) => boolean;
}

export const usePermission = (): IPermissionApi => {
  const user = useAppSelector((state) => state.auth.user);
  const granted = user ? ROLE_PERMISSIONS[user.role] : [];

  const has = (permission: Permission): boolean => granted.includes(permission);
  const hasAny = (permissions: ReadonlyArray<Permission>): boolean =>
    permissions.some((p) => granted.includes(p));

  return { has, hasAny };
};
