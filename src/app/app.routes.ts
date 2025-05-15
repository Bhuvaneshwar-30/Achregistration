import { Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ViewcustomerComponent } from './viewcustomer/viewcustomer.component';


export const routes: Routes = [
    {path:'',
        component:ViewcustomerComponent,
        pathMatch:'full'
    },
    {path:'customer',
     component:CustomerdetailsComponent,
    pathMatch:'full'}
];
