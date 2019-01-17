import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  isError = false;
  isWarning = false;
  isSuccess = false;

  msg: string;

  constructor() {
  }

  setMsg(msg: string) {
    this.msg = msg;
  }

  setErrorStatus() {
    this.isError = true;
    this.isWarning = false;
    this.isSuccess = false;
  }

  setWarningStatus() {
    this.isError = false;
    this.isWarning = true;
    this.isSuccess = false;
  }

  setSuccessStatus() {
    this.isError = false;
    this.isWarning = false;
    this.isSuccess = true;
  }

  getMsgType() {
    if (this.isSuccess) {
      return 300;
    } else if (this.isWarning) {
      return 400;
    } else if (this.isError) {
      return 500;
    }
  }
}
