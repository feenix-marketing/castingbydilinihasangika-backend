import bcrypt from "bcryptjs";
import tokenUtils from "../utils/token.utils";
import { User } from "../model";
import { CustomError } from "../middleware/error.middleware";

const registerUser = async (
  body: any
): Promise<{ accessToken: string } | null> => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  console.log(body);

  const userDetails = { ...body, password: hashedPassword };
  const newUser = await User.create(userDetails);

  let userType = "user";

  const token = tokenUtils.generateTokens({
    id: newUser.id,
    email: newUser.email,
    userType,
  });

  return token;
};

const loginUser = async (
  email: string,
  password: string
): Promise<{ accessToken: string } | null> => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new CustomError("User with provided email not found", 401);
  }

  if (!(await user.verifyPassword(password))) {
    throw new CustomError("User with provided email not found", 401);
  }

  let userType = "user";
  if (user.user_type !== "user") {
    userType = "admin";
  }

  const token = tokenUtils.generateTokens({
    id: user.id,
    email: user.email,
    userType,
  });

  return token;
};

export default {
  // refreshTokens,
  registerUser,
  loginUser,
};
