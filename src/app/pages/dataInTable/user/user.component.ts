import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls:  ['./user.component.css'],
})
export class userComponent {
  public userList = [];
  public emptyTable = false;

  constructor(private db: AngularFireDatabase,private router: Router) {
    var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.router.navigate(["pages/tables/smart-table"]);
        }
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
