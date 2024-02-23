const moment = require("moment");

const isDateTimeBetween = (startDateTimeStr, endDateTimeStr, checkDateTimeStr) => {
    const startDateTime = moment(startDateTimeStr);
    const endDateTime = moment(endDateTimeStr);
    const checkDateTime = moment(checkDateTimeStr);

    // Check if the checkDateTime is between startDateTime and endDateTime
    return checkDateTime.isBetween(startDateTime, endDateTime, null, '[]'); // '[]' includes the start and end dates
}

module.exports = { isDateTimeBetween }
