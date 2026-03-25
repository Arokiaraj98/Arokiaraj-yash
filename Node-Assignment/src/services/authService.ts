import bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { RegisterInput, LoginInput } from "../schemas/authSchema";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from "./tokenService";

const userRepo = () => AppDataSource.getRepository(User);

const SALT_ROUNDS = 12;

export const registerUser = async (data: RegisterInput) => {
  const existing = await userRepo().findOneBy({ email: data.email });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = userRepo().create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  await userRepo().save(user);

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (data: LoginInput) => {
  const user = await userRepo().findOneBy({ email: data.email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshTokens = async (requestedToken: string) => {
  const existingToken = await verifyRefreshToken(requestedToken);
  const user = existingToken.user;

  await revokeRefreshToken(requestedToken);

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export const logoutUser = async (refreshToken: string) => {
  await revokeRefreshToken(refreshToken);
};
