import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { NavbarService } from '../nav/nav.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.template.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {

    email: string;
    password: string;
    name: string;
    file: any;
    storageRef = firebase.storage().ref();

    constructor(
        private afAuth: AngularFireAuth,
        private angFire: AngularFireDatabase,
        private router: Router,
        public nav: NavbarService
    ) {

    }
    register() {
        try {
            const result = this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
                this.uploadPhoto().then((url) => {
                    user.user.updateProfile({
                        photoURL: url,
                        displayName: this.name
                    });
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
    selectFile(e) { // เลือกไฟล์
        console.log(e);
        this.file = e.target.files[0];
    }

    uploadPhoto(): Promise<any> { // Upload รูปโปรไฟล์
        console.log(this.file);
        return this.storageRef.child('Profile/' + this.file.name).put(this.file).then((snapshot) => {
            console.log(snapshot);
            return this.storageRef.child('Profile/' + this.file.name).getDownloadURL();
        });
    }


    ngOnInit() {
        this.nav.hide();
    }

    backToLogin() {
        this.router.navigateByUrl('/');
    }
}
