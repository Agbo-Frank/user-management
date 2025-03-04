import db from "..";

export interface IPost {
  id?: number;
  user_id: number
  title: string
  body: string
  created_at?: Date;
  updated_at?: Date;
}

const Post = () => db<IPost>("posts")
export default Post