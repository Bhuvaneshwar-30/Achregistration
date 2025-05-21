  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { CustomerTableData } from './interface'; // adjust path if needed




  @Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    
    private customerId: number | null=null;
    private customerdata:any =null;
    private flag: string = 'Locate';
    private customerTableData: CustomerTableData | null = null;

    
    constructor(private http: HttpClient){}


    setcustomerId(id :number):void {
      this.customerId = id;
    }
    getcustomerId():number {
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



    checkCustomer(custid: number, flag: string):Observable<any>{
      return this.http.post('https://localhost:7069/api/get',{custid,flag});
    }

    setCustomerTableData(data: CustomerTableData) {
  this.customerTableData = data;
}

getCustomerTableData(): CustomerTableData | null {
  return this.customerTableData;
}
  }

