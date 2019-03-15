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
  member = 0;
  chat = 0;
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
      var groupKey = [];
      var groupData = [];
      var count = -1;
      var count2 = 0;
      var count1 = 0;
      var status = "";
      for(var data in group.val()){
         //var msg = me.tripeDateValidation(group.val()[data].tripeDate,group.val()[data].startTime,group.val()[data].endTime);
        
          var currentDate = new Date();
          var startDate = new Date(group.val()[data].startDateTime);
          var endDate = new Date(group.val()[data].endDateTIme);
          //console.log("data",group.val());
          if(startDate.getTime() <= currentDate.getTime() && endDate.getTime() >= currentDate.getTime()){
           status = "Active";
          }else{
            status = "Inactive";
          }
          groupKey.push(group.val()[data].groupId);
          groupData.push(group.val()[data]);

          firebase.database().ref('GroupChats/' +  groupKey[count1]).on('value',function(groupChat){
            if(groupChat.val() != null && groupChat.val() != ''){
              var mem =  groupChat.val();
              const values = Object.keys(mem).map(key => mem[key]);
              me.chat = values.length;
              console.log("me.chat",me.chat);
            }else{
              me.chat = 0;
            }
            count++;
            firebase.database().ref('GroupMember/' + groupKey[count]).on('value',function(groupMem){
              //console.log("",groupMem.val());
             
              if(groupMem.val() != null && groupMem.val() != ''){ 
                var mem =  groupMem.val();
                const values = Object.keys(mem).map(key => mem[key]);
                me.member = values.length;
                console.log("me.member",me.member);
              }else{
                me.member = 0;
              }
                var value = {
                  endTime : groupData[count2].endTime,
                  groupId:  groupData[count2].groupId,
                  groupName :  groupData[count2].groupName,
                  startTime :  groupData[count2].startTime,
                  trainNumber :  groupData[count2].trainNumber,
                  type :  groupData[count2].type,
                  member: me.member,
                  chat: me.chat,
                  activeStatus : status,
                  key : groupKey[count2],
                  arrival: groupData[count2].arrivalCity,
                  departure: groupData[count2].departureCity,
               };
               me.groupList.push(value);  
               count2++;
              
               //console.log("me.groupList",me.groupList);
               if(me.groupList.length == 0){
                  me.emptyTable = true;
                }else{
                  me.emptyTable = false;
                }
            });
            
          });  
          count1++;
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
    creatrRooom(){
      this.router.navigate(["pages/dashboard"]);
    }
}
