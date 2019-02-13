import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
//declare var firebase;
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  //styles: ['./smart-table.component.css'],
  styleUrls:  ['./register.component.css'],
})
export class RegisterComponent {
	private name = "";
	private email = "";
	private password = "";
	private confirmPassword = "";
	private emptyName = false;
	private emptyEmail = false;
	private emptyPassword = false;
	private emptyConfirmPassword = false;
	private validEmail = false;
	private passwordMatch = false;
	private emailUsed = false;

  constructor(private db: AngularFireDatabase,private router: Router) {
  	
  }
  Ragester(){
	var data = {
		name : this.name,
		email : this.email
	};
	var me = this;
	if(me.name == ""){
		me.emptyName = true;
	}
	if(me.email == ""){
		me.emptyEmail = true;
	}
	if(me.password == ""){
		me.emptyPassword = true;
	}
	if(me.confirmPassword == ""){
		me.emptyConfirmPassword = true;
	}
	if(me.password != "" && me.confirmPassword != ""){
		if(me.password != me.confirmPassword){
			me.passwordMatch = true;
		}	
	}else{
		me.passwordMatch = false;
	}
	
	 if(me.email != ''){
          var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(me.email) == false) 
          {
              me.validEmail = true;
          }else{
            me.validEmail = false;
          }
        }
    if(me.passwordMatch == false && me.emptyName == false && me.emptyEmail == false && me.validEmail == false && me.emptyPassword == false && me.emptyConfirmPassword == false){
    	firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(function (user) {
			console.log(user);
			me.db.list('/adminUser').push(data);
			this.router.navigate(["tables"]);
		}).catch(function(error) {
		  console.log(error);
		  me.emailUsed = true;
		});
    }
  }

  checkName(event){
  	this.emptyName = false;
  }
  checkEmail(event){
  	this.emptyEmail = false;
  	this.validEmail = false;
  	this.emailUsed = false;
  }
  checkPassword(event){
  	this.emptyPassword = false;
  	this.passwordMatch = false;
  }
  checkconfirmPassword(event){
  	this.emptyConfirmPassword = false;
  	this.passwordMatch = false;
  }
}
