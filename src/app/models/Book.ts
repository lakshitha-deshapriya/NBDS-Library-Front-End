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
  imageName: string;

  constructor(bookTitle, description, author, publishedDate, category, publisher, imageName) {
    this.bookTitle = bookTitle;
    this.description = description;
    this.author = author;
    this.publishedDate = publishedDate;
    this.category = category;
    this.publisher = publisher;
    this.imageName = imageName;
  }
}
