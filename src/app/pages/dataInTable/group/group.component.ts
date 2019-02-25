import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ngx-group',
  templateUrl: './group.component.html',
  styleUrls:  ['./group.component.css'],
})
export class groupComponent {
  public groupList = [];
  public emptyTable = false;

  constructor(private db: AngularFireDatabase,private router: Router) {
   /* var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
  }

  ngOnInit(){
    //var group : any;
    var me = this;
    firebase.database().ref('/Group').on('value',function(group){
      me.groupList = [];
      var status = "";
      for(var data in group.val()){
         var msg = me.tripeDateValidation(group.val()[data].tripeDate,group.val()[data].startTime,group.val()[data].endTime);
          if(msg.length > 0){
           status = "Inactive";
          }else{
            status = "Active"
          }
         var value = {
            endTime : group.val()[data].endTime,
            groupId:  group.val()[data].groupId,
            groupName :  group.val()[data].groupName,
            startTime :  group.val()[data].startTime,
            trainNumber :  group.val()[data].trainNumber,
            tripeDate :  group.val()[data].tripeDate,
            type :  group.val()[data].type,
            activeStatus : status,
            key : data,
         };
         me.groupList.push(value);
      }
      if(me.groupList.length == 0){
        me.emptyTable = true;
      }else{
        me.emptyTable = false;
      }
    });
  }

  goToGroupChatShoePage(data){
    console.log(data.groupId);
    this.router.navigate(["pages/groupChat"],{queryParams:{groupId : data.groupId}});
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
       firebase.database().ref('GroupMember/'+ data.groupId).remove();
       firebase.database().ref('GroupChats/'+ data.groupId).remove();
    }
}
