export class Book {
  bookId: number;
  bookCode: String;
  bookTitle: String;
  description: String;
  author: String;
  publishedDate: Date;
  publishedDateStr: String;
  category: String;
  publisher: String;
  lastTakenPerson: String;
  lastTakenDate: Date;
  imageName: string;

  constructor(bookCode, bookTitle, description, author, publishedDate, category, publisher, imageName) {
    this.bookCode = bookCode;
    this.bookTitle = bookTitle;
    this.description = description;
    this.author = author;
    this.publishedDate = publishedDate;
    this.category = category;
    this.publisher = publisher;
    this.imageName = imageName;
  }
}
