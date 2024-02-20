import jwt from "jsonwebtoken";

const generateAccessToken = (userData: {
  id: string;
  email: string;
}): string => {
  return jwt.sign(userData, process.env.Access_Token_Secret!, {
    expiresIn: "1h",
  });
};

const generateTokens = (userData: {
  id: string;
  email: string;
}): {
  accessToken: string;
} => {
  const accessToken = generateAccessToken(userData);

  return { accessToken };
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.Access_Token_Secret!);
};

export default {
  generateAccessToken,
  generateTokens,
  verifyToken,
};
