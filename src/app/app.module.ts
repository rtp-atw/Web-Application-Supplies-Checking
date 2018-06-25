import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ProductComponent,EditDialog,PopupImage } from './products/product.component';
import { NavbarComponent } from './nav/nav.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AddDevice } from "./adddevice/adddevice.component";
import { ImportExcel } from "./importexcel/importexcel.component";
import { NavbarService } from "./nav/nav.service";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as moment from 'moment';

//ตั้งค่าการเชื่อมต่อ Firebase
export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyACabjh7hd9ZZM2uKnexKVlYFpkaw7mMM0",
    authDomain: "storage-846cc.firebaseapp.com",
    databaseURL: "https://storage-846cc.firebaseio.com",
    projectId: "storage-846cc",
    storageBucket: "storage-846cc.appspot.com",
    messagingSenderId: "126508740198"
  }
};
// ประการการใช้งาน เครื่องมือ และหน้าต่างๆที่มีใน app
@NgModule({
  imports: [ BrowserModule,  //Any tools ที่ต้องการใช้งาน
                   FormsModule,
                   AppRoutingModule,
                   AngularFireModule.initializeApp(firebaseConfig.firebase),
                   AngularFirestoreModule, 
                   AngularFireAuthModule,
                   AngularFireDatabaseModule,
                   HttpModule,
                   MatDialogModule,
                   BrowserAnimationsModule,
                   HttpClientModule,
                   MatNativeDateModule,
                   ReactiveFormsModule,
                   MatButtonModule,
                   MatDatepickerModule,
                   MatInputModule,   
                   MatTableModule,
                   MatToolbarModule,
                   MatSidenavModule,  
                   MatMenuModule,
                   MatIconModule
                   ],
  declarations: [ AppComponent, //Any pages
                          ProductComponent,
                          LoginComponent,
                          RegisterComponent,
                          AddDevice,
                          ImportExcel,
                          NavbarComponent,
                          EditDialog,
                          PopupImage
                          ],
  providers: [ AddDevice,MatDialogModule,NavbarService],
  bootstrap: [AppComponent],
  entryComponents: [ProductComponent, EditDialog,PopupImage],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]

})

export class AppModule { }

