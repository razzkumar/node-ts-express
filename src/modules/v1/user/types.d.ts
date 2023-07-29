import { User as UserWithPassowrd } from '@prisma/client';

import { sortFields, sortOrder } from './user.constants';

export type SortField = (typeof sortFields)[number];
export type SortOrder = (typeof sortOrder)[number];

export interface User extends Omit<UserWithPassowrd, 'password'> {
  password?: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
  sortField?: SortField;
}
