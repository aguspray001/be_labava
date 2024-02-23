const { Op } = require("sequelize");
const StuffCategory = require("../../models").StuffCategory;
const { ErrorHandler } = require("../../helper/error");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, total, category_number } = req.body;
      const data = { name, total, category_number };

      // check name in database
      const stuffCategory = await StuffCategory.findOne({
        where: {
          name: { [Op.eq]: name },
        },
      });
      if (!stuffCategory) {
        const stuffCategoryNumber = await StuffCategory.findOne({
          where: {
            category_number: { [Op.eq]: category_number },
          },
        });

        if (stuffCategoryNumber) {
          throw new ErrorHandler(
            "Category number was exist, please create new one",
            400,
            false
          );
        }
        //add to database
        const resp = await StuffCategory.create(data);
        res.status(200).send({
          data: resp,
          message: "Success to add category data to database",
          status: 200,
        });
      } else {
        throw new ErrorHandler(
          "Stuff Category has been registered to database",
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  read: async (req, res, next) => {
    try {
      const stuffCategories = await StuffCategory.findAll();
      if (stuffCategories) {
        res.status(200).send({
          data: stuffCategories,
          message: "Success to read data from database",
          status: 200,
        });
      } else {
        throw new ErrorHandler("Failed to read data from database");
      }
    } catch (e) {
      console.log(e);
    }
  },
};
