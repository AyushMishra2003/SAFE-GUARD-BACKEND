import { Router } from "express";
import { addGroup, getGroupRequests, getUserGroupById, respondToGroupRequest, sendGroupRequest } from "../controllers/group.controller.js";


const groupRouter=Router()


groupRouter.post("/add",addGroup)
groupRouter.post("/send-request", sendGroupRequest);
groupRouter.get("/requests/:userId", getGroupRequests);
groupRouter.post("/respond-request", respondToGroupRequest);
groupRouter.get("/user-groups/:userId", getUserGroupById);

export default groupRouter