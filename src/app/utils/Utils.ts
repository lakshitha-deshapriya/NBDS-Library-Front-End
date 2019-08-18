export class Utils {

  static getCustomDate(date: Date) {
    const month = date.getMonth() + 1;
    let monthStr = month.toString();
    if (monthStr.length === 1) {
      monthStr = '0' + monthStr;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    return date.getFullYear() + '/ ' + monthStr + '/ ' + day;
  }

  static createImageFromBlob(image: Blob) {
    let imageToShow: any;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
    return imageToShow;
  }

}
