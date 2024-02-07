const { Op } = require("sequelize");

const Room = require("../../models").Room;

module.exports = {
  create: async (req, res) => {
    try {
      const { room_name, room_number } = req.body;
      const data = { room_name, room_number };

      // check room_name in database
      const room = await Room.findOne({
        where: {
          room_name: { [Op.eq]: room_name },
        },
      });
      if (!room) {
        //add to database
        const resp = await Room.create(data);
        res.status(200).send({
          data: resp,
          message: "Success to add data to database",
          status: 200,
        });
      } else {
        throw new Error("Room has been registered to database");
      }
    } catch (e) {
      res.status(400).send({ data: null, message: e.message, status: 400 });
    }
  },

  read: async (req, res) => {
    try {
      const rooms = await Room.findAll();
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

      const { room_name, room_number } = req.body;
      const data = { room_name, room_number };

      const room = await Room.findByPk(id);

      if (!room) {
        throw new Error("Room was not found");
      } else {
        const resp = await Room.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "Room has been successfuly updated to database",
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

      const { room_name, room_number } = req.body;
      const data = { room_name, room_number };

      const room = await Room.findByPk(id);

      if (!room) {
        throw new Error("Room was not found");
      } else {
        const resp = await Room.destroy({ where: { id } });
        res.status(200).send({
          data: resp,
          message: "Room has been successfuly deleted to database",
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
