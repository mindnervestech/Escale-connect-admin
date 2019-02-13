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
	private basePath = '/upload';
	progress: {percentage: number} = {percentage: 0};

	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		
	}
	checkImage(enent){
		console.log(event);
		console.log(this.imageName);
	}
	 upload(event) {
	 	var dataObject = [];
	 	console.log(event.target.files[0]);
	 	var fileUpload = event.target.files[0];
	 	const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`)
      .put(fileUpload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot
          this.progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        },
        (error) => {
          // fail
          console.log("Error in pushFileToStorage function",error);
        },
        () => {
          // success
          var me = this;
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
             var data = {
              imageUrl : downloadURL,
              imageName : fileUpload.file.name   
            }
            dataObject.push(data);
          });
        }
      );
      console.log(dataObject);
	 
  	}
}
