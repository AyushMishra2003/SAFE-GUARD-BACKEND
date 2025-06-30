import Group from "../models/group.model.js";
import GroupRequest from "../models/groupRequest.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.utlis.js"


const addGroup = async (req, res, next) => {
    try {

        const { groupName, createdBy } = req.body

        if (!groupName || !createdBy) {
            return next(new AppError("Group name and creator are required", 400));
        }

        const userExists = await User.findById(createdBy);

        if (!userExists) {
            return next(new AppError("User not found", 404));
        }

        const group = await Group.create({
            name: groupName,
            createdBy: createdBy,
            members: [createdBy] // Add creator as the first member
        });

        if (!group) {
            return next(new AppError("Failed to create group", 500));
        }

        res.status(201).json({
            success: true,
            message: "Group created successfully",
            data: group
        });





    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}


const sendGroupRequest = async (req, res, next) => {
    try {

        const { groupId, senderId, userIds } = req.body

        const groupExists = await Group.findById(groupId)

        if (!groupExists) {
            return next(new AppError("Group not found", 404));
        }

        const isSenderMember = groupExists.members.includes(senderId);

        if (!isSenderMember) {
            return next(new AppError("Sender ID is not exists in Group", 400));
        }

        const failed = [];
        const sent = [];

        for (const receiverId of userIds) {
            const isReceiverMember = groupExists.members.includes(receiverId);
            if (isReceiverMember) {
                failed.push({
                    userId: receiverId,
                    reason: "Already a member of the group",
                });
                continue;
            }

            const requestExists = await GroupRequest.findOne({
                groupId,
                senderId,
                receiverId,
            });

            if (requestExists) {
                failed.push({
                    userId: receiverId,
                    reason: "Request already exists",
                });
                continue;
            }

            const newRequest = await GroupRequest.create({
                groupId,
                senderId,
                receiverId,
            });

            if (!newRequest) {
                failed.push({
                    userId: receiverId,
                    reason: "Failed to create request",
                });
            } else {
                sent.push(receiverId);
            }
        }

        res.status(200).json({
            success: true,
            message: "Group requests processed",
            data: {
                sent,
                failed
            }
        });




    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}


const getGroupRequests = async (req, res, next) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return next(new AppError("User ID is required", 400));
        }

        const allGroupRequests = await GroupRequest.find({ receiverId: userId })
            .populate('groupId', 'name')
            .populate('senderId', 'fullName');


        if (!allGroupRequests) {
            return next(new AppError("No group requests found for this user", 404));
        }

        res.status(200).json({
            success: true,
            message: "All Group Requests",
            data: allGroupRequests
        })


    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const respondToGroupRequest = async (req, res, next) => {
    try {

        const { groupId, receiverId, status } = req.body

        const isGroupExists = await GroupRequest.findOne({
            groupId: groupId,
            receiverId: receiverId,
            status: 'pending'
        });

        if (!isGroupExists) {
            return next(new AppError("Group request not found or already processed", 404));
        }

        isGroupExists.status = status

        if (status === 'accepted') {
            const group = await Group.findById(groupId);

            group.members.push(receiverId);
            await group.save();
        }

        await isGroupExists.save();

        res.status(200).json({
            success: true,
            message: "Group request response processed successfully",
            data: isGroupExists
        })


    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const getUserGroupById = async (req, res, next) => {
    try {

        const { userId } = req.params

        const isUser = await User.findById(userId)

        if (!isUser) {
            return next(new AppError("User not found", 404));
        }

        const allGroups = await Group.find({ members: userId })
            .populate('createdBy', 'fullName email phoneNumber')
              .populate('members', 'fullName email phoneNumber') // ✅ this gives you fullName of each member
            .select('fullName createdBy members');

        if (!allGroups) {
            return next(new AppError("No groups found for this user", 404));
        }

        res.status(200).json({
            success: true,
            message: "User's Groups",
            data: allGroups
        });



    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}


export { addGroup, sendGroupRequest, getGroupRequests, respondToGroupRequest, getUserGroupById }

