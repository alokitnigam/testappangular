import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendServiceService } from '../admin/backend-service.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild("signupform") signupform: NgForm;
  options = [
    { name: "IT_ADMIN", value: 1 },
    { name: "IT_USER_NORMAL", value: 0 }
  ]
  constructor(private backend:BackendServiceService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    console.log(this.signupform.value);
    this.backend.onRegister(this.signupform.value).subscribe(( (data) => {

      console.log(data);
      console.log(data[0].Status);
      if(data[0].Status==="Saved"){
        
          this.router.navigate(['/login'])}
        
      })
    )
  }
}
