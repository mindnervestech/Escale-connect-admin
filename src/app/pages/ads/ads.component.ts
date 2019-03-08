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
	private description ="";
	private adslink = "";
	categoryTypeData = ['business','homework','tourism','visit'];
	categoryType: string = "";
	showError: boolean = false;
	file: any;
	base64: string = '';
	showSuccess: boolean = false;
	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		
	}
	checkImage(enent){
		console.log(event);
		console.log(this.imageName);
	}
	getBase64(file) {
		return new Promise((resolve, reject) => {
		  const reader = new FileReader();
		  reader.readAsDataURL(file);
		  reader.onload = () => resolve(reader.result);
		  reader.onerror = error => reject(error);
		});
	}

	 upload(event) {
		 console.log(event.target.files[0]);
		 this.file = event.target.files[0];
		 this.getBase64(this.file).then(
			data =>{
				this.base64 = data.toString();
			} 
		 );
	}
	createAds(link){
		if(this.adsName == '' && this.imageName == '' && this.adslink == '' && this.description == ''){
			this.showError = true;
		}else{
			this.db.list('/Ads/' + link).push({
				date: new Date(),
				title: this.adsName,
				image: this.base64,
				link: this.adslink,
				description: this.description
			});	
			this.adsName = "",
			this.imageName = "",
			this.adslink = "",
			this.description = "",
			this.categoryType = ""
			//console.log("data",data);
			this.showSuccess = true;
		}	
	}
}
