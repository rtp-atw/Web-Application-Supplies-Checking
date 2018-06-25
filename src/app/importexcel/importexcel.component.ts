import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { deviceDetail } from "../products/product";

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
	const buf: ArrayBuffer = new ArrayBuffer(s.length);
	const view: Uint8Array = new Uint8Array(buf);
	for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

@Component({
	selector: 'sheetjs',//sjs-table
	templateUrl: `importexcel.template.html`
})

export class ImportExcel {
	data: AOA = [ [] ];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
	fileName: string = 'SheetJS.xlsx';
    devicelist: AngularFireList<any>;

    constructor(public angFire: AngularFireDatabase,
        private router: Router) {
        this.devicelist = angFire.list('/devices');     
    }

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data  (ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย) */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, defval:''})).slice(5).map((row:any[]) =>{ // slice(5) ==> ตัดหัวแถว 5 แถว (ใช้ตัดแถวที่ไม่ใช่ช่วงของข้อมูล ร่วมถึงหัวตาราง)		
				return row.filter((col,index)=>[4,5,7,8,9].indexOf(index)===-1); // เลือกคอลั่มที่ตัดทิ้ง โดยเริ่มจาก 0 ถึง n
					
			});		
		};
		reader.readAsBinaryString(target.files[0]);
	}

	/* Function อัพโหลดข้อมูลไปยัง firebase  */
	uploadToFirebase(data:any[][]){
		for(let i = 0;i !== data.length ;++i){
			console.log('index',i);
			console.log(data[i]);
			const deviceDetail: deviceDetail = { // เลือกตำแหน่งของข้อมูลแต่ละตัวว่าตรงกับตำแหน่งคอลั่มได้ โดยเริ่มจาก 0 ถึง n (ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
				number: data[i][0],				 // console.log('dataex',this.data[1]); ใช้ดูข้อมูลเพื่อเลือกตำแหน่ง
				serialNumber: data[i][1],
				date: data[i][2],
				name: data[i][3],
				detail: data[i][4],
				location: data[i][5],
				pricePerUnit: data[i][6],
				transferStatus: data[i][7],
				oldSerialNumber : data[i][8],
				remark:'',
				imgurl : '',
				key:'',
				file: '',
				tagUID:'',
				status:'',
				lastUpdate:''
			};		
			var excelData = this.devicelist.push(deviceDetail);
			this.devicelist.update(excelData.ref.key,{
				key:excelData.ref.key
			});
		}
		this.router.navigateByUrl('/');
	}
	
    backToMain(){
        this.router.navigateByUrl('/');
    }

}