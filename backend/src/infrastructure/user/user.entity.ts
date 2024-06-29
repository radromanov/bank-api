export interface UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  roles: ("BASIC_ROLE" | "ADMIN_ROLE")[];
  isVerified: boolean;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}
