import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import { registerUser, loginUser, refreshTokens, logoutUser } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const user = await registerUser(parsed.data);
    res.status(201).json({ success: true, message: "Registration successful", user });
  } catch (error: any) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const { user, accessToken, refreshToken } = await loginUser(parsed.data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ success: false, message: "Refresh token is required" });
    return;
  }

  try {
    const tokens = await refreshTokens(refreshToken);
    res.status(200).json({ success: true, ...tokens });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ success: false, message: "Refresh token is required" });
    return;
  }

  try {
    await logoutUser(refreshToken);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, user: req.user });
};
