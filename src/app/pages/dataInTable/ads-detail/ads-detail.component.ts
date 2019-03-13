import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ngx-ads-detail',
  templateUrl: './ads-detail.component.html',
  styleUrls:  ['./ads-detail.component.css'],
})
export class AdsDetailComponent {
  public userList = [];
  public emptyTable = true;
  public adsList = [];
  public adsData = [];
  constructor(private db: AngularFireDatabase,private router: Router) {
    /*var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
  }

  ngOnInit(){
    var me = this;
    firebase.database().ref('Ads/business').on('value',function(group){
      var data = group.val();
      for(var value in group.val()){
        me.adsData.push(group.val()[value]);
      }
      console.log("value",me.adsData);
      if(me.adsData.length == 0){
        me.emptyTable = true;
      }else{
        me.emptyTable = false;
      }
    });
  }

  goToChatPage(data){
    var me = this;
    firebase.database().ref().child('users/').orderByChild("name").equalTo(data.name).on('value',function(optionData){
      var value = optionData.val();
      for(var data in value){
        me.router.navigate(["pages/userChat"],{queryParams:{userId:data}});
      }
    });
  }
}
