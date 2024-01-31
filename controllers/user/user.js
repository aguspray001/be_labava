const { Sequelize } = require("../../models");
const Op = Sequelize.Op;
const User = require("../../models").User;
const Role = require("../../models").Role;
const Prodi = require("../../models").Prodi;

const { sign } = require("../../helper/jwt");
const { pagination } = require("../../helper/pagination");
const { saltPassword, hashPasswordComparation } = require("../../helper/bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const {
        username,
        email,
        phone_number,
        password,
        role_id,
        status,
        NIM,
        prodi_id,
      } = req.body;

      const data = {
        username,
        email,
        phone_number,
        password: saltPassword(password, 10),
        role_id,
        status,
        NIM,
        prodi_id,
      };

      // check user in database
      const user = await User.findOne({
        where: {
          email: { [Op.eq]: email },
        },
      });
      // if user didnt exist then create it
      if (!user) {
        const resp = await User.create(data);
        res.status(200).send({
          data: resp,
          status: 200,
          message: "Registration is success",
        });
      } else {
        throw new Error("Email has been registered");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // check user in database
      const user = await User.findOne({
        where: {
          email: { [Op.eq]: email },
        },
      });
      // if user exist
      if (user) {
        // password validation
        const isPasswordValid = hashPasswordComparation(
          password,
          user.password
        );
        if (isPasswordValid) {
          // then return token
          const token = sign(user.dataValues);
          res
            .status(200)
            .json({ data: token, message: "Login is success", status: 200 });
        } else {
          throw new Error("User is not registered yet");
        }
      }
    } catch (e) {
      res.status(500).json({ data: null, message: e.message, status: 500 });
    }
  },

  listUser: async (req, res) => {
    const { limit, offset } = pagination(
      req.query.currentPage,
      req.query.limit
    );
    User.findAndCountAll({
      include: [
        {
          model: Role,
          as: "role",
        //   attributes: ["name", "sex", "born_date", "id"],
          // nested include
        //   include : [{model: User, as: 'user', attributes: ["name", "phone_number"]}]
        },
        {
          model: Prodi,
          as: "prodi"
        }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    }).then((r) => {
      res.send({
        data: { ...r, total_data: r.rows.length },
        status: 200,
        message: "Success get list users data",
      });
    }).catch((e)=>{
        res.status(500).json({ data: null, message: e.message, status: 500 });
    })
  },

  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const { role_number } = req.body;
      const data = { role_id: role_number };

      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User was not found");
      } else {
        const resp = await User.update(data, {where:{id}});
        res.status(200).send({
          data: resp,
          message: "User Role has been successfuly updated to database",
          status: 200,
        });
      }
    } 
    catch (e) {
      res.status(500).send({
        data: null,
        message: e.message,
        status: 500,
      });
    }
  },
};
