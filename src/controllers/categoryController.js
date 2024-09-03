import categoryService from "../services/categoryService";

let handleCreateNewCategory = async (req, res) => {
    try {
        if (!req.body.categoryName || !req.body.categoryImage) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        } else {
            let newCategoryInfor = await categoryService.createCategory(req.body);

            if (newCategoryInfor.errCode === 0) {
                return res.status(200).json({
                    newCategoryInfor,
                });
            } else {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: "Create new category is not successful!!!",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1
        })
    }
}

let handleGetAllCategory = async (req, res) => {
    try {
        let allCategoryInfor = await categoryService.getAllCategory();

        if (allCategoryInfor.errCode === 0) {
            return res.status(200).json({
                allCategoryInfor,
            });
        } else {
            return res.status(200).json({
                errCode: 1,
                errMessage: "No category can be found!!!",
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

let handleDeleteCategory = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        }

        let deletedInfor = await categoryService.deleteCategory(req.query.id);

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
    handleCreateNewCategory,
    handleGetAllCategory,
    handleDeleteCategory,
}
