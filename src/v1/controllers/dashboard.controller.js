class DashboardController {
  getBooks = (req, res) => {
    console.log("Hello from books");
    try {
      let data = {};
      let message;
      let success;

      message = " Hello from books";
      success = true;
    } catch (error) {
      message = "Error";
      success = false;
    }

    return res.json({
      data,
      message,
      success,
      status: success ? 200 : 400,
    });
  };
}

module.exports = new DashboardController();
