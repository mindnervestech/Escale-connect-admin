import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls:  ['./user-chat.component.css'],
})
export class UserChatComponent {
	public userChatList = [];
	public userAllChatList = [];
	public userLatestChatList = [];
	public emptyTable = false;
	public id: string = '';
	public userId: string = '';	
	public allMessage = [];
	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		var url = window.location.href;
		//console.log(url);
		var data = url.replace("https://louchat-583ca.firebaseapp.com/index.html#/pages/userChat?groupId=","");
		this.id = data.split('&userId=')[0];
		this.userId = data.split('&userId=')[1];
		
		console.log("this.id",this.id,this.userId);
		/*var param = this.route.snapshot.paramMap.get("groupId")
		console.log(param);*/

		// this.db.list('Chats/'+ data).valueChanges().subscribe(user=>{
		// 	this.userChatList = [];
		// 	for(var i=0; i<user.length;i++){
		// 		//var mylastDate = this.getLastDate(user[i]["DateCreated"]);
  //               let time = new Date(user[i]["DateCreated"]);
  //               var timestamp = time.getTime();
		// 		var data = {
		// 			name : user[i]['name'],
		// 			DateCreated : user[i]['DateCreated'],
		// 			message : user[i]['message'],
		// 			profilePic : user[i]['profilePic'] == "" ? "./assets/images/profile.png" : user[0]['profilePic'],
		// 			checkDate : timestamp,
		// 		};
		// 		this.userChatList.push(data);
		// 	}
		// 	if(this.userChatList.length == 0){
		//         this.emptyTable = true;
		//       }else{
		//         this.emptyTable = false;
		//       }
		//       this.userChatList.sort(function(a,b){return b.checkDate - a.checkDate});
		//       this.userAllChatList = this.userChatList;
		// });
		this.getUserDataGroupChat();
	}
	goToBack(){
		this.router.navigate(["pages/groupChat"],{queryParams:{groupId : this.id}});
	}
	getUserDataGroupChat(){
		let me = this;
		firebase.database().ref().child('GroupChats/'+ this.id).orderByChild("sender_id").equalTo(this.userId).on('value',function(optionData){
			console.log("optionData",optionData.val());
			for(var value in optionData.val()){
				var data = {
					date: optionData.val()[value].DateCreated,
					name: optionData.val()[value].name,
					profilePic: optionData.val()[value].profilePic == '' ? 'assets/images/profile.png' : optionData.val()[value].profilePic,
					message: optionData.val()[value].message				
				}
				me.allMessage.push(data);	
			}
			console.log("me.allMessage",me.allMessage);
			if(me.allMessage.length == 0){
		        me.emptyTable = true;
		    }else{
		        me.emptyTable = false;
		     }
		});
	}
	// getGroupChat(){
	// 	this.userChatList = this.userAllChatList;
	// 	if(this.userChatList.length == 0){
	// 	    this.emptyTable = true;
	// 	}else{
	// 	    this.emptyTable = false;
	// 	}
	// }
	// getLatestChat(){
	// 	var date = new Date();
	// 	var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	// 	var todayDate = dateCreated.split(" ");
 //        var todayConvertDate = todayDate[0].split("-");
 //        this.userLatestChatList = [];
 //        for(var i = 0; i < this.userAllChatList.length; i++){
 //        	var chatDate = this.userAllChatList[i]["DateCreated"];
 //        	var chatDateSplit = this.userAllChatList[i]["DateCreated"].split(" ");
 //        	if(todayDate[0] == chatDateSplit[0]){
 //        		this.userLatestChatList.push(this.userAllChatList[i]);
 //        	}
 //        }
 //        this.userChatList = this.userLatestChatList;
 //        if(this.userChatList.length == 0){
	// 	    this.emptyTable = true;
	// 	}else{
	// 	    this.emptyTable = false;
	// 	}
	// }

}
