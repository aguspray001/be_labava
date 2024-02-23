const { ErrorHandler } = require("../../helper/error");
const moment = require("moment");
const { isDateTimeBetween } = require("../../helper/utils");
const { Sequelize } = require("../../models");
const { pagination } = require("../../helper/pagination");
const { roleMessage, statusMessage } = require("../../helper/message");
const Op = Sequelize.Op;
const RentRoomTransaction = require("../../models").RentRoomTransaction;
const Room = require("../../models").Room;
const User = require("../../models").User;

module.exports = {
  rent: async (req, res, next) => {
    const {
      user_id,
      room_id,
      rent_date,
      return_date,
      pupose,
      dosen_pengampu,
      activity,
      organization,
    } = req.body;

    try {
      // cari semua data rent room
      const rentData = await RentRoomTransaction.findAll({
        where: { room_id: { [Op.eq]: room_id } },
      });

      // looping untuk mencari apakah rent date ada diantara rented room
      if (rentData.length > 0) {
        for (let i = 0; i <= rentData.length - 1; i++) {
          const startDate = rentData[i].dataValues.rent_date;
          const endDate = rentData[i].dataValues.return_date;
          const isDateBetween = isDateTimeBetween(
            startDate,
            endDate,
            rent_date
          );
          // jika rent date berada diantara rented room date, maka throw error
          if (isDateBetween) {
            throw new ErrorHandler(
              `Cannot rent room on that date, room has been booked at: ${moment(
                rent_date
              ).format("YYYY-MM-DD HH:mm:ss")} until ${moment(
                return_date
              ).format("YYYY-MM-DD HH:mm:ss")}`,
              400,
              false
            );
          }
        }
      }
      // jika tidak ada diantara rented room date, maka create transaction
      const data = {
        user_id,
        room_id,
        rent_date,
        return_date,
        pupose,
        dosen_pengampu,
        activity,
        organization,
        accepted_status_id: 0,
      };
      const resp = await RentRoomTransaction.create(data);
      res.status(200).send({
        data: resp,
        status: 200,
        message: "Rent room is success, wait till your proposal is accepted",
      });
    } catch (e) {
      next(e);
    }
  },
  acc: async (req, res, next) => {
    try {
      const { current_status_number, role_number } = req.body;
      const { id } = req.params;
      console.log(id)
      let updatedACCStatus = 0;
      //laboran acc ketika status 0
      if (
        (current_status_number === null || current_status_number === 0) &&
        role_number === 3
      ) {
        // acc laboran
        updatedACCStatus = 1;
      } else if (current_status_number === 1 && role_number === 2) {
        // acc ketua lab
        updatedACCStatus = 2;
      } else if (current_status_number === 2 && role_number === 3) {
        // acc pengembalian
        updatedACCStatus = 3;
      } else {
        throw new ErrorHandler(
          `Cannot ACC this transaction, you are ${roleMessage(
            role_number
          )} current status is ${current_status_number} ${statusMessage(
            current_status_number
          )}`,
          400,
          false
        );
      }

      const data = { accepted_status_id: updatedACCStatus };
      await RentRoomTransaction.update(data,{ where: { id }});

      res.status(200).send({
        data: null,
        message: `${roleMessage(role_number)} Success to ACC transaction`,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  },
  reject: async (req, res, next) => {
    try {
      // get data current transaction from req.body
      const { current_status_number, role_number } = req.body;
      const { id } = req.params;

      let updatedACCStatus = 0;
      // reject tranaction
      if (role_number === 2 || role_number === 3) {
        updatedACCStatus = 4;
      } else {
        throw new ErrorHandler(
          `Cannot reject this transaction, you are ${roleMessage(
            role_number
          )} current status is ${current_status_number} ${statusMessage(
            current_status_number
          )}`,
          400,
          false
        );
      }

      // if success
      await RentRoomTransaction.update(
        { accepted_status_id: updatedACCStatus },
        { where: { id } }
      );

      res.status(200).send({
        data: null,
        message: `${roleMessage(
          role_number
        )} Success to reject the transaction`,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  },
  rollback: async (req, res, next) => {
    try {
      const { current_status_number, role_number } = req.body;
      const { id } = req.params;

      let updatedACCStatus = 0;
      //if rejected, then admin or head lab could rollback the status of rent room
      if (current_status_number === 4) {
        if (role_number === 1 || role_number === 2) {
          await RentRoomTransaction.update(
            { accepted_status_id: updatedACCStatus },
            { where: { id } }
          );

          res.status(200).send({
            data: null,
            message: `${roleMessage(
              role_number
            )} Success to rollback the transaction`,
            status: 200,
          });
        } else {
          throw new ErrorHandler(
            "You cannot rollback transaction, because your are not admin or head of laboratory",
            400,
            false
          );
        }
      } else {
        throw new ErrorHandler(
          "You cannot rollback transaction, because this transaction is still proceed",
          400,
          false
        );
      }
    } catch (e) {
      next(e);
    }
  },

  paging: (req, res, next) => {
    // pagination
    const { limit, offset } = pagination(
      req.query.currentPage,
      req.query.limit
    );

    RentRoomTransaction.findAndCountAll({
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["room_name", "room_number"],
        },
        {
          model: User,
          as: "user",
          attributes: ["username", "phone_number", "email", "role_id", "prodi_id"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    })
      .then((r) => {
        res.send({
          data: { ...r, total_data: r.rows.length },
          status: 200,
          message: "Success get list rent room data",
        });
      })
      .catch((e) => {
        res.status(500).json({ data: null, message: e.message, status: 500 });
      });
  },
};
