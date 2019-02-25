import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-ads',
  templateUrl: './ads.component.html',
  styleUrls:  ['./ads.component.css'],
})
export class AdsComponent {
	private imageName = "";
	private adsName = "";

	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		
	}
	checkImage(enent){
		console.log(event);
		console.log(this.imageName);
	}
	 upload(event) {
	 	console.log(event.target.files[0]);
  	}
}
