  import { Component, inject ,OnInit } from '@angular/core';
  import { FormsModule, NgForm } from '@angular/forms';
  import { SharedService } from '../shared.service';
  import { HttpClient,HttpHeaders} from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { Location } from '@angular/common';
  import { CustomerTableData } from '../interface';
  import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

 
  @Component({
    selector: 'app-customerdetails',
    standalone:true,
    imports: [CommonModule,FormsModule,NgbDatepickerModule ],
    templateUrl: './customerdetails.component.html',
    styleUrls: ['./customerdetails.component.css']

  })



  export class CustomerdetailsComponent implements OnInit { 
  httpclient = inject(HttpClient)
  accountNumbers = [123456789, 987654321, 846756398, 233439895];
  
  customerId: number=0;
  
  customertabledata:CustomerTableData={
    investorname: '',
    execute_through_poa:'no',
    bankname: '',
    accountnumber:null,
    branchname: '',
    accounttype: '',
    re_enteraccountnumber:null,
    micrnumber:null,
    ifsccode: '',
    bankholdername: '',
    bankholdername1: '',
    bankholdername2: '',
    achamount:null,
    achfromdate: '',
    achtodate: '',
    maximumperiod:false,
    mode_of_holder: '', Asflag: '', dummy3: '', dummy4: '', dummy5: '',
    dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
    dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
    dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: ''
    
  }

  
  constructor(private sharedService: SharedService,private location: Location){}

    ngOnInit(): void{

      const Id = this.sharedService.getcustomerId();
      const flag = this.sharedService.getFlag();
     const tableData = this.sharedService.getCustomerTableData();

      if(isNaN(Id)){
        console.error('invalid customer ID',Id)
      }else{
        this.customerId = Id;
      }
      if(flag === 'Locate'){
          if (tableData) {
      this.customertabledata = { ...tableData };
      this.customertabledata.Asflag = 'Locate';
        }
      }else if(flag === 'save'){
        this.customertabledata.Asflag ='save';
      }
    }

  onCheckboxChange(event: any, fieldName: keyof typeof this.customertabledata): void {
    if(fieldName === 'execute_through_poa'){
    this.customertabledata[fieldName] = event.target.checked ? 'yes':'no';
    }
  }

  onMaxPeriodChange(): void {
  if (!this.customertabledata.achfromdate) {
    alert('Please select ACH From Date first.');
    this.customertabledata.maximumperiod = false;
    return;
  }

  const fromDate = new Date(this.customertabledata.achfromdate);

  if (isNaN(fromDate.getTime())) {
    alert('Invalid ACH From Date format.');
    this.customertabledata.maximumperiod = false;
    return;
  }

  if (this.customertabledata.maximumperiod) {
    const toDate = new Date(fromDate);
    toDate.setFullYear(toDate.getFullYear() + 10);
    this.customertabledata.achtodate = this.formatDate(toDate);
  } else {
    this.customertabledata.achtodate = ''; // allow manual entry
  }
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // standard HTML5 date input format
}





  reset(){
    this.location.back(); 
  }

  
  
  

  Onsubmit(formRef: NgForm): void{
    
    if(formRef.invalid){
      console.log("det",formRef);
      alert("please enter the missing fields")
      return;
    }
    if(this.customertabledata.accountnumber!== this.customertabledata.re_enteraccountnumber){
      alert("acccount number not match");
      return;
    }

      let apiurl = "https://localhost:7069/api/insert";
      
      const payload = {
        customerId: this.customerId,  
        ...this.customertabledata
      };

      let httpOptions={
        headers:new HttpHeaders({
          Authorization:'my-auth-token',
          'Content-type':"application/json"
        })
      }
     
      this.httpclient.post<any>(apiurl, payload, httpOptions).subscribe({
        next: (response)=>{
          console.log('Api Response',response);
        },
        error:(error)=>{
          console.log('Error',error);
          if(error.error && error.error.errors){
            console.error('validation errors:',error.error.errors);
          }
        },
        complete:()=> {
          alert("form submitted successfully:"); 
        }
      });
    }
    
}



