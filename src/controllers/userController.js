import userService from "../services/userService";

let handleGetUserInfor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        } else {
            let userInfor = await userService.handleGetUserInfor(req.query.id);

            return res.status(200).json({
                userInfor,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server!!!",
        });
    }
}

let handleGetAllUser = async (req, res) => {
    try {
        let users = await userService.getAllUser();

        return res.status(200).json({
            users
        });
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        }

        let deletedInfor = await userService.deleteUser(req.query.id);

        return res.status(200).json(deletedInfor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 2,
            errMessage: "Error from the server!!!",
        });
    }
}

let handleCreateUser = async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.email 
            || !req.body.password || !req.body.roleID || !req.body.phoneNumber
            || !req.body.gender || !req.body.address) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        }

        let createUserInfor = await userService.createUser(req.body);

        if (createUserInfor.errCode === 0) {
            return res.status(200).json({
                createUserInfor,
            });
        } else {
            return res.status(200).json({
                createUserInfor,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from the server!!!",
        });
    }
}

let handleUpdateUser = async (req, res) => {
    try {
        if (!req.body.id || !req.body.firstName 
            || !req.body.lastName || !req.body.roleID 
            || !req.body.phoneNumber || !req.body.gender 
            || !req.body.address) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        }

        let updateUserInfor = await userService.updateUser(req.body);

        if (updateUserInfor.errCode === 0) {
            return res.status(200).json({
                updateUserInfor,
            });
        } else {
            return res.status(200).json({
                updateUserInfor,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 2,
            errMessage: "Error from the server!!!",
        });
    }
}

module.exports = {
    handleGetUserInfor, handleGetAllUser, 
    handleDeleteUser, handleCreateUser,
    handleUpdateUser,
}
