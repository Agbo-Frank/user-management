import { IAddress } from "../../db/model/address";

export type ICreateAddress = Omit<IAddress, "id" | "created_at" | "updated_at">