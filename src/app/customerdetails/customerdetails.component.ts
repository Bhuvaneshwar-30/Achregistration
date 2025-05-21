import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { CustomerTableData } from '../interface';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

@Component({
  selector: 'app-customerdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  httpclient = inject(HttpClient);
  accountNumbers = [123456789, 987654321, 846756398, 233439895];

  customerID: number = 0;
 

  customertabledata: CustomerTableData = {
    investorname: '',
    execute_through_poa: 'no',
    bankname: '',
    accountnumber: null,
    branchname: '',
    accounttype: '',
    re_enteraccountnumber: null,
    micrnumber: null,
    ifsccode: '',
    bankholdername: '',
    bankholdername1: '',
    bankholdername2: '',
    achamount: null,
    achfromdate: null,
    achtodate: null,
    maximumperiod: false,
    mode_of_holder: '',
    Asflag: '',
    dummy3: '', dummy4: '', dummy5: '',
    dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
    dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
    dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: ''
  };

  constructor(private sharedService: SharedService, private location: Location) {}

  ngOnInit(): void {
    const Id = this.sharedService.getcustomerId();
    const flag = this.sharedService.getFlag();
    const tableData = this.sharedService.getCustomerTableData();

    

    if (!isNaN(Id)) {
      this.customerID = Id;
    }

    if (flag === 'Locate' && tableData) {
      this.customertabledata = { ...tableData };
      this.customertabledata.Asflag = 'Locate';
    }else if(flag === 'Edit'){
      this.customertabledata.Asflag = 'Edit';
    } 
    else if (flag === 'save') {
      this.customertabledata.Asflag = 'save';
    }

  }

  onMaximumPeriodChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
     
    if(isChecked){
      const fromDate = this.customertabledata.achfromdate;
      if(fromDate == null){
      alert('please select Ach From Date');
      this.customertabledata.maximumperiod = false;
      return;
      }
      const toDate = new Date(fromDate);
      toDate.setFullYear(toDate.getFullYear() + 10);
      const yyyy = toDate.getFullYear();
      const mm = String(toDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const dd = String(toDate.getDate()).padStart(2, '0');

      const formattedDate = `${yyyy}-${mm}-${dd}`;
      this.customertabledata.achtodate = formattedDate;
      // this.customertabledata.achtodate = toDate;
    } 
    else
    { 
    this.customertabledata.achtodate = null;
    }

  }
  

  // get achfromdateString(): string {
  //   return this.customertabledata.achfromdate
  //     ? this.customertabledata.achfromdate.toISOString().substring(0, 10)
  //     : '';
  // }

  // set achfromdateString(value: string) {
  //   this.customertabledata.achfromdate = value ? new Date(value) : null;
  // }




  onCheckboxChange(event: any, fieldName: keyof CustomerTableData): void {
    if (fieldName === 'execute_through_poa') {
      this.customertabledata[fieldName] = event.target.checked ? 'yes' : 'no';
    }
  }
 


 




 

  reset(): void {
    this.location.back();
  }

  Onsubmit(formRef: NgForm): void {
    if (formRef.invalid) {
      alert("Please enter the missing fields!!");
      return;
    }

    if(!this.customertabledata.bankname || this.customertabledata.bankname.trim() === ''){
      alert("please enter the Bank name!!");
      return;
    }

    if (this.customertabledata.accountnumber == null || this.customertabledata.accountnumber <= 0) {
      alert("Please enter a account number!!");
      return;
    }

    if (this.customertabledata.accountnumber !== this.customertabledata.re_enteraccountnumber || this.customertabledata.re_enteraccountnumber <=0) {
      alert("Account numbers does not match!!");
      return;
    }

    if (this.customertabledata.accounttype || this.customertabledata.accounttype.trim() === ''){
      alert("please enter the accountType!!");
      return;
    }


     if (this.customertabledata.ifsccode || this.customertabledata.ifsccode.trim() === ''){
      alert("please enter the IFSCcode!!");
      return;
    }

    if(this.customertabledata.bankholdername || this.customertabledata.bankholdername.trim() ===''){
      alert("please enter the Bank Holder Name!!");
      return;
    }

    if(this.customertabledata.achamount == null || this.customertabledata.achamount <=0 ){
      alert("please enter the ACH Amount!!");
      return;
    }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const fromDatestr = this.customertabledata.achfromdate;
      if(fromDatestr != null){
        const fromdate = new Date(fromDatestr);
        fromdate.setHours(0, 0, 0, 0); 
          if (fromdate < today) {
          alert("From Date cannot be earlier than today.");
          this.customertabledata.achfromdate = null; 
          return;
        }
        if(today==null){
          alert("enter the todate!!");
          return;
        }
      }
    

    

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': 'application/json'
      })
    };
    // const formatDate = (date: Date | null): string | null => {
    //     return date instanceof Date && !isNaN(date.getTime())
    //       ? date.toISOString()
    //       : null;
    //   };

      const payload = {
      customerID: this.customerID,
      ...this.customertabledata,
      maximumperiod: !!this.customertabledata.maximumperiod,
      achfromdate: /*formatDate*/(this.customertabledata.achfromdate),
      achtodate:  /*formatDate*/(this.customertabledata.achtodate)
    };

    let apiurl='';
    if(this.customertabledata.Asflag ==='Locate'){
      apiurl="https://localhost:7069/api/Edit";
     
    }
    else
    {
      apiurl="https://localhost:7069/api/insert";
    }

    this.httpclient.post<any>(apiurl, payload, httpOptions).subscribe({
      next: (response) => {
        console.log('API Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      },
      complete: () => {
        alert("Form submitted successfully");
      }
    });
  }
}
