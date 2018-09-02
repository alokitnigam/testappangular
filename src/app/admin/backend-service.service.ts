import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs';
@Injectable()
export class BackendServiceService {
   headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   

  constructor(private http:HttpClient) { }

   getAllCompanies(){
    return this.http.get("http://localhost:8888/getAllCompanies");
  }

  getAllCompanybyUser(id){
    return this.http.get(`http://localhost:8888/getAllCompanybyUser/${id}`);
  }

  getAllUsers(){
    return this.http.get("http://localhost:8888/getAllUsers");
  }

  saveCompany(comapanyDetails){
    console.log(comapanyDetails);
    console.log(JSON.stringify(comapanyDetails));

    return this.http.post(`http://localhost:8888/AddCompany/${comapanyDetails.uid}?name=${comapanyDetails.name}&address=${comapanyDetails.address}`,"",{headers:this.headers});
  }

  deletecompany(id){
    return this.http.get(`http://localhost:8888/DeleteCompany/${id}`);
  }
  approvecompany(id){
    return this.http.get(`http://localhost:8888/ApproveCompany/${id}`);

  }
  edituser(comapanyDetails){
    console.log(comapanyDetails);
    return this.http.post(`http://localhost:8888/EditCompany/${comapanyDetails.cid}?name=${comapanyDetails.name}&address=${comapanyDetails.address}`,"",{headers:this.headers});

  }

  loginUser(values){
    console.log(values)
  
    return this.http.post(`http://localhost:8888/login?email=${values.username}&password=${values.password}`, "", {headers:this.headers})
  }
  
  companyFilter(id,cname){
    return this.http.post(`http://localhost:8888/getAllCompaniesFilter?id=${id}&company=${cname}`,"",{headers:this.headers});

  }
  onRegister(values){
    return this.http.post(`http://localhost:8888/register?email=${values.email}&password=${values.password}&name=${values.Name}
    &userType=${values.userType}&mobile=${values.mobile}&username=${values.UserName}`, "", {headers:this.headers})

  }

}
