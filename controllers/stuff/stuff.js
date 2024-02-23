const { Sequelize } = require("../../models");
const Op = Sequelize.Op;

const Stuff = require("../../models").Stuff;
const StuffCategory = require("../../models").StuffCategory;

const { pagination } = require("../../helper/pagination");
const { ErrorHandler } = require("../../helper/error");

module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        name,
        buy_date,
        owner_id,
        current_condition,
        status,
        inventaris_code,
        category_id,
      } = req.body;

      // check stuff code in database
      const stuff = await Stuff.findOne({
        where: {
          inventaris_code: { [Op.eq]: inventaris_code },
        },
      });
      if (!stuff) {
        const data = {
          name,
          buy_date,
          owner_id,
          current_condition,
          status,
          inventaris_code,
          category_id,
        };
        //add to database
        const resp = await Stuff.create(data);
        res.status(200).send({
          data: resp,
          message: "Success to add data to database",
          status: 200,
        });
      } else {
        throw new ErrorHandler(
          "Stuff has been registered to database",
          400,
          false
        );
      }
    } catch (e) {
      next(e);
    }
  },

  paging: async (req, res, next) => {
    try {
      // pagination config
      const { limit, offset } = pagination(
        req.query.currentPage,
        req.query.limit
      );

      // find all with paging
      const stuff = await Stuff.findAndCountAll({
        include: [
          {
            model: StuffCategory,
            as: "category", //alias in master model
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      if (stuff) {
        res.send({
          data: { ...stuff, total_data: stuff.rows.length },
          status: 200,
          message: "Success get list of stuff data",
        });
      } else {
        throw new ErrorHandler("Error get list of stuff data", 400, false);
      }
    } catch (e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const {
        name,
        buy_date,
        owner_id,
        current_condition,
        status,
        inventaris_code,
        category_id,
      } = req.body;

      const data = {
        name,
        buy_date,
        owner_id,
        current_condition,
        status,
        inventaris_code,
        category_id,
      };

      const stuff = await Stuff.findByPk(id);

      if (!stuff) {
        throw new Error("Stuff was not found");
      } else {
        const resp = await Stuff.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "Stuff has been successfuly updated to database",
          status: 200,
        });
      }
    } catch (e) {
      next(e);
    }
  },
};
