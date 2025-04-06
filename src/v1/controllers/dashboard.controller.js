const ContentFactory = require("../factories/ContentFactory");

class DashboardController {
  getBooks = (req, res) => {
    let data = {};
    let message;
    let success;
    try {
      // Example usage of the factory design pattern
      const book = ContentFactory.createContent("book", {
        title: "Factory design pattern",
        author: "Ganesh",
        description: "A classic book on design patterns",
        publisher: "Akrivia",
        pages: 416,
      });

      data = {
        book: book.display(),
      };
      message = "Successfully created educational content";
      success = true;
    } catch (error) {
      message = error.message || "Error creating educational content";
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
