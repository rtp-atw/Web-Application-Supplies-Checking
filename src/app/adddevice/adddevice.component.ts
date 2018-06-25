import { Component, OnInit } from '@angular/core';
import { deviceDetail } from "../products/product";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NavbarService } from '../nav/nav.service';
@Component({
    moduleId: module.id,
    templateUrl: 'adddevice.template.html',
    styleUrls: ['adddevice.component.css']
})

export class AddDevice implements OnInit {
    deviceDetails: deviceDetail[] = [];
    devicelist: AngularFireList<any>;
    storageRef = firebase.storage().ref();
    picUrl: any; data :Array<Array<any>>;
    counter = 1; limit = 3;
    myDate: String;

    constructor(public angFire: AngularFireDatabase,
        private router: Router,
        public nav: NavbarService) {

        this.devicelist = angFire.list('/devices');
        this.deviceDetails = [{}];
        this.myDate = moment().format('LLLL');
    }
    // ตั้งค่าให้แสดง Nav-Bar 
    ngOnInit() {
        this.nav.show();
    }
    
    toMain() {
        this.router.navigateByUrl('/main');
    }
    selectFile(e:any, index: number) {
        console.log(index);
        this.deviceDetails[index].file = e.target.files[0];
    }
    uploadPhoto(deviceKey:any, file:any) {
        if(file) {
            this.storageRef.child("Device/" + file.name).put(file).then((snapshot) => {
                console.log(snapshot);
                this.storageRef.child("Device/" + file.name).getDownloadURL().then((url) => {
                  const picUrl = url;      
                  console.log('url', picUrl);
                  this.devicelist.update(deviceKey,{
                    imgurl: picUrl,
                    key: deviceKey
                  });
                  this.router.navigateByUrl('/');
                });
              });
        }
        else {
            this.devicelist.update(deviceKey,{
              imgurl: '',
              key: deviceKey
            });
            this.router.navigateByUrl('/');
        }
  
    }  
    // Function บันทึกการเพิ่มข้อมูล
    saveProduct() {
            console.log('save',this.deviceDetails[0]);      
            this.deviceDetails.forEach(device=>{
                if(device || device.number){
                    var data = this.devicelist.push(Object.assign(
                        { //ค่าเริ่มต้นเมื่อไม่มีการใส่ข้อมูล (ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
                          number: 0,
                          serialNumber: 0,
                          date: "",
                          name: "",
                          detail: "",
                          location: 0,
                          pricePerUnit: "",
                          transferStatus: "",
                          oldSerialNumber : 0,
                          remark:"",
                          imgurl : "",
                          file: "",
                          tagUID:"",
                          status:""
                        },device
                    ));
                    console.log(data.ref.key);
                    this.uploadPhoto(data.ref.key, device.file);
                }
            });  
        
    }
    // Function บันทึกการแก้ข้อมูล
    saveEditProduct(deviceKey:any,editedProduct:deviceDetail,newfile:any) {
        if(deviceKey) { // (ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
            if(editedProduct.imgurl) {
                this.devicelist.update(deviceKey,{
                    number: editedProduct.number,
                    serialnumber: editedProduct.serialNumber,
                    date: editedProduct.date,
                    name: editedProduct.name,
                    detail: editedProduct.detail,
                    location: editedProduct.location,
                    pricePerUnit: editedProduct.pricePerUnit,
                    transferStatus: editedProduct.transferStatus,
                    oldSerialNumber : editedProduct.oldSerialNumber,
                    remark:editedProduct.remark,
                    status: editedProduct.status,
                    key:editedProduct.key,
                    tagUID: editedProduct.tagUID,
                    lastUpdate: this.myDate ,
                });
            }
            else {
                this.devicelist.update(deviceKey,{
                    number: editedProduct.number,
                    serialNumber: editedProduct.serialNumber,
                    date: editedProduct.date,
                    name: editedProduct.name,
                    detail: editedProduct.detail,
                    location: editedProduct.location,
                    pricePerUnit: editedProduct.pricePerUnit,
                    transferStatus: editedProduct.transferStatus,
                    oldSerialNumber : editedProduct.oldSerialNumber,
                    remark:editedProduct.remark,
                    status: editedProduct.status,
                    imgurl : editedProduct.imgurl,
                    key:editedProduct.key,
                    tagUID: editedProduct.tagUID,
                    lastUpdate: this.myDate  
                });
                this.uploadPhoto(deviceKey, newfile);
            }
            
            if(newfile){
                this.uploadPhoto(deviceKey, newfile);
            }
    
        }
    }
    // Function เพิ่ม Input การเพิ่มข้อมูล
    addInput(){
        if(this.deviceDetails.length <3){ // ***จำกัดไว้ที่ 3 Input 
            this.deviceDetails.push({});
        }
        else{
            alert("Limite");
        }
        
    }   
    // ไปยังหน้าเพิ่มข้อมูลด้วย Excel
    toExcelImport(){
        this.router.navigateByUrl('/import');
    }
}  