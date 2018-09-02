import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { DetailsComponent } from '../details/details.component';
import { BackendServiceService } from './backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  companies=[];
  users=[];
  cname;
  name:any;
  companyselected=false; //company is selected
  companyValue:String="";    //set selected company value for further
  id="";
  all=[];

  constructor(public bottomSheet: MatBottomSheet,private backend: BackendServiceService,private router:Router) {
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

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }
  
  onChange(event): void {  
    const newVal = event.target.value;
    console.log(newVal);
    if(newVal !== "undefined"){
      this.companyselected=true;
    this.id=newVal;
     
      this.companies.splice(0,this.companies.length);
      this.backend.companyFilter(newVal,"").subscribe(( (data) => {

        console.log(data);
        if(Object.keys(data).length === 0){
          console.log("No data found");
        }
        else{
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
          }}
        })
      )

    }
    else{
      this.companies=this.all;
      this.id="";
    }

    if(this.companyselected){
      
    }

  }
  search(value){
    if(this.cname !== ""){
      console.log(value);
      this.companyValue=value;
      this.companies.splice(0,this.companies.length);
      this.backend.companyFilter(this.id,value).subscribe(( (data) => {

        console.log(data);
        if(Object.keys(data).length === 0){
          console.log("No data found");
        }
        else{
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
          }}
        })
      )
    }
    else{
      this.companyValue="";
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
          this.all.push(newName);
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
   
    u_id: 1,
    type: 'Create'      //add 
  };
  this.bottomSheet.open(DetailsComponent, {
    data: matchDetail
  });

 }

 delete(id,i){
   console.log(id);

   this.backend.deletecompany(id).subscribe((
     
       (response) => {
         console.log(response);
         this.companies.splice(i, 1);
      
    })
  );
  
  }

  approve(id){
    this.backend.approvecompany(id).subscribe(response=> console.log(response));
  }
    
   
 }



 


