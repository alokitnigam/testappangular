import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BackendServiceService } from '../admin/backend-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild("companyform") companyform: NgForm;

  bottomSheetData;
  hidden=false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private backend:BackendServiceService) {

  }

  ngOnInit() {
    this.bottomSheetData = this.data;
    console.log(this.bottomSheetData, 'this.bottomSheetData');
    if(this.bottomSheetData.from !== "admin"){
      this.hidden=true;
    }
    if(this.bottomSheetData.from === "admin" && this.bottomSheetData.type ==="Create"){
      this.hidden=true;
    }
  }
  onSave(){
       var companyDetails=
        {
          cid : this.bottomSheetData.c_id,
          uid : this.bottomSheetData.u_id,
          name : this.companyform.value.companyname,
          address : this.companyform.value.companyaddress
        }
     ;
      console.log(this.companyform.value);
      if(this.bottomSheetData.type === "Create"){

        this.backend.saveuser(companyDetails).subscribe(
          (response)=>console.log(response),
        );
      }
      else{
        this.backend.edituser(companyDetails).subscribe(
          (response)=>console.log(response),
        );

      }
    
  }

  
}
