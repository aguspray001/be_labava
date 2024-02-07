const bcrypt = require("../../helper/bcrypt");
const { Sequelize } = require("../../models");
const Op = Sequelize.Op;
const otpUser = require("../../models").otpUser;
const User = require("../../models").User;

const otpGenerator = require("otp-generator");

module.exports = {
  create: async (req, res) => {
    try {
      const generatedOTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      // check otp_code in database
      const otp = await otpUser.findOne({
        where: {
          otp_code: { [Op.eq]: generatedOTP },
        },
      });

      if (otp) {
        throw new Error("OTP has been added in database");
      } else {
        //add to database
        const data = {
          otp_code: generatedOTP,
          hashed_otp: bcrypt.saltPassword(generatedOTP, 6),
        };
        const resp = await otpUser.create(data);
        res.status(200).send({
          data: resp,
          message: "OTP has been successfuly added to database",
          status: 200,
        });
      }
    } catch (e) {
      res.status(500).send({
        data: e.message,
        message: "Error added OTP to database",
        status: 500,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      // check otp_code in database
      const otp = await otpUser.findByPK(id);

      if (!otp) {
        throw new Error("OTP was not found");
      } else {
        const generatedOTP = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });

        const data = {
          otp_code: generatedOTP,
          hashed_otp: bcrypt.saltPassword(generatedOTP, 6),
        };

        const resp = await otpUser.update(data, {
          where: { hashed_otp: hashedOtp },
        });

        res.status(200).send({
          data: resp,
          message: "OTP has been successfuly updated to database",
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

      const otp = await otpUser.findByPK(id);

      if (otp) {
        otpUser
          .destroy({ where: { id } })
          .then((r) => {
            res.status(200).send({
              data: r,
              message: "OTP has been successfuly deleted from database",
              status: 200,
            });
          })
          .catch((e) => {
            throw new Error("OTP id was not found in database");
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
