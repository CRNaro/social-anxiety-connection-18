// setting up the time and date stamps

module.exports = {
  dateFormat: (timestamp) => {
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  },
};

// use dateFormat function in Mongoose schemas as a getter for the createdAt field
