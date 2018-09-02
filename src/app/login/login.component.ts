import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendServiceService } from '../admin/backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginform') loginform: NgForm;


  constructor(private backendService: BackendServiceService,private router:Router) { }

  ngOnInit() {
  }
  onLogin(form:NgForm){
    console.log(this.loginform.value);
    let values = this.loginform.value;
    this.backendService.loginUser(values).subscribe(( (data) => {

      console.log(data);
      console.log(data[0].Status);
      if(data[0].Status==="Login Sucessful"){
        localStorage.setItem('userId', data[0].id);
        localStorage.setItem('name', data[0].name);

        if(data[0].type === '1'){
          this.router.navigate(['/admin'])}
        else{
          this.router.navigate([`/user/${data[0].id}`])
        }
      }

      else{

      }

    
      })
    )
   
  }
  
}
