class Content {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  display() {
    return {
      title: this.title,
      author: this.author,
      description: this.description,
    };
  }
}

class Book extends Content {
  constructor(title, author, description, publisher, pages) {
    super(title, author, description);
    this.publisher = publisher;
    this.pages = pages;
  }

  display() {
    return {
      ...super.display(),
      type: "book",
      publisher: this.publisher,
      pages: this.pages,
    };
  }
}

class ContentFactory {
  createContent(type, data) {
    if (type == "book") {
      return new Book(
        data.title,
        data.author,
        data.description,
        data.publisher,
        data.pages
      );
    }
    throw new Error("Invalid content type");
  }
}

module.exports = new ContentFactory();
