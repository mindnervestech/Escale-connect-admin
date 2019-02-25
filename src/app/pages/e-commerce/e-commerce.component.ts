import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls:  ['./e-commerce.component.css'],
})
export class ECommerceComponent {
	private value1 = false;
	private value2 = false;
	private roomName = "";
	private tripeNumber = "";
	private year = "";
	private month = "";
	private day = "";
	private startTimehr = "";
	private startTimemin = "";
	private endTimehr = "";
	private endTimemin = "";
	private allField = false;
	private value = "";
	private optionSelect = false;
	constructor(private db: AngularFireDatabase,private router: Router){
		/*var user = JSON.parse(localStorage.getItem("user"));
		console.log("user",user);
        if (user == null) {
        	console.log("in");
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
	}

	ngOnInit(){
		this.db.list('users').valueChanges().subscribe(user=>{
			console.log(user);
		});
	}

	option(text){
		if(text == "Train"){
			this.value1 = true
			this.value2 = false;
			this.value = text;
		}else{
			this.value2 = true;
			this.value1 = false;
			this.value = text;
		}
	}
	createRoom(){
		var me = this;
		var date = new Date();
        var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var group_id = me.createGroupId();
		if(me.roomName != "" && me.tripeNumber != "" && me.year != "" && me.month != "" && me.day != "" && me.startTimehr != "" && me.startTimemin != "" && me.endTimehr != "" && me.endTimemin != ""){
			me.allField = false;
		}else{
			me.allField = true;
		}
		if(me.value == ""){
			me.optionSelect = true;
		}else{
			me.optionSelect = false;
		}
		if(me.allField == false && me.optionSelect == false){
			this.db.list('/Group').push({
            DateCreated :dateCreated,
			endTime : me.endTimehr +":"+me.endTimemin,
			groupId: group_id,
			groupName : me.roomName,
			lastMessage : "",
			startTime : me.startTimehr +":"+me.startTimemin,
			trainNumber : me.tripeNumber,
			tripeDate : me.year+"-"+me.month+"-"+me.day,
			unreadCount: 0,
			type : me.value,
          });

			me.roomName = "";
			me.tripeNumber = "";
			me.year = "";
			me.month = "";
			me.day = "";
			me.startTimehr = "";
			me.startTimemin = "";
			me.endTimehr = "";
			me.endTimemin = "";
			me.value = "";
		}
	}

	createGroupId(){
	    var stringLength = 12;
	    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var randomString = '';
	    for (var i = 0; i < stringLength; i += 1) {
	      var rnum = Math.floor(Math.random() * chars.length);
	      randomString += chars.substring(rnum, rnum + 1);
	    }
	    return randomString;
  	}
}
