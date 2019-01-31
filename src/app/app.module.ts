import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { ServicesPage } from '../pages/services/services';
import { ProfilePage } from '../pages/profile/profile';
import { MessagesPage } from '../pages/messages/messages';
import { HistoryPage } from '../pages/history/history';
import { NewsPage } from '../pages/news/news';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ServicesPage,
    ProfilePage,
    MessagesPage,
    HistoryPage,
    NewsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ServicesPage,
    ProfilePage,
    MessagesPage,
    HistoryPage,
    NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyserviceProvider
  ]
})
export class AppModule {}
