import { authService } from "../../services";

export const register = async (req: any, res: any) => {
  const user = await authService.registerUser(req.body);
  res.json({ success: true, user });
};

export const login = async (req: any, res: any) => {
  const data = await authService.loginUser(
    req.body.email,
    req.body.password
  );
  res.json({ success: true, ...data });
};
