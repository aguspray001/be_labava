const { Sequelize } = require("../../models");
const Op = Sequelize.Op;
const Prodi = require("../../models").Prodi;

module.exports = {
  create: async (req, res) => {
    try {
      const { prodi_name, prodi_number } = req.body;
      const data = { prodi_name, prodi_number };
      // check prodi_name in database
      const prodi = await Prodi.findOne({
        where: {
          prodi_name: { [Op.eq]: prodi_name },
        },
      });

      if (prodi) {
        throw new Error("Prodi data has been added in database");
      } else {
        //add to database
        const resp = await Prodi.create(data);
        res.status(200).send({
          data: resp,
          message: "Prodi data has been successfuly added to database",
          status: 200,
        });
      }
    } catch (e) {
      res.status(500).send({
        data: e.message,
        message: "Error added prodi data to database",
        status: 500,
      });
    }
  },

  read: async (req, res) => {
    try {
      // check user in database
      const prodi = await Prodi.findAll();
      if (prodi !== null) {
        res.status(200).send({
          data: prodi,
          message: "Successfully fetch prodi data from database",
          status: 200,
        });
      } else {
        throw new Error("Error fetch prodi data data from database");
      }
    } catch (e) {
      res.status(400).send({
        data: null,
        message: e.message,
        stack: e.stack,
        status: 400,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { prodi_name, prodi_number } = req.body;
      const data = { prodi_name, prodi_number };

      const prodi = await Prodi.findByPk(id);

      if (!prodi) {
        throw new Error("Prodi was not found");
      } else {
        const resp = await Prodi.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "Prodi has been successfuly updated to database",
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

      const prodi = await Prodi.findByPK(id);

      if (prodi) {
        Prodi.destroy({ where: { id } })
          .then((r) => {
            res.status(200).send({
              data: r,
              message: "Prodi has been successfuly deleted from database",
              status: 200,
            });
          })
          .catch((e) => {
            throw new Error("Prodi id was not found in database");
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
