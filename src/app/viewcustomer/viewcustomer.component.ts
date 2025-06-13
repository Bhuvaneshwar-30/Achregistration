    import { Component } from '@angular/core';
    import { Router, RouterModule} from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { SharedService } from '../shared.service';
    import { CustomerTableData } from '../interface';
    import { CommonModule } from '@angular/common';
    import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


    
    @Component({
      selector: 'app-viewcustomer',
      imports: [FormsModule ,CommonModule,RouterModule],
      templateUrl: './viewcustomer.component.html',
      styleUrls: ['./viewcustomer.component.css']
    })
    export class ViewcustomerComponent {
      customerId: number  | null = null;
      selectedFlag: string = '';
      
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
    achfromdate: null,
    achtodate: null,
    maximumperiod:false,
    mode_of_holder: '', Asflag: '',
    //  dummy3: '', dummy4: '', dummy5: '',
    // dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
    // dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
    // dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: '',
    bankcode:''
    
  }
      
  constructor(private sharedService: SharedService , private router : Router){}

      Go(): void {
      if (this.customerId !== null && this.customerId > 0) {
        const selectedFlagNormalized = this.selectedFlag.trim();

        if (!['Locate', 'save', 'Edit'].includes(selectedFlagNormalized)) {
          alert('Please select a mode');
          return;
        }

        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'my-auth-token',
            'Content-Type': 'application/json',
          }),
        };

        console.log('Calling checkCustomer with:', {
          customerId: this.customerId,
          flag: selectedFlagNormalized,
          data: selectedFlagNormalized === 'Edit' ? this.customertabledata : undefined,
        });

        this.sharedService
          .checkCustomer(
            this.customerId!,
            selectedFlagNormalized,
            selectedFlagNormalized === 'Edit' || selectedFlagNormalized === 'save' ? this.customertabledata : undefined,
            httpOptions
          )
          .subscribe({
            next: (res: any) => {
              console.log('API response:', res);
              let customerArray = [];

             if (res && Array.isArray(res) && res.length > 0) {
                  customerArray = res;
                } else if (res && !Array.isArray(res) && Object.keys(res).length > 0) {
                  customerArray = [res];
                } else {
                  customerArray = [];
                }

              console.log('customerArray:', customerArray);
              console.log('customerArray length:', customerArray.length);

              // --- Handle "Customer Not Found"
              if (customerArray.length === 0) {
                if (selectedFlagNormalized === 'save') {
                  console.log('No customer found, proceeding to create new (save mode)');
                  this.sharedService.setCustomerId(this.customerId!);
                  this.sharedService.setFlag('save');
                  this.router.navigate(['/customer']);
                } else {
                  alert('Customer not found.');
                }
                return;
              }

              // --- Handle "Edit" or "Locate"
              if (selectedFlagNormalized === 'Edit' || selectedFlagNormalized === 'Locate') {
                const customer = customerArray[0];

               

                const achData = customer.achlogin?.[0] ?? null;
                const bankData = customer.bankDetails?.length > 0 ? customer.bankDetails[0] : null;

                console.log('customer:', customer);
                console.log('achlogin array:', customer.achlogin);
                console.log('First achData:', achData);
                console.log('First bankData:', bankData);

                const customerTableData: CustomerTableData = {
                  investorname: achData?.investorname || '',
                  execute_through_poa: achData?.execute_through_poa || 'no',
                  bankname: bankData?.bankname || '',
                  accountnumber: bankData?.accountnumber || null,
                  branchname: bankData?.branchname || '',
                  accounttype: bankData?.accounttype || '',
                  re_enteraccountnumber: achData?.re_enteraccountnumber || null,
                  micrnumber: bankData?.micrnumber || null,
                  ifsccode: bankData?.ifsccode || '',
                  bankholdername: bankData?.bankholdername || '',
                  bankholdername1: bankData?.bankholdername1 || '',
                  bankholdername2: bankData?.bankholdername2 || '',
                  achamount: bankData?.achamount || null,
                  achfromdate: bankData?.achfromdate || null,
                  achtodate: bankData?.achtodate || null,
                  maximumperiod: achData?.maximumperiod || false,
                  mode_of_holder: achData?.mode_of_holder || '',
                  Asflag: selectedFlagNormalized,
                  // dummy3: '', dummy4: '', dummy5: '',
                  // dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
                  // dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
                  // dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: '',
                  bankcode: bankData?.bankcode || ''
                };

                this.sharedService.setCustomerId(this.customerId!);
                this.sharedService.setCustomerTableData(customerTableData);
                this.sharedService.setbankdetailsdata(customerArray[0].bankDetails);
                this.sharedService.setFlag(selectedFlagNormalized);

                this.router.navigate(['/customer']);
              }
            },
            error: (err: HttpErrorResponse) => {
              console.error('Error fetching customer:', err.message);
              alert('Customer Not Found');
            }
          });
      } else {
        alert('Invalid ACH registration ID');
      }
    }

}

    