import db from "..";

export interface IAddress {
  id?: number;
  user_id: number
  street: string
  city: string
  country: string
  created_at?: Date;
  updated_at?: Date;
}

const Address = () => db<IAddress>("addresses")
export default Address