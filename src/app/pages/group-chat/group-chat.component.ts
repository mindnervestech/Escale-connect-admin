import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls:  ['./group-chat.component.css'],
})
export class GroupChatComponent {
	public groupChatList = [];
	public groupAllChatList = [];
	public groupLatestChatList = [];
	public emptyTable = false;
	public list = [];
	objectKeys = Object.keys;

	constructor(private db: AngularFireDatabase,private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		var url = window.location.href;
		//console.log(url);
		var groupId = url.replace("https://louchat-583ca.firebaseapp.com/index.html#/pages/groupChat?groupId=","");
		/*var param = this.route.snapshot.paramMap.get("groupId")
		console.log(param);*/
		/*this.db.list('GroupChats/'+ data).valueChanges().subscribe(user=>{
			console.log("user",user);
			for(var i in user){
				console.log("user",i,user[i]);
			}
			this.groupChatList = [];
			this.groupAllChatList = [];
			for(var i=0; i<user.length;i++){
				let time = new Date(user[i]["DateCreated"]);
                var timestamp = time.getTime();
				var data = {
					name : user[i]['name'],
					DateCreated : user[i]['DateCreated'],
					message : user[i]['message'],
					profilePic : user[i]['profilePic'] == "" ? "./assets/images/profile.png" : user[0]['profilePic'],
					checkDate : timestamp,
				};
				this.groupChatList.push(data);
			}
			  if(this.groupChatList.length == 0){
		        this.emptyTable = true;
		      }else{
		        this.emptyTable = false;
		      }
		      this.groupChatList.sort(function(a,b){return b.checkDate - a.checkDate});
		      this.groupAllChatList = this.groupChatList;	
		});*/
		let me = this;
		 firebase.database().ref('GroupMember/'+ groupId).on('value',function(user){
			var data = user.val();
			console.log("list",data);
			for(var i in data){
				firebase.database().ref('users/'+ i).on('value',function(snapshot){
					if(snapshot.val() != null && snapshot.val() != ''){
						var value = snapshot.val();
						var date = new Date(value.created);
						var all = {
							key: i,
							groupId: groupId,
							date: date,
							name: value.name,
							age: value.age == '' ? '-' : value.age,
							gender: value.gender == '' ? '-' : value.gender,
							status: value.status == '' ? '-' : value.status,
							profilePic: value.profilePic == '' ? './assets/images/profile.png' : value.profilePic,
						}
						me.list.push(all);
						console.log("me.userList",me.list);		
					}
				});
			}
		});
	}
	userMessage(groupId,id){
		console.log("id",id);
		console.log("groupId",groupId);
		this.router.navigate(["pages/userChat"],{queryParams:{groupId : groupId, userId : id}});
	}
	getGroupChat(){
		this.groupChatList = this.groupAllChatList;
		if(this.groupChatList.length == 0){
		    this.emptyTable = true;
		}else{
		    this.emptyTable = false;
		}
	}
	goToBack(){
		this.router.navigate(["pages/dataInTable/group"]);
	}
	getLatestChat(){
		var date = new Date();
		var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var todayDate = dateCreated.split(" ");
        var todayConvertDate = todayDate[0].split("-");
        this.groupLatestChatList = [];
        for(var i = 0; i < this.groupAllChatList.length; i++){
        	var chatDate = this.groupAllChatList[i]["DateCreated"];
        	var chatDateSplit = this.groupAllChatList[i]["DateCreated"].split(" ");
        	if(todayDate[0] == chatDateSplit[0]){
        		this.groupLatestChatList.push(this.groupAllChatList[i]);
        	}
        }
        this.groupChatList = this.groupLatestChatList;
        if(this.groupChatList.length == 0){
		    this.emptyTable = true;
		}else{
		    this.emptyTable = false;
		}
	}
}
