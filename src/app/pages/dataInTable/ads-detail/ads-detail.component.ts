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
  public emptyTable = false;
  public adsList = [];
  constructor(private db: AngularFireDatabase,private router: Router) {
    /*var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
  }

  ngOnInit(){
    var me = this;
    firebase.database().ref('/users').on('value',function(user){
      me.userList = [];
      console.log(user.val());
      for(var data in user.val()){
        var value = {
          name : user.val()[data].name,
          profilePic :  user.val()[data].profilePic != "" ? user.val()[data].profilePic :"./assets/images/profile.png",
          age: user.val()[data].age,
          gender : user.val()[data].gender,
          groupName : user.val()[data].groupName,
        };
        me.userList.push(value);
      }
      if(me.userList.length == 0){
        me.emptyTable = true;
      }else{
        me.emptyTable = false;
      }
    });
    me.getAllAds();
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
  getAllAds(){
    var me = this;
    firebase.database().ref('/Ads').on('value',function(group){
      console.log("group",group.val());
      // for(var data in group.val()){
      //    var value = {
      //       endTime : group.val()[data].endTime,
      //       groupId:  group.val()[data].groupId,
      //       groupName :  group.val()[data].groupName,
      //       startTime :  group.val()[data].startTime,
      //       trainNumber :  group.val()[data].trainNumber,
      //       tripeDate :  group.val()[data].tripeDate,
      //       type :  group.val()[data].type,
      //       activeStatus : status,
      //       key : data,
      //    };
      //    me.adsList.push(value);
      // }
      // var grp = group.val();
      // console.log("grp",grp,grp.length);
      // for(var i= 0;i < grp.length;i++){
      //   for(var j= 0;j < grp[i].length;j++){
      //     console.log("push",grp[i][j]);
      //   }
      // }
      for(var data in group.val().business){
        // const values = Object.keys(data).map(key => data[key]);
        // const commaJoinedValues = values.join(",");
        // console.log("commaJoinedValues",commaJoinedValues);
        let fieldValues = JSON.parse(data);
        let keys = Object.keys(fieldValues);
        let values = keys.map(keys => fieldValues[keys])
        console.log("values",values);
      }
    });
  }
  tripeDateValidation(ripeDate,startDate,endDate){
        var msg = "";
        var convertDate = ripeDate.split("-");
        var end = endDate.split(":");
        var date = new Date();
        var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var todayDate = dateCreated.split(" ");
        var todayConvertDate = todayDate[0].split("-");
        var todayConvertTime = todayDate[1].split(":");
      
        if(parseInt(convertDate[0]) >= parseInt(todayConvertDate[0])){
          if(parseInt(convertDate[0]) == parseInt(todayConvertDate[0])){
            if(parseInt(convertDate[1]) >= parseInt(todayConvertDate[1])){
              if(parseInt(convertDate[1]) == parseInt(todayConvertDate[1])){
                if(parseInt(convertDate[2]) >= parseInt(todayConvertDate[2])){
                  if(parseInt(convertDate[2]) == parseInt(todayConvertDate[2])){
                    if(parseInt(end[0]) >= parseInt(todayConvertTime[0])){
                      if(parseInt(end[0]) == parseInt(todayConvertTime[0])){
                        if(parseInt(end[1]) > parseInt(todayConvertTime[1])){
                          msg = "";
                          return msg;
                        }else{
                          msg = "This group chat is end at " + ripeDate + " " + endDate;
                          return msg;
                        }
                      }else{
                        msg = "";
                        return msg;
                      }
                    }else{
                      msg = "This group chat is end at " + ripeDate + " " + endDate;
                      return msg;
                    }
                  }else{
                    msg = "";
                    return msg;
                  }
                }else{
                  msg = "This group chat is end at " + ripeDate;
                  return msg;
                }
              }else{
                msg = "";
                return msg;
              }
            }else{
              msg = "This group chat is end at " + ripeDate;
              return msg;
            }
          }else{
            msg = "";
            return msg;
          }
        }else{
          msg = "This group chat is end at " + ripeDate;
          return msg;
        }   
    }
    deleteGroup(data){
      console.log(data);
       firebase.database().ref('Group/'+ data.key).remove();
    }
}
