import jwt from "jsonwebtoken";

const generateAccessToken = (userData: { id: string; email: string }): string => {
    return jwt.sign(userData, process.env.Access_Token_Secret!, {
        expiresIn: "30h",
    });
};

const generateTokens = (userData: {
    id: string;
    email: string;
    userType: string;
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
