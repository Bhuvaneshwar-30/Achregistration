import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Bank_name, BankDetails, CustomerTableData} from '../interface';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-customerdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  httpclient = inject(HttpClient);
  selectedBankCode: string | null = null;
  bankname : Bank_name[] = []; // Used in 'save' mode for main bank dropdown
  bankList: BankDetails[] = []; // Full list of customer's bank details from backend (Locate/Edit mode)

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
    // dummy3: '', dummy4: '', dummy5: '',
    // dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
    // dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
    // dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: '',
    bankcode:'' 
  };

  dropdownBankList: (BankDetails | Bank_name)[] = []; // List for the main bank dropdown

  filteredAccountNumbers: BankDetails[] = []; // To hold accounts for the selected bank
  myForm: any;

  constructor(private sharedService: SharedService, private location: Location) {}

  ngOnInit(): void {
    this.customerID = this.sharedService.getCustomerId();
    const flag = this.sharedService.getFlag();
    const tableData = this.sharedService.getCustomerTableData();
    const bankdata = this.sharedService.getbankdetailsdata();
   
   if (!isNaN(this.customerID)) {
       if (flag === 'save') {
          this.resetFormToNew();
          this.sharedService.getDistinctBankNames().subscribe({
              next: (bankname) => {
                this.bankname = bankname;
                this.dropdownBankList = this.bankname;
              },
              error: (err) =>{
              console.error('Failed to load bank names', err)
              }
          });
       }else { // This is the 'Locate' or 'Edit' mode block
          console.log('CUSTOMER ID:', this.customerID);
          console.log('FLAG:', flag);
          this.sharedService.getBankDetailsByCustomerId(this.customerID).subscribe({
           next: (bankList) => {
            console.log("Bank List received from backend (ngOnInit fetch):", bankList);
            this.bankList = bankList;
            this.dropdownBankList = this.bankList;
            console.log("Dropdown Bank List (Locate/Edit mode):", this.dropdownBankList);

            if ((flag === 'Locate' || flag === 'Edit') && tableData && bankdata) {
              this.dropdownBankList = this.bankList.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.bankcode === value.bankcode)
              );

                console.log('tableData from shared service:', tableData);
              console.log('bankdata from shared service:', bankdata);

                this.customertabledata = {
                    investorname: tableData.investorname || '',
                    execute_through_poa: tableData.execute_through_poa || 'no',
//                     achamount: tableData.achamount || null,
//                     achfromdate: tableData.achfromdate || '',
//                     achtodate: tableData.achtodate || '',
                    maximumperiod: tableData.maximumperiod || false,
                    mode_of_holder: tableData.mode_of_holder || '',
                    Asflag: flag,
//                     dummy3: '', dummy4: '', dummy5: '',
//                     dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
//                     dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
//                     dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: '',

                    // Initial bank/account details from shared service
                    bankcode: bankdata.bankcode || '',
                    bankname: bankdata.bankname || '', // You can keep bankname populated or set to ''
                    accountnumber: bankdata.accountnumber != null ? Number(bankdata.accountnumber) : null,
                    re_enteraccountnumber: tableData.re_enteraccountnumber != null ? Number(tableData.re_enteraccountnumber) : null,
                    

                    // <<<--- CRITICAL CHANGE: INITIALIZE THESE AS BLANK/NULL --->>>
                  branchname: bankdata.branchname || '', 
                  accounttype: bankdata.accounttype || '', 
                  micrnumber: bankdata.micrnumber != null ? bankdata.micrnumber : null, 
                  ifsccode: bankdata.ifsccode || '', 
                  bankholdername: bankdata.bankholdername || '', 
                  bankholdername1: bankdata.bankholdername1 || '',
                  bankholdername2: bankdata.bankholdername2 || '',
                  achfromdate: bankdata.achfromdate || '',
                  achtodate: bankdata.achtodate || '',
                  achamount: bankdata.achamount != null ? bankdata.achamount : null,

                
                };
                console.log('ngOnInit: customertabledata after initial assignment:', this.customertabledata);

                
                if (this.customertabledata.bankcode) {
                    this.onBankSelectionChange();
                    if (this.customertabledata.accountnumber !== null) { 
                        const initialAccountDetails = this.bankList.find(
                            b => b.bankcode === this.customertabledata.bankcode &&
                                 b.accountnumber === this.customertabledata.accountnumber
                        );
                        if (initialAccountDetails) {
                            this.populateOtherFields(initialAccountDetails);
                        }
                    }
                }
            }
          },
          error: (err) =>{
             console.error('Failed to load bank list', err)
          }
        });
       }
      }


  
}


  get isLocateMode(): boolean {
    return this.sharedService.isLocateMode;
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
      const mm = String(toDate.getMonth() + 1).padStart(2, '0');
      const dd = String(toDate.getDate()).padStart(2, '0');

      const formattedDate = `${yyyy}-${mm}-${dd}`;
      this.customertabledata.achtodate = formattedDate;
    }
    else
    {
      this.customertabledata.achtodate = null;
    }
  }

  onCheckboxChange(event: Event, fieldName: keyof CustomerTableData): void {
    const input = event.target as HTMLInputElement;
    if (fieldName === 'execute_through_poa') {
      (this.customertabledata[fieldName] as 'yes' | 'no') = input.checked ? 'yes' : 'no';
    }
  }

  goback(): void {
    this.location.back();
  }

  Onsubmit(formRef: NgForm): void {
    if (formRef.invalid && null) { 
      alert("Please enter the missing fields!!");
      return;
    }

    if (formRef.invalid) {
        alert("Please enter the missing fields!!");
        return;
    }

    if (this.customertabledata.micrnumber !== null) {
      const micrNum = Number(this.customertabledata.micrnumber);
      if (isNaN(micrNum)) {
        alert("MICR Number must be a valid numeric value.");
        return;
      } else {
        this.customertabledata.micrnumber = micrNum;
      }
    }

    if (!this.customertabledata.bankcode) {
      alert("Please select a bank from the dropdown!");
      return;
    }

    if (this.customertabledata.accountnumber == null || this.customertabledata.accountnumber <= 0) {
      alert("Please enter an account number!!"); 
      return;
    }

    const accNum = Number(this.customertabledata.accountnumber);
    const reAccNum = Number(this.customertabledata.re_enteraccountnumber);

    if (isNaN(accNum) || isNaN(reAccNum) || accNum !== reAccNum || reAccNum <= 0) {
      alert("Account numbers do not match or re-entered account number is invalid!");
      return;
    }

    if (!this.customertabledata.accounttype || this.customertabledata.accounttype.trim() === ''){
      alert("please enter the accountType!!");
      return;
    }

    if (!this.customertabledata.ifsccode || this.customertabledata.ifsccode.trim() === ''){
      alert("please enter the IFSCcode!!");
      return;
    }

    if(!this.customertabledata.bankholdername || this.customertabledata.bankholdername.trim() ===''){
      alert("please enter the Bank Holder Name!!");
      return;
    }

    if(this.customertabledata.achamount== null || this.customertabledata.achamount <=0 ){
      alert("please enter the ACH Amount!!");
      return;
    }
    if(!this.customertabledata.achfromdate){
      alert("please enter the ACH From Date!!"); 
      return;
    }

    if(!this.customertabledata.achtodate ){
      alert("please enter the ACH To Date!!"); 
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
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': 'application/json'
      })
    };

    const payload = {
      customerID: this.customerID,
      ...this.customertabledata,
      maximumperiod: !!this.customertabledata.maximumperiod,
      achfromdate: (this.customertabledata.achfromdate),
      achtodate: (this.customertabledata.achtodate)
    };

    let apiurl='';
    if(this.customertabledata.Asflag ==='Edit'){
      apiurl="https://localhost:7069/api/Edit";
    }
    else if (this.customertabledata.Asflag === 'save')
    {
      apiurl="https://localhost:7069/api/insert";
    }else
    {
      alert('your in Locate Mode'); 
      return;
    }

    this.httpclient.post<any>(apiurl, payload, httpOptions).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        alert("Form submitted successfully"); 
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        alert("Form submission failed. Check console for details."); 
      },
      complete: () => {
        
      }
    });
  }

  onBankSelectionChange(): void {
    console.log('Selected bank code:', this.customertabledata.bankcode);
    console.log('Current Asflag in onBankSelectionChange:', this.customertabledata.Asflag);

    
    this.customertabledata.accountnumber = null; 
    this.filteredAccountNumbers = []; 
    this.resetBankDetailsFields(); 

    if (this.customertabledata.Asflag === 'save') {
      const selected = this.bankname.find(bank => bank.bankcode === this.customertabledata.bankcode);
      if (selected) {
        this.customertabledata.bankname = selected.bankname;
        this.customertabledata.bankcode = selected.bankcode;
        
      } else {
          this.customertabledata.bankname = '';
          this.customertabledata.bankcode = '';
      }
    } else { 
      console.log('Executing ELSE block (Locate/Edit mode logic)');
      console.log('Value of customertabledata.bankcode being searched for:', this.customertabledata.bankcode);
      console.log('Contents of this.bankList BEFORE find operation:', this.bankList);

      
      this.filteredAccountNumbers = this.bankList.filter(
        bank => bank.bankcode === this.customertabledata.bankcode && bank.accountnumber !== null
      );
      // Populate only the bank name, as other details depend on account number
      const selectedBankForName = this.bankList.find(
          bank => bank.bankcode === this.customertabledata.bankcode
      );
      this.customertabledata.bankname = selectedBankForName ? selectedBankForName.bankname : '';
      
      // If there's only one account for this bank, pre-select it and populate fields
      // if (this.filteredAccountNumbers.length === 1) {
      //   this.customertabledata.accountnumber = this.filteredAccountNumbers[0].accountnumber;
      //   this.populateOtherFields(this.filteredAccountNumbers[0]);
      // }
      // If multiple accounts, user needs to select. Fields are already reset above.
    }
  }

  
  populateOtherFields(account: BankDetails): void {
    this.customertabledata.bankname = account.bankname;
    this.customertabledata.branchname = account.branchname;
    this.customertabledata.accounttype = account.accounttype;
    this.customertabledata.ifsccode = account.ifsccode;
    this.customertabledata.micrnumber = account.micrnumber;
    this.customertabledata.bankholdername = account.bankholdername;
    this.customertabledata.bankholdername1 = account.bankholdername1;
    this.customertabledata.bankholdername2 = account.bankholdername2;
    this.customertabledata.achamount = account.achamount;
    this.customertabledata.achfromdate = account.achfromdate ? account.achfromdate.slice(0, 10) : '';
    this.customertabledata.achtodate = account.achtodate ? account.achtodate.slice(0, 10) : '';

  }

 
  resetBankDetailsFields(): void {
    this.customertabledata.branchname = '';
    this.customertabledata.accounttype = '';
    this.customertabledata.ifsccode = '';
    this.customertabledata.micrnumber = null;
    this.customertabledata.bankholdername = '';
    this.customertabledata.bankholdername1 = '';
    this.customertabledata.bankholdername2 = '';
    this.customertabledata.achamount = null;
    this.customertabledata.achfromdate = '';
    this.customertabledata.achtodate = '';
   
  }

 
  onAccountNumberSelectionChange(): void {
    const selectedAccountNumber = this.customertabledata.accountnumber;
    if (selectedAccountNumber !== null && selectedAccountNumber !== undefined) {
      const selectedAccountDetails = this.filteredAccountNumbers.find(
        acc => acc.accountnumber === selectedAccountNumber
      );
      if (selectedAccountDetails) {
        this.populateOtherFields(selectedAccountDetails);
      } else {
        console.warn('Selected account number not found in filtered list.');
        this.resetBankDetailsFields(); 
      }
    } else {
     
      this.resetBankDetailsFields();
    }
  }

    resetFormToNew(): void {
    //console.log('resetFormToNew: Resetting form to "save" mode. (Before assignment)');
    const preservedInvestorName = this.customertabledata.investorname;
    const preservedModeOfHolder = this.customertabledata.mode_of_holder;
    this.customertabledata = {
      Asflag: 'save',
      investorname: preservedInvestorName,
      execute_through_poa: 'no',
      bankname: '',
      bankcode: '',
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
      mode_of_holder: preservedModeOfHolder,
      // dummy3: '', dummy4: '', dummy5: '',
      // dummy6: '', dummy7: '', dummy8: '', dummy9: '', dummy10: '',
      // dummy11: '', dummy12: '', dummy13: '', dummy14: '', dummy15: '',
      // dummy16: '', dummy17: '', dummy18: '', dummy19: '', dummy20: ''
    };
  console.log('resetFormToNew: customertabledata.Asflag after assignment = ', this.customertabledata?.Asflag);
    console.log('resetFormToNew: sharedService.getFlag() after reset = ', this.sharedService.getFlag());
    console.log('resetFormToNew: sharedService.getCustomerTableData() after reset = ', this.sharedService.getCustomerTableData());
    this.filteredAccountNumbers=[];
    this.sharedService.setFlag('save'); // Set the service's flag to 'save'
    this.sharedService.setCustomerTableData(this.customertabledata)
  }
downloadPDF(): void {
  try {
    const doc = new jsPDF();
    const customerId = this.customerID || 'Unknown';

    const missingFields: string[] = [];

    if (!this.customertabledata.investorname?.trim()) missingFields.push('Investor Name');
    if (!this.customertabledata.accountnumber) missingFields.push('Account Number');
    if (!this.customertabledata.branchname?.trim()) missingFields.push('Branch Name');
    if (!this.customertabledata.accounttype?.trim()) missingFields.push('Account Type');
    if (!this.customertabledata.ifsccode?.trim()) missingFields.push('IFSC Code');
    if (!this.customertabledata.bankholdername?.trim()) missingFields.push('Bank Holder Name');

    if (missingFields.length > 0) {
      alert('Please fill the mandatory fields:\n' + missingFields.join('\n'));
      return;
    }

    const data: [string, string][] = [
      ['Investor Name', this.customertabledata.investorname],
      ['POA Execution', this.customertabledata.execute_through_poa],
      ['Bank Name', this.customertabledata.bankname],
      ['Account Number', this.customertabledata.accountnumber?.toString() || ''],
      ['Re-Enter Account Number', this.customertabledata.re_enteraccountnumber?.toString() || ''],
      ['Branch Name', this.customertabledata.branchname],
      ['Account Type', this.customertabledata.accounttype],
      ['MICR Number', this.customertabledata.micrnumber?.toString() || ''],
      ['IFSC Code', this.customertabledata.ifsccode],
      ['Bank Holder Name', this.customertabledata.bankholdername],
      ['ACH Amount', this.customertabledata.achamount?.toString() || ''],
      ['ACH From Date', this.customertabledata.achfromdate || ''],
      ['ACH To Date', this.customertabledata.achtodate || ''],
      ['Maximum Period', this.customertabledata.maximumperiod ? 'Yes' : 'No'],
      ['Bank Code', this.customertabledata.bankcode],
    ];

    const filteredData = data.filter(([_, value]) =>
      value !== null && value !== undefined && value.toString().trim() !== ''
    );

    if (filteredData.length === 0) {
      alert("No customer data available to print.");
      return;
    }

    autoTable(doc, {
      head: [['Field', 'Value']],
      body: filteredData,
      startY: 20,
    });

    doc.save(`Customer_Record_${customerId}.pdf`);
  } catch (err) {
    console.error("PDF Generation failed:", err);
    alert("An error occurred while generating the PDF. Please try again.");
  }
}




}