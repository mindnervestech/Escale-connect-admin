import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  //styles: ['./smart-table.component.css'],
  styleUrls:  ['./smart-table.component.css'],
})
export class SmartTableComponent {
	private password = "";
	private email = "";
	private validData = false;
	private emptyEmail = false;
	private emptyPassword = false;
  constructor(private db: AngularFireDatabase,private router: Router) {
  }

  login(){
  	var me = this;
  	if(me.email == ""){
  		me.emptyEmail = true;
  	}
  	if(me.password == ""){
  		me.emptyPassword = true;
  	}
  	if(me.validData == false && me.emptyPassword == false && me.emptyEmail == false){
  		firebase.auth().signInWithEmailAndPassword(me.email, me.password).then(function (user) {
        var email = user.user.email;
        firebase.database().ref().child('adminUser/').orderByChild("email").equalTo(email).on('value',function(optionData){
          var value = optionData.val();
          for(var data in value){
            var myDetail = {
              name : value[data].name,
              email : value[data].email,
            };
            localStorage.setItem("user", JSON.stringify(myDetail));
          }
          console.log("login");
          me.router.navigate(["dashboard"]);
        });
  		
	  	}).catch(function(error) {
		  console.log(error);
		  me.validData = true;
		});
  	}
  	
  	/*firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorCode);
	  console.log(errorMessage);
	  // ...
	});*/
	
  }
  checkPassword(event){
  	this.emptyPassword = false;
  	this.validData = false;
  }
  checkEmail(event){
  	this.emptyEmail = false;
  	this.validData = false;
  }

}
