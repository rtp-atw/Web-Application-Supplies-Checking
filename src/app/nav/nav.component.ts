import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavbarService } from './nav.service';
@Component({
  moduleId: module.id,
  selector: 'ng-nav',
  templateUrl: 'nav.template.html',
  styleUrls: ['nav.component.css']
})

export class NavbarComponent {
  appName: string = "Supplies Checking By Google Firebase";
  account : string = "" ;
  events = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public nav: NavbarService
  ) {
    //ระบุบตัวผู้ใช้งาน
    this.afAuth.authState.subscribe(o=>{ 
      if(o) {
        this.account = o.email
      }
    });
    
  }  

  toAddDevice() {
    this.router.navigateByUrl('/add');
  }
  toMain() {
    this.router.navigateByUrl('/main');
  }
  
  logout() {
    this.afAuth.auth.signOut();
    console.log('logout');
    this.router.navigateByUrl('/');
  }

}
