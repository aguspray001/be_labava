const { Sequelize } = require("../../models");
const Op = Sequelize.Op;

// model
const Stuff = require("../../models").Stuff;
const RentStuffTransaction = require("../../models").RentStuffTransaction;
const StuffCategory = require("../../models").StuffCategory;

// helper
const { pagination } = require("../../helper/pagination");
const { ErrorHandler } = require("../../helper/error");
const { statusMessage, roleMessage } = require("../../helper/message");

module.exports = {
  transaction: async (req, res, next) => {
    try {
      const {
        user_id,
        ids,
        rent_items, // json => [{id: x, total: x}]
        rent_date,
        return_date,
        purpose,
        dosen_pengampu,
        activity,
        organization,
      } = req.body;

      // get item stock
      const stockStuff = await Stuff.findAll({
        where: {
          id: ids,
        },
        include: [
          {
            model: StuffCategory,
            as: "category",
          },
        ],
      });

      const filteredStockStuff = stockStuff
        .map((v, k) => {
          if (v.category !== null) {
            const data = {
              name: v.category.name,
              id: v.id,
              total: v.category.total,
              category_number: v.category.category_number,
            };
            return data;
          }
        })
        .filter((v) => {
          if (v === undefined)
            throw new ErrorHandler(
              "There was undefined Item Category, please call the administrator",
              400,
              false
            );
          return v !== undefined;
        });

      // sorting based on their id
      const sortedFilteredStockStuff = filteredStockStuff.sort(function (a, b) {
        return a.id - b.id;
      });
      const sortedRentItems = rent_items.sort(function (a, b) {
        return a.id - b.id;
      });

      // check item stock per item of array
      const calculatedItemData = [];
      sortedFilteredStockStuff.forEach((stock, i) => {
        const finalTotal = stock.total - sortedRentItems[i].total;
        // if not ready => send error msg
        if (finalTotal < 0) {
          throw new ErrorHandler(
            "Your total rented item exceed the stock!",
            400,
            false
          );
        }
        calculatedItemData.push({ id: stock.id, total: finalTotal });
      });

      // if item ready then create transaction
      const data = {
        user_id,
        ids,
        rent_items: JSON.stringify(rent_items),
        rent_date,
        return_date,
        purpose,
        dosen_pengampu,
        activity,
        organization,
        accepted_status_id: 0,
        rent_condition_id: 0,
      };

      // rent item!
      const rentStuff = await RentStuffTransaction.create(data);

      if (rentStuff) {
        res.send(rentStuff);
      } else {
        throw new ErrorHandler(
          "Error when created rent stuff process",
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  paging: (req, res, next) => {
    // pagination
    const { limit, offset } = pagination(
      req.query.currentPage,
      req.query.limit
    );
    console.log(limit, offset);

    RentStuffTransaction.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    })
      .then((r) => {
        res.send({
          data: { ...r, total_data: r.rows.length },
          status: 200,
          message: "Success get list users data",
        });
      })
      .catch((e) => {
        res.status(500).json({ data: null, message: e.message, status: 500 });
      });
  },

  delete: (req, res, next) => {
    // check transaction by id
    // if exist then destroy
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        user_id,
        ids,
        rent_items, // json => [{id: x, total: x}]
        rent_date,
        return_date,
        purpose,
        dosen_pengampu,
        activity,
        organization,
        accepted_status_id,
      } = req.body;

      const rentStuff = await RentStuffTransaction.findByPk(id);

      if (!rentStuff) {
        throw new Error("Rent Stuff was not found");
      } else {
        if (accepted_status_id >= 0) {
          throw new ErrorHandler(
            "Transaction has been proceed, you cannot change the data",
            400,
            false
          );
        } else {
          const data = {
            rent_items: JSON.stringify(rent_items),
            rent_date,
            return_date,
            purpose,
            dosen_pengampu,
            activity,
            organization,
          };

          const resp = await RentStuffTransaction.update(data, {
            where: { id },
          });
          res.status(200).send({
            data: resp,
            message: "Rent Stuff has been successfuly updated to database",
            status: 200,
          });
        }
      }
    } catch (e) {
      next(e);
    }
  },

  accTransaction: async (req, res, next) => {
    try {
      // get data current transaction from req.body
      const { current_status_number, role_number } = req.body;
      const { id } = req.params;

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

      // if success
      const resp = await RentStuffTransaction.update(
        { accepted_status_id: updatedACCStatus },
        { where: { id } }
      );

      res.status(200).send({
        data: null,
        message: `${roleMessage(role_number)} Laboran to ACC transaction`,
        status: 200,
      });
    } catch (e) {
      next(e);
    }
  },

  rejectTransaction: async (req, res, next) => {
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
      const resp = await RentStuffTransaction.update(
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
};
