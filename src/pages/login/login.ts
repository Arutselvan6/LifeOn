import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ServicesPage } from '../services/services';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  Loginuser = { phno:'', pwd:'' };

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public net: MyserviceProvider) {
    if(localStorage.getItem("curId")!=undefined){
      this.navCtrl.setRoot(ServicesPage);
    }
  }

  dologin(){
    if(this.Loginuser.phno==''&&this.Loginuser.pwd==''){
      console.log("its empty");
      this.presentToast("fill all the credentials");
    }
    else{
      console.log("good");
      this.net.loginuser(this.Loginuser).then(
        (result) => {
            console.log(result["message"]);
            this.presentToast(result["message"]);
            localStorage.setItem("curId",result["id"]);
            this.navCtrl.setRoot(ServicesPage);
        },
        (err) => {
           console.log(err);
            this.presentToast('Invalid Credentials. Pls eneter valid credentials.');
        }
    );
      //this.presentToast("login Success");
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

doclear(){
  this.Loginuser.phno='';
  this.Loginuser.pwd='';
}
}
