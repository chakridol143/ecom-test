// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";

// export const adminLogin = (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (email !== "nallaravikishore@gmail.com" || password !== "Ravi_@123") {
//     return res.status(401).json({ message: "Invalid admin credentials" });
//   }

//   const token = jwt.sign(
//     { role: "admin", user_id: 1 },
//     process.env.ADMIN_JWT_SECRET!,
//     { expiresIn: "7d" }
//   );

//   return res.json({ message: "Admin login successful", token });
// };
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== "nallaravikishore@gmail.com" || password !== "Ravi_@123") {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin", user_id: 1 },
    process.env.ADMIN_JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return res.json({ message: "Admin login successful", token });
};
