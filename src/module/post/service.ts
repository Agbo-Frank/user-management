import Post from "../../db/model/post"
import User from "../../db/model/user"
import { filterGenerator, isEmpty } from "../../utils"
import { NotFoundException } from "../../utils/service-error"
import { ICreatePost } from "./interface"

export const createPost = async (payload: ICreatePost) => {
  const user = await User().where("id", payload.user_id).first()
  if (isEmpty(user)) {
    throw new NotFoundException("User not found")
  }
  const [id] = await Post().insert(payload)
  return { message: "User Post created successfully", data: { id, ...payload } }
}

export const getPosts = async (payload: any) => {
  const { limit, offset, page, ...query } = payload;

  const posts = await filterGenerator(Post(), query, ["user_id"])
    .select("*")
    .limit(limit)
    .offset(offset);

  const data = {
    data: posts,
    page,
    limit
  }
  return { message: "Post retrieved successfully", data: null }
}

export const deletePost = async (id: string) => {
  const post = await Post().where("id", id).first()
  if (isEmpty(post)) {
    throw new NotFoundException("Post not found")
  }

  await Post().where("id", id).delete()

  return { message: "Post deleted successfully", data: post }
}