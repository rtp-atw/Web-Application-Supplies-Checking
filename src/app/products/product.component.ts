import { Component, OnInit, Inject } from '@angular/core';
import { deviceDetail } from './product';
import { AddDevice } from '../adddevice/adddevice.component';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NavbarService } from '../nav/nav.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

// ส่วน หน้าหลัก
@Component({
  moduleId: module.id,
  templateUrl: 'product.template.html',

})



export class ProductComponent implements OnInit {
  // ระบุบ หัวตาราง
  displayedColumns = [
    'number',
    'serialNumber',
    'date',
    'name',
    'detail',
    'location',
    /* 'oldSerialNumber', */
    'status',
    'photo',
    'remark',
    'edit'
  ];

  editProductForm = false;
  editedProduct: any = {};
  currentUID: any;
  devicelist: Observable<any[]>;
  devicelist2: AngularFireList<any>;
  editingDevice: deviceDetail;
  file: any; picUrl: any;
  bogusDataSource = new MatTableDataSource<Element>(null); // กำหนดให้ ข้อมูลของหัวตารางมีค่า null

  constructor(
    private afAuth: AngularFireAuth,
    public angFire: AngularFireDatabase,
    private router: Router,
    private addDevice: AddDevice,
    public dialog: MatDialog,
    public nav: NavbarService

  ) {
    //// Reference ตำแหน่งที่อยู่ของ Database
    this.devicelist = angFire.list('/devices').valueChanges();

    this.devicelist2 = angFire.list('/devices');

  }
  ngOnInit() {
    this.nav.show(); // แสดง nav-bar จากหน้านี้
    this.afAuth.authState.subscribe((auth) => {
      this.currentUID = auth.uid;
      console.log(this.currentUID);
      console.log(auth);
    });
  }
  // Function สร้าง Pop Up Field แก้ไขข้อมูล
  openDialogEdit(deviceKey: any): void {
    console.log('dialogkey', deviceKey);
    const dialogRef = this.dialog.open(EditDialog, {
      width: '1200px',
      height: 'auto',
      data: deviceKey
    });
  }
  // Function สร้าง Pop Up แสดงรูป
  openPopupImage(deviceKey: any): void {
    console.log('dialogkey', deviceKey);
    const dialogRef = this.dialog.open(PopupImage, {
      data: deviceKey,
      panelClass: 'custom-modalbox'
    });
  }

  toAddDevice() {
    this.router.navigateByUrl('/add');
  }
  // Function ลบข้อมูล
  removeProduct(deviceKey: any) {
    if (confirm('Are you sure you want to delete this device?')) {
      if (deviceKey) {
        this.devicelist2.remove(deviceKey);
      }
      console.log('key', deviceKey);
    } else {
      console.log('back');
    }
  }
  // Function เลื่อนไปบนสุด
  scrollToTop() {
    window.scrollTo(0, 0);
  }


  logout() {
    this.afAuth.auth.signOut();
    console.log('logout');
    this.router.navigateByUrl('/');
  }

}

// ส่วน Pop Up Field แก้ไขข้อมูล
@Component({
  moduleId: module.id,
  selector: 'product.edit.dialog',
  templateUrl: 'product.edit.dialog.html',
})
export class EditDialog {


  devicelist: Observable<any[]>;
  editedProduct: any = {};
  file: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialog>, private angFire: AngularFireDatabase, private addDevice: AddDevice,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.devicelist = angFire.list('/devices').valueChanges();
    console.log('key', data);
    this.devicelist.subscribe((items) => this.editedProduct = items.find(item => item.key === data));
    console.log('editproduct', this.editedProduct);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateProduct(deviceKey: any, editedProduct: deviceDetail) {

    console.log('dataUpdate', editedProduct);
    console.log('keyUpdate', deviceKey);
    this.addDevice.saveEditProduct(deviceKey, editedProduct, this.file);
    this.dialogRef.close();

  }

  selectFile(e: any) {
    console.log(e);
    this.file = e.target.files[0];
  }

}

// ส่วน Pop Up แสดงรูป
@Component({
  moduleId: module.id,
  selector: 'product.popup',
  templateUrl: 'product.popup.html',
  styleUrls: ['product.popup.css']
})
export class PopupImage {
  devicelist: Observable<any[]>;
  editedProduct: any = {};

  constructor(
    public dialogRef: MatDialogRef<PopupImage>, private angFire: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.devicelist = angFire.list('/devices').valueChanges();

    console.log('key', data);
    this.devicelist.subscribe((items) => this.editedProduct = items.find(item => item.key === data));
    console.log('editproduct', this.editedProduct);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
