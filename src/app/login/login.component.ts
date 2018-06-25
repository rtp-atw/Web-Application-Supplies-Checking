import { Component, OnInit } from '@angular/core';
import { User } from "./auth";
import { NavbarService } from '../nav/nav.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'login.template.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    appName: string = "Supplies Checking By Google Firebase";
    
    email : string = '';
    password: string = '';
    constructor(
        private afAuth: AngularFireAuth,
        private angFire: AngularFireDatabase,
        private router: Router,
        public nav: NavbarService
    ) { 
        
    }   
    async login() {
        const result = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(reason =>{
            alert(reason);
        });
    }
    ngOnInit() {
        this.nav.hide();  // ซ่อน nav-bar จากหน้านี้
        this.afAuth.authState.subscribe(auth => { 
            if (!auth)
              
                this.router.navigateByUrl('/');
            else
                this.router.navigateByUrl('/main');
        });
        
    }

    register(){
        this.router.navigateByUrl('/register');
    }
}

