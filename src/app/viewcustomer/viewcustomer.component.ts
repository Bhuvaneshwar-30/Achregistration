    import { Component } from '@angular/core';
    import { Router} from '@angular/router';
    import { FormsModule, NgForm } from '@angular/forms';
    import { SharedService } from '../shared.service';
    import { CustomerTableData } from '../interface';
    
    @Component({
      selector: 'app-viewcustomer',
      imports: [FormsModule],
      templateUrl: './viewcustomer.component.html',
      styleUrl: './viewcustomer.component.css'
    })
    export class ViewcustomerComponent {
      customerId: number  | null = null;
      
      customertabledata:CustomerTableData={
    investorname : '',
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
      
      constructor(private sharedService: SharedService , private router : Router){}

Go(): void {
  if (this.customerId !== null && this.customerId > 0) {
    this.sharedService.checkCustomer(this.customerId, 'Locate').subscribe({
      next: (res:any[]) => {
        console.log('API response:', res);  
        if (!res || res.length === 0){
          alert('Customer not found. Creating new customer...');
          this.sharedService.setcustomerId(this.customerId!);
          this.sharedService.setFlag('save');
          this.router.navigate(['/customer']);
        } else {

          var customerdata = res[0];
         this.customertabledata = {
              investorname: customerdata.investorname || '',
              execute_through_poa: customerdata.execute_through_poa || 'no',
              bankname: customerdata.bankname || '',
              accountnumber: customerdata.accountnumber || null,
              branchname: customerdata.branchname || '',
              accounttype: customerdata.accounttype || '',
              re_enteraccountnumber: customerdata.re_enteraccountnumber || null,
              micrnumber: customerdata.micrnumber || null,
              ifsccode: customerdata.ifsccode || '',
              bankholdername: customerdata.bankholdername || '',
              bankholdername1: customerdata.bankholdername1 || '',
              bankholdername2: customerdata.bankholdername2 || '',
              achamount: customerdata.achamount || null,
              achfromdate: customerdata.achfromdate || '',
              achtodate: customerdata.achtodate || '',
              maximumperiod: customerdata.maximumperiod || '',
              mode_of_holder: customerdata.mode_of_holder || '',
              Asflag: customerdata.Asflag || '',
              dummy3: customerdata.dummy3 || '',
              dummy4: customerdata.dummy4 || '',
              dummy5: customerdata.dummy5 || '',
              dummy6: customerdata.dummy6 || '',
              dummy7: customerdata.dummy7 || '',
              dummy8: customerdata.dummy8 || '',
              dummy9: customerdata.dummy9 || '',
              dummy10: customerdata.dummy10 || '',
              dummy11: customerdata.dummy11 || '',
              dummy12: customerdata.dummy12 || '',
              dummy13: customerdata.dummy13 || '',
              dummy14: customerdata.dummy14 || '',
              dummy15: customerdata.dummy15 || '',
              dummy16: customerdata.dummy16 || '',
              dummy17: customerdata.dummy17 || '',
              dummy18: customerdata.dummy18 || '',
              dummy19: customerdata.dummy19 || '',
              dummy20: customerdata.dummy20 || ''
            };
          
          alert('Customer exists, redirecting...');
          this.sharedService.setcustomerId(this.customerId!);
          this.sharedService.setCustomerTableData(this.customertabledata); // NEW LINE
          this.sharedService.setFlag('Locate');
          this.router.navigate(['/customer']);
        }
      }
    });
  } else {
    alert('Error');
  }
}
}

    