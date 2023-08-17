type UserType = {
  id: number;
  email: string;
};

type ProfileType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePhoto?: string;
  coverPhoto?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

type UserProfileType = UserType & {
  profile: ProfileType | null;
};
