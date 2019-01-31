import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  isDataAvailable = false;
  userdata = { name:'',phno:'',email:'',age:'',gender:'',bgroup:'',alcoholist:"",smoker:"",address:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController ,public net: MyserviceProvider) {
    let userId = {userId:localStorage.getItem("curId")};
    console.log(JSON.stringify(userId));
    this.net.getProfileData(userId).then(
      (result) => {
          console.log("Data Retrieved = "+result["name"]);
          this.isDataAvailable = true;
          this.userdata.name = result["name"];
          this.userdata.phno = result["phno"];
          this.userdata.email = result["email"];
          this.userdata.age = result["age"];
          this.userdata.gender = result["gender"];
          this.userdata.address = result["address"];
          this.userdata.bgroup = result["bgroup"];
          this.userdata.alcoholist = (result["alcoholist"]=="0")?"No":"Yes";
          this.userdata.smoker = (result["smoker"]=="0")?"No":"Yes";
          
      },
      (err) => {
         console.log(err);
          this.presentToast('Unable to get Profile Details.');
      }
  );
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
