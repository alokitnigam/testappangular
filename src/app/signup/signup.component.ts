import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild("signupform") signupform: NgForm;
  selectedOption: string;
  options = [
    { name: "IT_ADMIN", value: 1 },
    { name: "IT_USER_NORMAL", value: 2 }
  ]
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    console.log(this.signupform);
  }
}
