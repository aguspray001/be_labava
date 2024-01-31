module.exports = {
    create: async (req, res) => {
      const { room_name, room_number } = req.body;
      // check room_name in database
      //add to database
    },
  
    read: async (req, res) => {
      const { room_id } = req.body;
      // check user in database
      // if user exist
      // password validation
      // then return token
    },
  
    update: async (req, res) => {
      const { room_id } = req.body;
      // check user in database
      // if user exist
      // password validation
      // then return token
    },
  
    delete: async (req, res) => {
      const { room_id } = req.body;
      // check user in database
      // if user exist
      // password validation
      // then return token
    },
  };
  