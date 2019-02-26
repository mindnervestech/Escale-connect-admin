import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import * as XLSX from 'ts-xlsx';
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
	private journeyTypeData = [{id: 1, name: 'Train'},{id: 2, name:'Flight'}]
	arrayBuffer:any;
	file:File;
	constructor(private db: AngularFireDatabase,private router: Router){
		/*var user = JSON.parse(localStorage.getItem("user"));
		console.log("user",user);
        if (user == null) {
        	console.log("in");
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
	}

	//reading file form local path
	incomingfile(event) {
	  this.file= event.target.files[0]; 
	}

	// reading  data from excel and uploading data in firebase
	Upload() {
		var me = this;
		var group_id = me.createGroupId();
		var date = new Date();
        var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	    let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary", cellDates: true});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        	var groupChatData = XLSX.utils.sheet_to_json(worksheet)
        	
        	//looping for save data in firebase in group table
        	for (var i = 0; i < groupChatData.length; i++) {
		     	console.log("groupchat data", groupChatData[i]);
		     	console.log('plus time',groupChatData[i]['Chat room duration']);
		     	console.log('journyType', me.journyType);
		     	if (me.journyType== 'Train') {
		     		console.log('if journyType', me.journyType, 'start time', startTime)
		     		var startTime = me.getStartTime('3:00', groupChatData[i]['Train departure time'] );
		     		var endTime = me.getEndTime(groupChatData[i]['Train departure time'], groupChatData[i]['Chat room duration']);
		     		var number = groupChatData[i]['Train number']
		     	} else if (me.journyType== 'Flight') {
		     		var startTime = me.getStartTime('4:00', groupChatData[i]['Departure time'] );
		     		var endTime = me.getEndTime(groupChatData[i]['Departure time'], groupChatData[i]['Chat room duration']);
		     		var number = groupChatData[i]['Flight number']
		     		console.log(' else journyType', me.journyType,'start time', startTime)
		     	}
		     	
		     	console.log('endTime...', endTime)
		     	this.db.list('/Group').push({
		            DateCreated :dateCreated,
					endTime : endTime,
					groupId: group_id,
					groupName : me.roomName,
					lastMessage : "",
					startTime : startTime
					trainNumber : number,
					tripeDate : "",
					unreadCount: 0,
					type : me.journyType,
		        });
		    }
        }
        fileReader.readAsArrayBuffer(this.file);
	}

	ngOnInit(){
		this.db.list('users').valueChanges().subscribe(user=>{
			console.log(user);
		});
	}

	//calculating chat room start time
	getStartTime(chatRoomStartTime, DepatureTime) {
		var start = "25:11";
		var end = "15:11";
		var a = chatRoomStartTime.split(":");
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ; 
		var b = DepatureTime.split(":");
		var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60; 

		var date = new Date(1970,0,1);
		    date.setSeconds(seconds - seconds2);

		var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		return c;
		console.log(c);
	}

	//calculating chat room end time
	getEndTime(DepatureTime, chatRoomDuration) {
		var start = "25:11";
		var end = "15:11";
		var a = DepatureTime.split(":");
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ; 
		var b = chatRoomDuration.split(":");
		var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60; 

		var date = new Date(1970,0,1);
		    date.setSeconds(seconds + seconds2);

		var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		return c;
		console.log(c);
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
