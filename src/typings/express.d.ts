import { User } from "../model";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      loggedUser?: UserAttributes;
    }
  }
}
