import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { RefreshToken } from "../models/RefreshToken";
import { User } from "../models/User";

const REFRESH_EXPIRES_IN_DAYS = 30;

const refreshTokenRepo = () => AppDataSource.getRepository(RefreshToken);

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = async (user: User): Promise<string> => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: `${REFRESH_EXPIRES_IN_DAYS}d`,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_IN_DAYS);

  const refreshToken = refreshTokenRepo().create({
    token,
    user,
    expiresAt,
  });

  await refreshTokenRepo().save(refreshToken);
  return token;
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const verifyRefreshToken = async (token: string): Promise<RefreshToken> => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { id: number };
    const savedToken = await refreshTokenRepo().findOne({
      where: { token, revokedAt: null as any },
      relations: ["user"],
    });

    if (!savedToken) {
      throw new Error("Refresh token not found or revoked");
    }

    if (savedToken.expiresAt < new Date()) {
      throw new Error("Refresh token expired");
    }

    if (savedToken.user.id !== payload.id) {
      throw new Error("Invalid refresh token payload");
    }

    return savedToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  const savedToken = await refreshTokenRepo().findOne({ where: { token } });
  if (!savedToken) {
    return;
  }

  savedToken.revokedAt = new Date();
  await refreshTokenRepo().save(savedToken);
};
