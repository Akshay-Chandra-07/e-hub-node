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

class Video extends Content {
  constructor(title, author, description, link, length) {
    super(title, author, description);
    this.link = link;
    this.length = length;
  }

  display() {
    return {
      ...super.display(),
      type: "video",
      author: this.author,
      description: this.description
    }
  }
}

class ContentFactory {
  createContent(type, data) {
    if (!type || !data) {
      throw new Error('Type and data are required');
    }

    switch(type) {
      case "book":
        return new Book(
          data.title,
          data.author,
          data.description,
          data.publisher,
          data.pages
        );
      case "video":
        return new Video(
          data.title,
          data.author,
          data.description,
          data.link,
          data.length
        );
      default:
        throw new Error(`Invalid content type: ${type}`);
    }
  }
}

module.exports = new ContentFactory();
