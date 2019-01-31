import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ServicesPage } from '../services/services';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  //msg = {id:0,priority:'',hospitalName:'',mobno:'',deadline:'',isDismissed:false};
  msgList = [ ];
  requestData = { msgId:0,userId:0};
  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public net: MyserviceProvider) {
    this.userData = {userId:localStorage.getItem("curId")};
    let data: any;
    this.net.getMessages(this.userData).then(
      (result) => {
        for(data in result){
          let msgData = { id:0,priority:'',hospitalName:'',mobno:'',deadline:'',isDismissed:false};
          msgData.id = result[data].mid;
          msgData.priority = result[data].priority;
          msgData.hospitalName = result[data].hospitalname;
          msgData.mobno = result[data].mobno;
          msgData.deadline = result[data].deadline;
          this.msgList.push(msgData);
          console.log(msgData.id);
        }
        console.log("messages loaded successfully");
      },
      (err) => {
        this.presentToast("Unable to load Messages.");
        console.log(err);
      }
    );
  }

  getEnquiry(msgId){
    this.requestData.msgId = msgId;
    this.requestData.userId = this.userData.userId;
    this.net.sendDonorRequest(this.requestData).then(
      (result) => {
        this.presentToast("Enquiry Request sent to the requested Hospital.");
      },
      (err) => {
        this.presentToast("Unable to send the request.");
      }
    );
  }

  dismissMsg(msgId){
    let msg : any;
    console.log("Dismissing MsgId = "+msgId);
    for( msg in this.msgList){
      if(this.msgList[msg].id == msgId){
        console.log("dismissed msgId = "+this.msgList[msg].id);
        this.msgList[msg].isDismissed = true;
        break;
      }
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 5000,
        position: 'bottom',
        //dismissOnPageChange: true
    });
    
    toast.present();
}
}
