import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/user.controller.js";


const userRouter=Router()



userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


export default userRouter