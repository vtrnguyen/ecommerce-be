import jwt from "jsonwebtoken";

let verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token) {
            token = token.split(' ')[1];

            const userInfor = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (error, decodedInfor) => {
                    if (error) {
                        return reject(error);
                    }
                    
                    resolve(decodedInfor);
                });
            });

            req.user = userInfor;
            next();
        } else {
            return res.status(401).json({
                errCode: -3,
                errMessage: "You're not authenticated!!!",
            });
        }
    } catch (error) {
        return res.status(401).json({
            errCode: -2,
            errMessage: "Token is not valid",
        });
    }
}

module.exports = {
    verifyToken,
}
