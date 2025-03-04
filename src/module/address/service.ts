import Address from "../../db/model/address";
import User from "../../db/model/user";
import { isEmpty } from "../../utils";
import { BadRequestException, NotFoundException } from "../../utils/service-error";
import { ICreateAddress } from "./interface";

export const getUserAddress = async (user_id: string) => {
  const data = await Address().where("user_id", user_id).first();
  if (!data) {
    throw new NotFoundException("User Address not found")
  }
  return { message: "User Address retrieved successfully", data }
}

export const createAddress = async (payload: ICreateAddress) => {
  const user = await User().where("id", payload.user_id).first()
  if (!user) {
    throw new NotFoundException("User not found")
  }

  const address = await Address().where("user_id", payload.user_id).first()
  if (address) {
    throw new NotFoundException("User already has an address", address)
  }

  const [id] = await Address().insert(payload)
  return { message: "User Address created successfully", data: { id, ...payload } }
}

export const updateUserAddress = async (user_id: string, payload: ICreateAddress) => {
  if (isEmpty(payload)) {
    throw new BadRequestException("payload is empty")
  }

  const address = await Address().where("user_id", user_id).first()
  if (isEmpty(address)) {
    throw new NotFoundException("User Address not found")
  }

  await Address()
    .where("user_id", user_id)
    .update(payload);

  const data = await Address().where("user_id", user_id).first()
  return { message: "User Address updated successfully", data }
}