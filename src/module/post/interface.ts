import { IPost } from "../../db/model/post";

export type ICreatePost = Omit<IPost, "id" | "created_at" | "updated_at">