import { ProfileType } from './user';

export type Post = {
  id: number;
  postType: string;
  photo?: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  sharedPostId: number;
  sharedPost?: Post & {
    author: {
      email: string;
      profile?: ProfileType;
    };
  };
};

export type PostAuthor = Post & {
  author: {
    email: string;
    profile?: ProfileType;
  };
};
