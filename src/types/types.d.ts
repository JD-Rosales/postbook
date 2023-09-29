type CloudinaryRes = {
  access_mode: string;
  asset_id: string;
  bytes: 88107;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: 750;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: [];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

type Post = {
  id: number;
  postType: string;
  photo?: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  sharedPostId: number | null;
  sharedPost?: Post & {
    author: {
      id: number;
      email: string;
      profile?: ProfileType;
    };
  };
  likesCount: number;
};

type PostAuthor = Post & {
  author: {
    email: string;
    profile?: ProfileType;
  };
};

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
