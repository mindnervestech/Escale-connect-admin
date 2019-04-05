import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public loader: boolean = false;
  active: string = '';
  public manageAds: any=[];
  public groupid: any = [];
  public groupkey: string = '';
  constructor(private ngxService: NgxUiLoaderService,private db: AngularFireDatabase,private router: Router,private _sanitizer: DomSanitizer) {
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
    me.loader = true;
    me.active = data;
    me.ads = false;
    me.adsData = [];
    firebase.database().ref('Ads/' + data).on('value',function(group){
      if(me.ads == false){  
        var data = group.val();
        for(var value in data){
          me.groupkey = value;
          console.log(data[value]);
          var val = Object.keys(data[value]).map(key => data[value][key]);
          me.groupid = Object.keys(data[value]);  
          for(var i=0;i<me.groupid.length;i++){
            for(var j=0;j<val.length;j++){
              if(i==j){
                val[j].groupid = me.groupid[i];
              }
            }
          }
          for(var d in val){
            var Ads = {
                //date: dateFormat,
                description: val[d].description,
                link: val[d].link,
                title: val[d].title,
                groupId: val[d].groupid,
                adkey: me.groupkey,
                status: val[d].status,
                category: val[d].category,
                number: val[d].number
                // image: me.base64Image,
              }
             //console.log("-------",val[d].title);
            me.adsData.push(Ads);
          }
        }
        if(me.adsData.length == 0){
          me.emptyTable = true;
        }else{
          me.emptyTable = false;
          me.loader = false;
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
  deleteEntity(data){
    return firebase.database().ref('Ads/'+ data.category + '/' + data.adkey + '/' + data.groupId).remove();
  }
  deleteGroup(data){
    this.deleteEntity(data);
    this.loadAds('business');
  }
  editAds(data){
    localStorage.setItem("editad", JSON.stringify(data));
    this.router.navigate(["pages/ads"]);
  }
}
