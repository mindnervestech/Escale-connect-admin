import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

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
  public ads: boolean = false;
  public base64Image: any;
  constructor(private db: AngularFireDatabase,private router: Router,private _sanitizer: DomSanitizer) {
    /*var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
  }

  ngOnInit(){
      this.loadAds('business');
  }

  loadAds(data){
    var me = this;
    console.log("data---",data);
    me.ads = false;
    me.adsData = [];
    firebase.database().ref('Ads/' + data).on('value',function(group){
      if(me.ads == false){  
        var data = group.val();
        for(var value in data){
          var dateFormat = new Date(data[value].date);
          me.base64Image = me._sanitizer.bypassSecurityTrustUrl(data[value].image);
          var Ads = {
            date: dateFormat,
            description: data[value].description,
            link: data[value].link,
            title: data[value].title,
            image: me.base64Image,
          }
          me.adsData.push(Ads);
        }
        console.log("value",me.adsData);
        if(me.adsData.length == 0){
          me.emptyTable = true;
        }else{
          me.emptyTable = false;
        }
        me.ads = true;
      }  
    });
  }
  // goToChatPage(data){
  //   var me = this;
  //   firebase.database().ref().child('users/').orderByChild("name").equalTo(data.name).on('value',function(optionData){
  //     var value = optionData.val();
  //     for(var data in value){
  //       me.router.navigate(["pages/userChat"],{queryParams:{userId:data}});
  //     }
  //   });
  // }
}
