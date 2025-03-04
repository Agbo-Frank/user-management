import { IUser } from "../../db/model/user";

export type ICreateUser = Omit<IUser, "id" | "created_at" | "updated_at">