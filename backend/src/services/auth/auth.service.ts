//backend/src/services/auth/auth.service.ts
import bcrypt from "bcrypt";
import User from "../../models/User.model";
import redis from "../../config/redis";
import { signToken } from "../../utils/jwt";
import { logSuccess, logError } from "../../utils/logger";

/* ============================
   REGISTER USER
============================ */
export const registerUser = async (data: any) => {
  try {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      logError("Register failed: User already exists", data.email);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "USER"
    });

    logSuccess("User registered successfully", {
      userId: user._id.toString(),
      email: user.email
    });

    return user;
  } catch (error: any) {
    logError("Register error", error.message);
    throw error;
  }
};

/* ============================
   LOGIN USER
============================ */
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      logError("Login failed: Invalid user", email);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logError("Login failed: Password mismatch", email);
      throw new Error("Invalid credentials");
    }

    const token = signToken(
      { id: user._id, role: user.role },
      "1h"
    );

    await redis.set(`auth:${user._id}`, token, { EX: 3600 });

    logSuccess("User logged in successfully", {
      userId: user._id.toString(),
      redisKey: `auth:${user._id}`
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  } catch (error: any) {
    logError("Login error", error.message);
    throw error;
  }
};
