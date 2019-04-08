import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls:  ['./signin.component.css'],
})
export class SigninComponent {
	private password = "";
	private email = "";
	private validData = false;
	private emptyEmail = false;
	private emptyPassword = false;
  public loader: boolean = false;

	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){
   /* var user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      this.router.navigate(["pages/dashboard"]);
    }*/
	}

	ngOnInit(){

	}
	login(){
  	var me = this;
    me.loader = true;
  	if(me.email == ""){
  		me.emptyEmail = true;
      me.loader = false;
  	}
  	if(me.password == ""){
  		me.emptyPassword = true;
      me.loader = false;
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
          //console.log("login");
          //window.location.reload();
        });
  		 me.router.navigate(["pages/dashboard"]);
       me.loader = false;
	  	}).catch(function(error) {
		  console.log(error);
		  me.validData = true;
		});
  	}
  }
  checkPassword(event){
  	this.emptyPassword = false;
  	this.validData = false;
  }
  checkEmail(event){
  	this.emptyEmail = false;
  	this.validData = false;
  }
  goToRagestationPage(){
  	this.router.navigate(["login/register"]);
  }

}
