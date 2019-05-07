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
  active: string = '';
  allUser: any;
  public loader: boolean = false;
  callOne: boolean = false;
  all = [];
  oneTimeuser: boolean = false;
  constructor(private db: AngularFireDatabase,private router: Router) {
   /* var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }*/
  }

  ngOnInit(){
    //var group : any;
    this.loadAllGroup();  
    this.getAllUser();
  }

  loadAllGroup(){
    var me = this;
    me.loader = true;
    me.callOne = true;
    firebase.database().ref('/Group').on('value',function(group){
      me.groupList = [];
      var groupKey = [];
      var groupData = [];
      var key = [];
      var count = -1;
      var count2 = 0;
      var count1 = 0;
      var status = "";
      for(var data in group.val()){
         //var msg = me.tripeDateValidation(group.val()[data].tripeDate,group.val()[data].startTime,group.val()[data].endTime);
        
        if(me.callOne == true){
          groupKey.push(group.val()[data].groupId);
          groupData.push(group.val()[data]);
          key.push(data);

          firebase.database().ref('GroupChats/' +  groupKey[count1]).on('value',function(groupChat){
            if(groupChat.val() != null && groupChat.val() != ''){
              var mem =  groupChat.val();
              const values = Object.keys(mem).map(key => mem[key]);
              me.chat = values.length;
            }else{
              me.chat = 0;
            }
            count++;
            firebase.database().ref('GroupMember/' + groupKey[count]).on('value',function(groupMem){
              if(groupMem.val() != null && groupMem.val() != ''){ 
                var mem =  groupMem.val();
                const values = Object.keys(mem).map(key => mem[key]);
                me.member = values.length;
              }else{
                me.member = 0;
              }
               var currentDate = new Date();
              var startDate = new Date(groupData[count2].startDateTime);
              var endDate = new Date(groupData[count2].endDateTIme);
              // console.log("--->",    startDate.getTime() <= currentDate.getTime()  ,"  --->" ,  endDate.getTime() >= currentDate.getTime() )
              // if(startDate.getTime() <= currentDate.getTime() && endDate.getTime() >= currentDate.getTime()){
              //  status = "Active";
              // }else{
              //   status = "Inactive";
              // }
                var value = {
                  endTime : groupData[count2].endTime,
                  groupId:  groupData[count2].groupId,
                  groupName :  groupData[count2].groupName,
                  startTime :  groupData[count2].startTime,
                  trainNumber :  groupData[count2].trainNumber,
                  type :  groupData[count2].type,
                  member: me.member,
                  chat: me.chat,
                  activeStatus : groupData[count2].groupActivated == true ? 'Active' : 'Inactive',
                  key : key[count2],
                  arrival: groupData[count2].arrivalCity,
                  departure: groupData[count2].departureCity,
               };
               me.groupList.push(value);  
               count2++;
               if(me.groupList.length == 0){
                  me.emptyTable = true;
                }else{
                  me.emptyTable = false;
                  me.loader = false;
                }
            });
            
          });  
          count1++;
        }  
      }
      me.callOne = false;
    });
  }

  getAllUser(){
    let me = this;
    var item = localStorage.getItem("userdate");
    me.allUser = 0;
    me.all = [];
    me.oneTimeuser = true;
    if(!item){
      firebase.database().ref('/users').on('value',function(group){
        if(me.oneTimeuser == true){
          me.allUser = Object.keys(group.val()).length
        }
        me.oneTimeuser = false;
      });
    }else{

      var resetDate = JSON.parse(localStorage.getItem("userdate"));
      var t = new Date(resetDate);
      firebase.database().ref('/users').on('value',function(group){
        if(me.oneTimeuser == true){
          for(var data in group.val()){
            var mydate = new Date(group.val()[data].created);
           if(mydate > t){
              // console.log("-----",group.val()[data]);   
              // me.allUser = Object.keys(group.val()).length;
              me.all.push(group.val()[data]);
              console.log("me.allUser----------",me.all);
              me.allUser = me.all.length;
            }
          }
        }   
        me.oneTimeuser = false;
      });
    }
  }
  refreshRooom(){
    let me = this;
    me.loader = true;
    me.groupList = [];
    me.allUser = 0;
    setTimeout(()=>{
      me.loadAllGroup()  
      me.getAllUser();
    },100);
    // if(me.groupList.length > 0){
    //   me.loader = false;
    // }else{
    //   me.loader = true;
    // }
  }
  restartUser(){
    let me = this;
    var date = new Date();
    var timestamp = date.getTime();
    me.allUser = 0;
    localStorage.setItem("userdate", JSON.stringify(timestamp))
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
