  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, of, throwError } from 'rxjs';
  import { Bank_name, BankDetails, CustomerTableData } from './interface';
   


  // export interface Bank {
  // bankcode: string;
  // bankname: string;
  // accountnumber: number | null;
  // } 

  @Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    
    private customerId: number | null=null;
    private customerdata:any =null;
    private flag: string = '';
    private customerTableData: CustomerTableData | null = null;
    private bankdetails:any = null;


    
    constructor(private http: HttpClient){}


    setCustomerId(id :number):void {
      this.customerId = id;
    }
    getCustomerId():number {
      return this.customerId!=null ? this.customerId:0 ;
    }

    setcustomerdata(data: any){
      this.customerdata = data;
    }

    getcustomerdata():any{
      return this.customerdata;
   
    }

    setFlag(flag: string): void {
    this.flag = flag;
    }

    getFlag(): string {
      return this.flag;
    }






    checkCustomer(customerId: number, flag: string, data?:CustomerTableData,httpOptions?: any):Observable<any>{
      console.log(`checkCustomer called with:`, { customerId, flag, data });
      if (flag === 'Locate') {
      return this.http.post('https://localhost:7069/api/get',{custid: customerId,flag});
      }
      if(flag === 'save' && data){
        return this.http.post('https://localhost:7069/api/insert',data,httpOptions)
      }

      if (flag === 'Edit' && data) {
          const payload = {
          ...data,
          Asflag: 'Edit',         // must be exact casing
          customerId: customerId      // include customerId too, if required
        };
        return this.http.post('https://localhost:7069/api/Edit',payload,httpOptions);
       }
        return throwError(() => new Error('Invalid parameters for checkCustomer'));
    }

 

    setCustomerTableData(data: CustomerTableData) {
      this.customerTableData = data;
    }

    getCustomerTableData(): CustomerTableData | null {
      return this.customerTableData;
    }


  getBankDetailsByCustomerId(customerId: number): Observable<BankDetails[]> {
    return this.http.get<BankDetails[]>(`https://localhost:7069/api/bankdetails/${customerId}`); 
  }

  get isLocateMode(): boolean {
   return this.customerTableData?.Asflag === 'Locate';
  }

  getDistinctBankNames(): Observable<Bank_name[]> {
    return this.http.get<Bank_name[]>('https://localhost:7069/api/GetBankList');
  }


  setbankdetailsdata(data: BankDetails) {
      this.bankdetails = data;
  }
  getbankdetailsdata(): BankDetails | null {
      return this.bankdetails;
  }
  getthree_field(customerID: string) {
      return this.http.post<any>('https://localhost:7069/api/newmode', {
        customerID: customerID,
         flag: 'new' 
  });
  }
    
}

