import db from "..";

export interface IUser {
  id?: number;
  first_name: string
  last_name: string
  email: string
  password: string
  created_at?: Date;
  updated_at?: Date;
}

const User = () => db<IUser>("users")
export default User