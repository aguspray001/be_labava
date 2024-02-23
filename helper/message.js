// acc room: 0/null (belum acc), 1 (laboran), 2 (laboran sudah kemudian ketua lab), 3 (pengembalian - laboran)
// role: 1 (admin), 2 (ketua lab), 3(laboran), 4 (mhs)

const statusMessage = (accStatusNumber) => {
  switch (accStatusNumber) {
    case 0:
      return "(New rent, technician should give the ACC first)";
    case 1:
      return "(Technician has given the ACC for this transaction)";
    case 2:
      return "(Head of Laboratory has given the ACC for this transaction)";
    default:
      break;
  }
};

const roleMessage = (roleNumber) => {
  const res =
    roleNumber === 1
      ? "Admin"
      : roleNumber === 2
      ? "Head of Laboratory"
      : roleNumber === 3
      ? "Technician"
      : "Student";

  return res;
};

module.exports = {
  statusMessage,
  roleMessage,
};
