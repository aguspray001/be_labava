const { Op } = require("sequelize");

const UserStatus = require("../../models").UserStatus;

module.exports = {
  create: async (req, res) => {
    try {
      const { status_name, status_number } = req.body;
      const data = { status_name, status_number };

      // check status_name in database
      const status = await UserStatus.findOne({
        where: {
          status_name: { [Op.eq]: status_name },
        },
      });
      if (!status) {
        //add to database
        const resp = await UserStatus.create(data);
        res.status(200).send({
          data: resp,
          message: "Success to add data status to database",
          status: 200,
        });
      } else {
        throw new Error("User status has been registered to database");
      }
    } catch (e) {
      res.status(400).send({ data: null, message: e.message, status: 400 });
    }
  },

  read: async (req, res) => {
    try {
      const status = await UserStatus.findAll();
      if (status) {
        res.status(200).send({
          data: status,
          message: "Success to read data from database",
          status: 200,
        });
      }else{
        throw new Error("Failed to read data from database");
      }
    } catch (e) {
      res.status(200).send({
        data: null,
        message: e.message,
        status: 200,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { status_name, status_number } = req.body;
      const data = { status_name, status_number };

      const status = await UserStatus.findByPk(id);

      if (!status) {
        throw new Error("User status was not found");
      } else {
        const resp = await UserStatus.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "User status has been successfuly updated to database",
          status: 200,
        });
      }
    } catch (e) {
      res.status(500).send({
        data: null,
        message: e.message,
        status: 500,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      const status = await UserStatus.findByPk(id);

      if (!status) {
        throw new Error("User status was not found");
      } else {
        const resp = await UserStatus.destroy({ where: { id } });
        res.status(200).send({
          data: resp,
          message: "User status has been successfuly deleted to database",
          status: 200,
        });
      }
    } catch (e) {
      res.status(500).send({
        data: null,
        message: e.message,
        status: 500,
      });
    }
  },
};
