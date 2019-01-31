import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { MessagesPage } from '../messages/messages';
import { HistoryPage } from '../history/history';
import { NewsPage } from '../news/news';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showProfile(){
    this.navCtrl.push(ProfilePage);
  }

  showMessages(){
    this.navCtrl.push(MessagesPage);
  }

  showHistory(){
    this.navCtrl.push(HistoryPage);
  }

  showNews(){
    this.navCtrl.push(NewsPage);
  }

  logout(){
    localStorage.removeItem("curId");
    this.navCtrl.setRoot(HomePage);
  }

}
