 
 
 export interface CustomerTableData { 
    investorname: string;
    execute_through_poa:'yes'|'no';
    bankname: string;
    accountnumber:number | null;
    branchname: string;
    accounttype: string;
    re_enteraccountnumber: number | null;
    micrnumber: number | null;
    ifsccode: string;
    bankholdername: string;
    bankholdername1: string;
    bankholdername2: string;
    achamount: number | null;
    achfromdate: string | null;
    achtodate: string | null;
    maximumperiod:boolean;
    mode_of_holder: string; Asflag: string; dummy3: string; dummy4: string; dummy5: string;
    dummy6: string; dummy7: string; dummy8: string; dummy9: string; dummy10: string;
    dummy11: string; dummy12: string; dummy13: string; dummy14: string; dummy15: string;
    dummy16: string; dummy17: string; dummy18: string; dummy19: string; dummy20: string;
  }