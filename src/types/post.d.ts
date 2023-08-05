export interface Post {
  id: number;
  photo: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}
