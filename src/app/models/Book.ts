export class Book {
  bookId: number;
  bookTitle: String;
  description: String;
  author: String;
  publishedDate: Date;
  category: String;
  publisher: String;
  lastTakenPerson: String;
  lastTakenDate: Date;
  image: File;

  constructor(bookTitle, description, author, publishedDate, category, publisher, image) {
    this.bookTitle = bookTitle;
    this.description = description;
    this.author = author;
    this.publishedDate = publishedDate;
    this.category = category;
    this.publisher = publisher;
    this.image = image;
  }
}
