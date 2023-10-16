import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  buttonMessage : string;
  @Input() email : string;
  timer : boolean = true;
  @ViewChild('digit1InputRef') digit1InputRef: ElementRef;
  @ViewChild('digit2InputRef') digit2InputRef: ElementRef;
  @ViewChild('digit3InputRef') digit3InputRef: ElementRef;
  @ViewChild('digit4InputRef') digit4InputRef: ElementRef;
  @ViewChild('digit5InputRef') digit5InputRef: ElementRef;
  @ViewChild('digit6InputRef') digit6InputRef: ElementRef;

  digit1: string = '';
  digit2: string = '';
  digit3: string = '';
  digit4: string = '';
  digit5: string = '';
  digit6: string = '';

  constructor(private userService : UserService) {}

  ngAfterViewInit() {
    this.digit1InputRef.nativeElement.focus();
  }

  onSubmit() {
    const code = this.digit1 + this.digit2 + this.digit3 + this.digit4;
    console.log('Submitted code:', code);
    this.userService.verifyCode(code, this.email).subscribe(
      result => console.log(result)
    );
  }

  moveToNext(event: Event, nextInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      nextInput.focus();
    }
  }

  ngOnInit(): void {
  }

  handleTimer(event : boolean){
    this.timer = !this.timer;
  }

  resendEmail(){
    console.log("resend");
    
    this.timer = !this.timer;
  }
}
