const { Op } = require("sequelize");

const AcceptedStatus = require("../../models").AcceptedStatus;

module.exports = {
  create: async (req, res) => {
    try {
      const { status_name, status_number } = req.body;
      const data = { status_name, status_number };

      // check status_name in database
      const room = await AcceptedStatus.findOne({
        where: {
          status_name: { [Op.eq]: status_name },
        },
      });
      if (!room) {
        //add to database
        const resp = await AcceptedStatus.create(data);
        res.status(200).send({
          data: resp,
          message: "Success to add data to database",
          status: 200,
        });
      } else {
        throw new Error("AcceptedStatus has been registered to database");
      }
    } catch (e) {
      res.status(400).send({ data: null, message: e.message, status: 400 });
    }
  },

  read: async (req, res) => {
    try {
      const rooms = await AcceptedStatus.findAll();
      if (rooms) {
        res.status(200).send({
          data: rooms,
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

      const room = await AcceptedStatus.findByPk(id);

      if (!room) {
        throw new Error("AcceptedStatus was not found");
      } else {
        const resp = await AcceptedStatus.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "AcceptedStatus has been successfuly updated to database",
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

      const room = await AcceptedStatus.findByPk(id);

      if (!room) {
        throw new Error("AcceptedStatus was not found");
      } else {
        const resp = await AcceptedStatus.destroy({ where: { id } });
        res.status(200).send({
          data: resp,
          message: "AcceptedStatus has been successfuly deleted to database",
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
