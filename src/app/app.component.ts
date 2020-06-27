import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  buttonClicked: boolean;
  binaryNumber: string;
  decimalNumber: string;
  lastEditedInput: number;
  maskString: string;

  constructor(private _clipboardService: ClipboardService){
    
  }

  ngOnInit(): void {
    this.binaryNumber = "";
    this.decimalNumber = "";

    this.generateMaskString();
  }

  click() {
    if (this.assertValidity()) {
      this.buttonClicked = true;

      setTimeout(() => {
        this.buttonClicked = false;
      }, 400);

      if (this.lastEditedInput == 1 && this.binaryNumber) {
        this.decimalNumber = parseInt(this.binaryNumber, 2).toString();
        this.copy(this.decimalNumber);
      } else if (this.lastEditedInput == 2 && this.decimalNumber) {
        this.binaryNumber = parseInt(this.decimalNumber).toString(2);
        this.copy(this.binaryNumber);
      }
    }
  }

  userInput(origin: number): void {
    if (origin == 1) {
      setTimeout(() => {
        this.binaryNumber = this.binaryNumber.replace(/[^0-1]/g, '');
      }, 1);
    } else {
      setTimeout(() => {
        this.decimalNumber = this.decimalNumber.replace(/[^0-9]/g, '');
      }, 1);
    }

    this.lastEditedInput = origin;
  }

  copy(text: string){
    this._clipboardService.copyFromContent(text)
  }

  assertValidity(): boolean {
    return this.lastEditedInput == 1 && this.binaryNumber != "" || this.lastEditedInput == 2 && this.decimalNumber != "";
  }

  generateMaskString() {
    this.maskString = "";

    for (let i = 0; i < 1500; i++) {
      this.maskString += `${Math.floor(Math.random() * 10)} `;
    }
  }

}
