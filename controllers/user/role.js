const { Sequelize } = require("../../models");
const Op = Sequelize.Op;
const Role = require("../../models").Role;

module.exports = {
  create: async (req, res) => {
    try {
      const { role_name, role_number } = req.body;
      const data = { role_name, role_number };
      // check role_name in database
      const roleName = await Role.findOne({
        where: {
          role_name: { [Op.eq]: role_name },
        },
      });

      if (roleName) {
        throw new Error("Role name has been added in database");
      } else {
        //add to database
        const resp = await Role.create(data);
        res.status(200).send({
          data: resp,
          message: "Role has been successfuly added to database",
          status: 200,
        });
      }
    } catch (e) {
      res.status(500).send({
        data: e.message,
        message: "Error added role to database",
        status: 500,
      });
    }
  },

  read: async (req, res) => {
    try {
      // check user in database
      const roles = await Role.findAll();

      if (roles !== null) {
        res.status(200).send({
          data: roles,
          message: "Successfully fetch roles from database",
          status: 200,
        });
      } else {
        throw new Error("Error fetch roles data from database");
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
      console.log(id);
      const { role_name, role_number } = req.body;
      const data = { role_name, role_number };

      const role = await Role.findByPk(id);
      console.log(role);

      if (!role) {
        throw new Error("Role was not found");
      } else {
        const resp = await Role.update(data, { where: { id } });
        res.status(200).send({
          data: resp,
          message: "Role has been successfuly updated to database",
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

      const role = await Role.findByPK(id);

      if (role) {
        Role.destroy({ where: { id } })
          .then((r) => {
            res.status(200).send({
              data: r,
              message: "Role has been successfuly deleted from database",
              status: 200,
            });
          })
          .catch((e) => {
            throw new Error("Role id was not found in database");
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
