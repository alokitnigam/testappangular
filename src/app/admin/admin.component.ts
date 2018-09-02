import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { DetailsComponent } from '../details/details.component';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  companies=[];
  users=[];
  cname;

  

  constructor(public bottomSheet: MatBottomSheet,private backend: BackendServiceService) {
      
   }

  ngOnInit() {

    this.getAllCompanies();
   
    this.backend.getAllUsers().subscribe(( (data) => {

      console.log(data);
      // console.log(data[0].id);
       let all={
         data: {
           name:"All",
         }
       }
      this.users.push(all);
      for (let i = 0; i < Object.keys(data).length; i++) {
           let newName = {
               data: {
                      email:data[i].email,
                     id:data[i].id,
                     mobile:data[i].mobile,
                     name:data[i].name,
                     password:data[i].password,
                     userType:data[i].userType
                   } 
                };
            
           this.users.push(newName);
         }
      }))
  }

  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
  }
  search(){
    if(this.cname === ""){
      console.log("add text")
    }
    else{
    }
  }
  getAllCompanies(){
    this.backend.getAllCompanies().subscribe(( (data) => {

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

          this.companies.push(newName);
        }
      })
    )
  }
  openDialog(id,uid){
    let matchDetail = {
      c_id: id,
      u_id: uid,
      type: 'Edit' ,  //edit
      from: 'admin' ,

    };
    this.bottomSheet.open(DetailsComponent, {
      data: matchDetail
    });
  }
 onAdd(){
  let matchDetail = {
    data: "1111111111111111111111111111",
    type: 'Create' ,
    from: 'admin'     //add 
  };
  this.bottomSheet.open(DetailsComponent, {
    data: matchDetail
  });

 }

 delete(id){
   console.log(id);
   
   this.backend.deletecompany(id).subscribe((
     
       (response) => {
         console.log(response);
         var index = this.companies.map(function(e){ return e.id;}).indexOf(id);
                if (index > -1)
                {
                    this.companies.splice(index, 1);
                   
                }
      
    })
  );
  
  }

  approve(id){
    this.backend.approvecompany(id).subscribe(response=> console.log(response));
  }
    
   
 }



 


