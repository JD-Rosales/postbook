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
