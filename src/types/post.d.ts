export type PostType = {
  id: number;
  postType: string;
  photo?: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
};
