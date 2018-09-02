import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { DetailsComponent } from '../details/details.component';
import { BackendServiceService } from '../admin/backend-service.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  company=[];
   id;

  constructor(public bottomSheet: MatBottomSheet,private backend:BackendServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      
     
     

    }

  ngOnInit() {


     this.id = this.activatedRoute.snapshot.params['id'] ;
    this.backend.getAllCompanybyUser(this.id).subscribe(( (data) => {

      console.log(data);
      console.log(data[0].id);

      for (let i = 0; i < Object.keys(data).length; i++) {
          let newName = {
              data: {
                  id: data[i].id,
                  name:data[i].name,
                  address: data[i].address,
                  approved:data[i].approved,
                  user:{
                    email:data[i].user.email,
                    id:data[i].user.id,
                    mobile:data[i].user.mobile,
                    name:data[i].user.name,
                    password:data[i].user.password,
                    userType:data[i].user.userType
                  } 
                   }
          };
          

          this.company.push(newName);
        }
      })
    )


   
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  onAdd(){
    let matchDetail = {
      c_id: this.id,
      u_id:this.id,
      type: 'Create'      //add 
    };
    this.bottomSheet.open(DetailsComponent, {
      data: matchDetail
    });
  }

}
