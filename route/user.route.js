import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";


const userRouter=Router()



userRouter.post("/", addUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


export default userRouter