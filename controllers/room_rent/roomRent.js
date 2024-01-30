module.exports = {
  rentRoom: async (req, res) => {
    const {
      tenant_id,
      rent_date,
      return_date,
      purpose,
      lecture,
      activity,
      organization,
    } = req.body;

    const data = {
      tenant_id,
      rent_date,
      return_date,
      purpose,
      lecture,
      activity,
      organization,
      accepted_status_id: 0,
    };

    // check room in that date, available or not
    // if available then insert to queue
    // if unavailable then send message
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
