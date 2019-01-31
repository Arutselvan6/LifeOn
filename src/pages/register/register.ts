import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  isAlcoholist = false;
  isSmoker = false;
  userdata = { name:'',phno:'',email:'',pwd:'',age:'',gender:'',bgroup:'',alcoholist:0,smoker:0,address:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public net: MyserviceProvider) {
  }

  checkAlcohol(){
    this.isAlcoholist = !this.isAlcoholist;
    console.log("alc");
  }

  checkSmoke(){
    this.isSmoker = !this.isSmoker;
    console.log("smk");
  }

  doregister(){
    this.userdata.alcoholist = (this.isAlcoholist)?1:0;
    this.userdata.smoker = (this.isSmoker)?1:0;
    if(this.checkdata()){
      console.log(JSON.stringify(this.userdata));
      this.net.registeruser(this.userdata).then(
        (result) => {
              console.log(result["message"]);
              this.presentToast(result["message"]);
              this.navCtrl.setRoot(LoginPage);
        },
        (err) => {
           console.log(err);
            this.presentToast('Invalid Credentials. Pls eneter valid credentials.');
        }
    );

    }

  }

  doclear(){
    this.userdata.name = '';
    this.userdata.phno = '';
    this.userdata.email = '';
    this.userdata.pwd = '';
    this.userdata.age = '';
    this.userdata.gender = '';
    this.userdata.bgroup = '';
    this.userdata.alcoholist = 0;
    this.isAlcoholist = false;
    this.userdata.smoker = 0;
    this.isSmoker = false;
    this.userdata.address = '';
  }

  checkdata(){
    if(this.userdata.name==''||
    this.userdata.phno==''||
    this.userdata.email==''||
    this.userdata.pwd==''||
    this.userdata.age==''||
    this.userdata.gender==''||
    this.userdata.bgroup==''||
    this.userdata.address==''){
      this.presentToast("fill all the credentials");
      return false;
    }
    else
    return true;
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
