import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  //styles: ['./smart-table.component.css'],
  styleUrls:  ['./logout.component.css'],
})
export class LogoutComponent {
	
  constructor(private router: Router) {
  	localStorage.clear();
  	this.router.navigate(["pages/tables/smart-table"]);
  }
  
}
