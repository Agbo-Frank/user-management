import db from "../../db";
import User from "../../db/model/user"
import { IPagination } from "../../utils/interface"
import { BadRequestException, NotFoundException } from "../../utils/service-error";
import { ICreateUser } from "./interface";

export const getUsers = async (payload: IPagination) => {
  const { limit, offset, page } = payload;

  const users = await User()
    .select("*")
    .limit(limit)
    .offset(offset);

  const data = {
    data: users,
    page,
    limit
  }
  return { message: "User retrieved successfully", data }
}

export const getUserCount = async () => {
  const result = await User().count<{ count: number }>("* as count").first();
  return { message: "User count successfully", data: { count: result?.count || 0 } }
}

export const getUserById = async (id: string) => {
  const data = await db("users as u")
    .leftJoin("addresses as a", "u.id", "a.user_id")
    .where("u.id", id)
    .select([
      "u.id",
      "u.first_name",
      "u.last_name",
      "u.email",
      "u.created_at",
      "u.updated_at",
      "a.street",
      "a.city",
      "a.state",
      "a.country"
    ])
    .first()
  if (!data) {
    throw new NotFoundException("User not found")
  }

  return { message: "User details retrieved successfully", data }
}

export const createUser = async (payload: ICreateUser) => {
  const { email } = payload
  const user = await User().where("email", email).first();
  if (user) {
    throw new BadRequestException("User with email already exists")
  }

  const [id] = await User().insert(payload)

  return { message: "User created successfully", data: { id, ...payload } }
}