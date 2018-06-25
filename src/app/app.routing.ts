import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ProductComponent,EditDialog } from './products/product.component';
import { LoginComponent } from "./login/login.component";
import { AddDevice } from "./adddevice/adddevice.component";
import { RegisterComponent } from "./register/register.component";
import { ImportExcel } from "./importexcel/importexcel.component";

@NgModule({
    imports: [
        RouterModule.forRoot([ // กำหนด path ที่ใช้ในการเข้าดูแต่ละหน้า
            { path: 'main', component: ProductComponent },
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'add', component: AddDevice },
            { path: 'import', component: ImportExcel },
            { path: 'dialog', component: EditDialog },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }