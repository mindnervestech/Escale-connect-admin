import { Component,ViewChild } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import { AngularFireStorage } from 'angularfire2/storage';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutoCompleteComponent} from "ng-auto-complete";

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
	private status = "";
	categoryTypeData = ['business','homework','tourism','visit'];
	statusType = ['Active','Inactive'];
	categoryType: any = [];
	showError: boolean = false;
	file: any;
	base64: string = '';
	allgroup: any =[];
	showSuccess: boolean = false;
	autoComp: boolean = false;
	downloadURL: any;
	selectedItem: any = '';
	groupId: any = '';
	inputChanged: any = '';
	items2: any[] = [];
	key: string = '';
	config2: any = {'class': 'test', 'max': 2, 'placeholder': 'test', 'sourceField': ['payload','label']};
	showEditBtn: boolean = false;
	dropdownList = [];
  	selectedItems = [];
  	dropdownSettings = {};
  	dropdownGroupSettings = {};
  	dropdownListGroup = [];
  	currentDate: any = Date.now();
  	loader: boolean = false;
	constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase, private router: Router,private route: ActivatedRoute){

	}

	ngOnInit(){
		//this.loadAllGroup();
		var getLocal = JSON.parse(localStorage.getItem("editad"));
		if(getLocal){
			console.log("getLocal",getLocal);
			this.adsName = getLocal.title;
			this.categoryType = getLocal.category;
			this.status = getLocal.status;
			this.adslink = getLocal.link;
			this.selectedItem = getLocal.number;
			this.description = getLocal.description;
			this.showEditBtn = true;
			this.key = getLocal.adkey;
			this.groupId = getLocal.groupId; 
			localStorage.removeItem("editad");
		}
		this.multiselectDropdown();
		this.multiselectDropdownRoom();
	}

	multiselectDropdown(){
		this.dropdownList = [
	      { category_id: 1, category_text: 'business' },
	      { category_id: 2, category_text: 'homework' },
	      { category_id: 3, category_text: 'tourism' },
	      { category_id: 4, category_text: 'visit' }
	    ];
	    this.dropdownSettings = {
	      singleSelection: false,
	      idField: 'category_id',
	      textField: 'category_text',
	      selectAllText: 'Select All',
	      unSelectAllText: 'UnSelect All',
	      itemsShowLimit: 3,
	      allowSearchFilter: true
	    };
	}
	onItemSelect(item: any) {
	    console.log(item);
	}
	onSelectAll(items: any) {
	    console.log(items);
	}

	multiselectDropdownRoom(){
		let self = this;
		self.loadAllGroup();
		self.dropdownListGroup = self.items2;
		self.dropdownGroupSettings = {
	      singleSelection: false,
	      idField: 'room_id',
	      textField: 'room_text',
	      selectAllText: 'Select All',
	      unSelectAllText: 'UnSelect All',
	      itemsShowLimit: 3,
	      allowSearchFilter: true
	    };
	}
	onItemSelectRoom(item: any) {
	    console.log(item);
	}
	onSelectAllRoom(items: any) {
	    console.log(items);
	}

	onSelect(item: any) {
	    this.selectedItem = item.payload.label;
	    this.groupId = item.payload.groupId;
	}

	onInputChangedEvent(val: string) {
	   	this.inputChanged = val;
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
		console.log("create");
		if(this.adsName == '' || this.categoryType == '' || this.status == '' || this.selectedItem == ''){
			this.showError = true;
			this.showSuccess = false;
		}else{
			for(var data of this.categoryType){
				for (var groupId of this.selectedItem) {
					var date = new Date();
					this.db.list('/Ads/'+ data.category_text + '/' + groupId.room_id).push({
						title: this.adsName,
						image: this.base64,
						category: data.category_text,
						number: groupId.room_text,
						link: this.adslink,
						status: this.status,
						description: this.description,
						groupId: this.groupId,
						date: this.currentDate,
					});
				}
			}	
			this.adsName = "",
			this.imageName = "",
			this.adslink = "",
			this.description = "",
			this.categoryType = "",
			this.status = "",
			this.selectedItem = "",
			//console.log("data",data);
			this.showSuccess = true;
			this.showError = false;
		}	
	}
	editAds(link){
		console.log("cupdated");
		if(this.adsName == '' || this.categoryType == '' || this.status == '' || this.selectedItem == ''){
			this.showError = true;
			this.showSuccess = false;
		}else{
			var mydate = new Date();
			firebase.database().ref('/Ads/'+ link + '/' + this.key + '/' + this.groupId).update({
				date: mydate,
				title: this.adsName,
				//image: this.task,
				category: this.categoryType,
				number: this.selectedItem,
				link: this.adslink,
				status: this.status,
				description: this.description,
				groupId: this.groupId
			});	
			this.adsName = "",
			this.imageName = "",
			this.adslink = "",
			this.description = "",
			this.categoryType = "",
			this.status = "",
			this.selectedItem = "",
			//console.log("data",data);
			this.showSuccess = true;
			this.showError = false;
			this.key = '',
			this.groupId = '',
			this.showEditBtn = false
		}	
	}
	 loadAllGroup(){
		let me = this;
		me.autoComp = false;
		firebase.database().ref('/Group').on('value',function(group){
			if(me.autoComp == false){
				// for(var data in group.val()){
				// 	var value = {
				// 		payload: {label: group.val()[data].trainNumber,type:group.val()[data].type,groupId: group.val()[data].groupId}
				// 	}
				// 	me.items2.push(value);
				// }
				for(var data in group.val()){
					var value = {
						room_id: group.val()[data].groupId,
						room_text: group.val()[data].trainNumber
						//type:group.val()[data].type,	
					}
					me.items2.push(value);
				}
				me.autoComp = true;
				if(me.items2.length > 0){
					me.loader = true;
				}
			}
		});
	}
}
