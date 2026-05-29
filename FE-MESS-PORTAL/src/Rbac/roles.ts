import { Role } from 'Common/types/api.types';

export const ROLE = {
  STUDENT: 'Student',
  WARDEN: 'Warden',
  MESS_SECRETARY: 'Mess Secretary',
  MESS_OWNER: 'Mess Owner',
  OTHER: 'Other',
} as const satisfies Record<string, Role>;

export const PERMISSION = {
  ADD_ADMIN: 'admin:add',
  ADD_MESS_INFO: 'messInfo:add',
  UPDATE_MESS_INFO: 'messInfo:update',
  ADD_MESS_INFO_CONTACT: 'messInfo:addContact',
  UPLOAD_MENU: 'menu:upload',
  UPDATE_MENU: 'menu:update',
  ADD_ANNOUNCEMENT: 'announcement:add',
  DELETE_ANNOUNCEMENT: 'announcement:delete',
  DELETE_COMPLAINT: 'complaint:delete',
  ACTION_COMPLAINT: 'complaint:action',
  ACTION_LEAVE: 'leave:action',
} as const;

export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];

export const ROLE_PERMISSIONS: Record<Role, ReadonlyArray<Permission>> = {
  Student: [],
  Warden: [
    PERMISSION.ADD_ADMIN,
    PERMISSION.ADD_MESS_INFO,
    PERMISSION.UPDATE_MESS_INFO,
    PERMISSION.ADD_ANNOUNCEMENT,
    PERMISSION.DELETE_ANNOUNCEMENT,
    PERMISSION.DELETE_COMPLAINT,
    PERMISSION.ACTION_COMPLAINT,
    PERMISSION.ACTION_LEAVE,
  ],
  'Mess Secretary': [
    PERMISSION.ADD_MESS_INFO,
    PERMISSION.ADD_MESS_INFO_CONTACT,
    PERMISSION.UPLOAD_MENU,
    PERMISSION.UPDATE_MENU,
    PERMISSION.ADD_ANNOUNCEMENT,
    PERMISSION.DELETE_ANNOUNCEMENT,
  ],
  'Mess Owner': [
    PERMISSION.ADD_MESS_INFO,
    PERMISSION.ADD_MESS_INFO_CONTACT,
    PERMISSION.UPLOAD_MENU,
    PERMISSION.UPDATE_MENU,
    PERMISSION.DELETE_ANNOUNCEMENT,
    PERMISSION.ACTION_LEAVE,
  ],
  Other: [],
};

export const ADMIN_ROLES: ReadonlyArray<Role> = [
  ROLE.WARDEN,
  ROLE.MESS_SECRETARY,
  ROLE.MESS_OWNER,
  ROLE.OTHER,
];

export const isAdminRole = (role: Role | undefined | null): boolean => {
  if (!role) return false;
  return (ADMIN_ROLES as ReadonlyArray<string>).includes(role);
};

export const isStudentRole = (role: Role | undefined | null): boolean => role === ROLE.STUDENT;
