import db from "../models";

let createCategory = (newCategoryInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Category.create({
                categoryName: newCategoryInfor.categoryName,
                image: newCategoryInfor.categoryImage,
            });

            resolve({
                errCode: 0,
                errMessage: "OK"
            });
        } catch (error) {
            reject(error);
        }
    });
}

let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll();

            if (categories && categories.length > 0) {
                categories.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                });
            }

            resolve({
                errCode: 0,
                errMessage: "OK",
                categories,
            });
        } catch (error) {
            reject(error);
        }
    });
}

let deleteCategory = (categoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deletedCategory = await db.Category.findOne({
                where: {
                    id: categoryID,
                },
                raw: false
            });

            if (deletedCategory) {
                deletedCategory.destroy();

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Category does not exist in the system!!!",
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createCategory, 
    getAllCategory,
    deleteCategory,
}
