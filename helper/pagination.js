module.exports = {
  pagination: (page, limitData) => {
    let currentPage = parseInt(page) || 1;
    let limit = parseInt(limitData) || 5;
    let offset = (parseInt(currentPage) - 1) * limit || 0;

    return { limit, offset };
  },
};
