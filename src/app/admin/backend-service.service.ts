import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
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

  saveuser(comapanyDetails){
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

  
  


}
