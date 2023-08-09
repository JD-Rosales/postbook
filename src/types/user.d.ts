export type UserType = {
  id: number;
  email: string;
};

export type ProfileType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePhoto?: string;
  coverPhoto?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type UserProfileType = UserType & {
  profile: ProfileType | null;
};
