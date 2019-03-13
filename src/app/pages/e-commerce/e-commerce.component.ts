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
	private journyType: any;
	upload: boolean = true;
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
	uploadBtn(){
		this.upload = !this.upload;
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
		     	var startTime = "";
		     	var endTime = "";
		     	var startDateAndTime = "";
		     	var endDateAndTime = "";
		     	var calculateActivateStatus;
		     	var number = "";
		     	if (me.journyType== 'Train') {
		     		startTime = me.getStartTime('3:00', groupChatData[i]['Train departure time'] );
		     		startDateAndTime = me.getStartDateAndTime('3:00', groupChatData[i]['Train departure time']);
					endDateAndTime = me.getEndDateAndTime(groupChatData[i]['Train departure time'], groupChatData[i]['Chat room duration']);
		     		endTime = me.getEndTime(groupChatData[i]['Train departure time'], groupChatData[i]['Chat room duration']);
		     		calculateActivateStatus = me.calculateActivateStatus(startDateAndTime, endDateAndTime);
		     		number = groupChatData[i]['Train number'];
		     	} else if (me.journyType== 'Flight') {
		     		startTime = me.getStartTime('4:00', groupChatData[i]['Departure time'] );
		     		endTime = me.getEndTime(groupChatData[i]['Departure time'], groupChatData[i]['Chat room duration']);
					startDateAndTime = me.getStartDateAndTime('4:00', groupChatData[i]['Train departure time']);
					endDateAndTime = me.getEndDateAndTime(groupChatData[i]['Departure time'], groupChatData[i]['Chat room duration']);
		     		calculateActivateStatus = me.calculateActivateStatus(startDateAndTime,endDateAndTime);
		     		number = groupChatData[i]['Flight number'];
		     	}
		     	
		     	this.db.list('/Group').push({
		            DateCreated :dateCreated,
					endTime : endTime,
					groupId: group_id,
					groupName : me.roomName,
					lastMessage : "",
					startTime : startTime, 
					trainNumber : number,
					tripeDate : "",
					unreadCount: 0,
					type : me.journyType,
					startDateTime: startDateAndTime, 
					endDateTIme: endDateAndTime, 
					groupActivated: calculateActivateStatus
		        });
		    }
        }
        fileReader.readAsArrayBuffer(this.file);
	}

	ngOnInit(){
		this.db.list('users').valueChanges().subscribe(user=>{
			console.log(user);
		});
		setInterval(()=> {
       		this.checkAndResetGroupDetails();
       	}, 10 * 60 * 1000); //10 minutes 
	}

	//calculating chat room start time
	getStartTime(chatRoomStartTime, DepatureTime) {
		var a = DepatureTime.split(":");
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ; 
		var b = chatRoomStartTime.split(":");
		var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60; 

		var date = new Date(1970,0,1);
		    date.setSeconds(seconds - seconds2);

		var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		return c;
	}

	//calculating chat room end time
	getEndTime(DepatureTime, chatRoomDuration) {
		var a = DepatureTime.split(":");
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ; 
		var b = chatRoomDuration.split(":");
		var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60; 

		var date = new Date(1970,0,1);
		    date.setSeconds(seconds + seconds2);

		var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		return c;
	}

	getStartDateAndTime(chatRoomStartTime, DepatureTime) {
		var departureDateAndTIme = new Date(new Date().toDateString() +' '+ DepatureTime);
		var hoursAndMinutes = chatRoomStartTime.split(":");
		var _journeyStartDateAndTime = departureDateAndTIme.setTime(departureDateAndTIme.getTime() - hoursAndMinutes[0]*3600000 - hoursAndMinutes[1]*60000);
		var convertedJourneyStartDateAndTime = new Date(_journeyStartDateAndTime);
		return convertedJourneyStartDateAndTime + "";
	}
	//calculating chat room end time and date
	getEndDateAndTime(DepatureTime, chatRoomDuration) {
		var departureDateAndTIme = new Date(new Date().toDateString() +' '+ DepatureTime);
		var hoursAndMinutes = chatRoomDuration.split(":");
		var _journeyEndDateAndTime = departureDateAndTIme.setTime(departureDateAndTIme.getTime() + hoursAndMinutes[0]*3600000+ hoursAndMinutes[1]*60000);
		var convertedJourneyEndDateAndTime = new Date(_journeyEndDateAndTime);
		return convertedJourneyEndDateAndTime + "";
	}

	//calculating group chat active status
	calculateActivateStatus(startTime, endTime) {
		var currentTime = new Date();
		if(Date.parse(startTime) <= currentTime.getTime() && Date.parse(endTime) >= currentTime.getTime()) {
			return true;
		} else {
			return false;
		}
	}
	option(text){
		if(text == "Train"){
			this.value1 = true
			this.value2 = false;
			this.value = text;
			var addClass = document.getElementById("b1");
			var removClass = document.getElementById("b2");
			addClass.classList.add("act");
			removClass.classList.remove("act");
		}else{
			this.value2 = true;
			this.value1 = false;
			this.value = text;
			var addClass = document.getElementById("b2");
			var removClass = document.getElementById("b1");
			addClass.classList.add("act");
			removClass.classList.remove("act");
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

  	checkAndResetGroupDetails() {
  		console.log('checkAndResetGroupDetails is calling in every 10 minitus')
	  	var me = this;
	  	var currentTimeAndDate = new Date();
	  	console.log('currentTimeAndDate', currentTimeAndDate);
	    firebase.database().ref('/Group').on('value',function(group){
		    for(var data in group.val()) {
		    	if (Date.parse(group.val()[data].endDateTIme) <= currentTimeAndDate.getTime()) {
		    		var startDateAndTime = me.updateStartDate(group.val()[data].startDateTime);
		    		var endDateAndTime = me.updateEndDate(group.val()[data].endDateTIme);
		    		firebase.database().ref('Group/'+ data).update({
		    			"startDateTime": startDateAndTime, 
						"endDateTIme": endDateAndTime, 
						"groupActivated": me.calculateActivateStatus(startDateAndTime,endDateAndTime)
		    		});
				    firebase.database().ref('GroupMember/'+ group.val()[data].groupId).remove();
				    firebase.database().ref('GroupChats/'+ group.val()[data].groupId).remove();
		    	}
		    	else if(Date.parse(group.val()[data].startDateTime) <= currentTimeAndDate.getTime() && Date.parse(group.val()[data].endDateTIme) >= currentTimeAndDate.getTime()) {
		    		firebase.database().ref('Group/' + data).update({
						"groupActivated": true
		    		});
		    	}
		    }
	    });
  	}

  	//update start date with 1 day (24 hours)
  	updateStartDate(_startDate) {
  		var startDate = new Date(_startDate);
  		console.log('startDate' ,startDate);

  		var udatedStartDateAndTime = startDate.setTime(startDate.getTime() + 24*3600000);
		console.log(udatedStartDateAndTime)
		var convertedUpdatedStartDateAndTime = new Date(udatedStartDateAndTime);
		console.log('convertedUpdatedEndDateAndTime', convertedUpdatedStartDateAndTime)
		return convertedUpdatedStartDateAndTime + "";
  	}

  	//update start date with 1 day (24 hours)
  	updateEndDate(_endDate) {
  		var endDate = new Date(_endDate);
  		console.log('EndDate' ,endDate);
  		var udatedEndDateAndTime = endDate.setTime(endDate.getTime() + 24*3600000);
		console.log(udatedEndDateAndTime)
		var convertedUpdatedEndDateAndTime = new Date(udatedEndDateAndTime);
		console.log('convertedUpdatedEndDateAndTime', convertedUpdatedEndDateAndTime)
		return convertedUpdatedEndDateAndTime + "";
  	}
}
