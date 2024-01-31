const { Sequelize } = require("../../models");
const Op = Sequelize.Op;
const RentRoomTransaction = require("../../models").RentRoomTransaction;

module.exports = {
  rentRoom: async (req, res) => {
    const {
      user_id,
      rent_date,
      return_date,
      purpose,
      dosen_pengampu,
      activity,
      organization,
    } = req.body;

    const data = {
      user_id,
      rent_date,
      return_date,
      purpose,
      dosen_pengampu,
      activity,
      organization,
      accepted_status_id: 0,
    };

    // check room in that date, available or not
    try {
      // const checkRentData = await RentRoomTransaction.findOne({where:{
      //   rent_date: {[Op.eq]: rent_date}
      // }})
      const checkRentData = await RentRoomTransaction.findOne({where:{
        rent_date: {[Op.eq]: rent_date}
      }})
      if(checkRentData === null){
        const rentData = await RentRoomTransaction.create({data});
        console.log(rentData);
        res.status(200).send({
          data: rentData,
          status: 200,
          message: "Rent room is success, wait till your proposal is accepted",
        });
      }else{
        throw new Error("Cannot rent room on that date, room has been booked at: "+ rent_date)
      }
    } catch (e) {
      res.status(400).send({data: null, message: e.message, status: 400})
    }
  },
  accRentRoom: async (req, res) => {
    // acc room: 0 (belum acc), 1 (laboran), 2 (laboran + pak hakim)
    // role: 1 (admin), 2 (laboran), 3(ketua lab)
    const { accepted_status_id, role_id } = req.body;

    //if acc_status is 0
    if (accepted_status_id === 0 && role_id === 2) {
      accepted_status_id = 1;
    } else if (accepted_status_id === 0 && role_id === 3) {
      // error message (laboran belum menyetujui)
    } else if ((accepted_status_id = 1 && role_id === 3)) {
      accepted_status_id = 2;
    }

    // update accepted status to db
  },
  rejectRentRoom: async (req, res) => {
    // acc room: 0 (belum acc), 1 (laboran), 2 (laboran + pak hakim), 3 rejected
    // role: 1 (admin), 2 (laboran), 3(ketua lab)
    const { accepted_status_id, role_id } = req.body;

    //if acc_status is 0
    if (accepted_status_id === 0 && (role_id === 2 || role_id === 3)) {
      accepted_status_id = 3;
    } else if ((accepted_status_id = 1 && role_id === 3)) {
      accepted_status_id = 3;
    }
    // update accepted status to db
  },
  rollBackRentRoom: async (req, res) => {
    const { accepted_status_id, role_id } = req.body;

    if (
      (accepted_status_id === 1 ||
        accepted_status_id === 2 ||
        accepted_status_id === 3) &&
      role_id === 3
    ) {
      accepted_status_id = 0;
    } else {
      // error message (pengajuan rollback hanya bisa dilakukan ketua lab)
    }
  },
};
