import testService from "../services/testService";

let handleGetAllUser = async (req, res) => {
    try {
        let users = await testService.getAllUser();

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

module.exports = {
    handleGetAllUser,
}
