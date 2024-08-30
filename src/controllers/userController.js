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

module.exports = {
    handleGetUserInfor, handleGetAllUser, 
    handleDeleteUser
}
