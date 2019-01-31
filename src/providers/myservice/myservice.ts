import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let loginurl='https://agroups.in/bala/lifeon/loginUser.php';
let registerurl='https://agroups.in/bala/lifeon/registerUser.php';
let profileurl = 'https://agroups.in/bala/lifeon/getUserProfile.php';
let messagesurl = 'https://agroups.in/bala/lifeon/getMessages.php';
let donorurl = 'https://agroups.in/bala/lifeon/makeDonorRequest.php';

@Injectable()
export class MyserviceProvider {

  constructor(public http: Http) {
    console.log('Hello NetservProvider Provider');
}

loginuser(data)
{
  return new Promise((resolve,reject) => {
    let headers = new Headers();
    //headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Content-Type','application/json');
    
    this.http.post(loginurl,JSON.stringify(data),{headers: headers})
    .subscribe(
        res =>{
        resolve(res.json());
    }, (err) => {
        console.log('error in validating');
        reject(err);               
    });
});
}

registeruser(data)
{
  return new Promise((resolve,reject) => {
    let headers = new Headers();
    //headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Content-Type','application/json');
    
    this.http.post(registerurl,JSON.stringify(data),{headers: headers})
    .subscribe(
        res =>{
        resolve(res.json());
    }, (err) => {
        console.log('error in validating');
        reject(err);               
    });
});
}

getProfileData(userId){
    return new Promise((resolve,reject) => {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.http.post(profileurl,JSON.stringify(userId),{headers: headers})
        .subscribe(
            res =>{
            resolve(res.json());
            console.log(res.json());
        }, (err) => {
            console.log('error in retriving');
            reject(err); 
        });
    });
}

getMessages(userId){
    return new Promise((resolve,reject) => {
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Content-Type','application/json');
        console.log(JSON.stringify(userId));
        this.http.post(messagesurl,JSON.stringify(userId),{headers: headers})
        .subscribe(
            res =>{
            resolve(res.json());
        }, (err) => {
            console.log('error in getting messages');
            reject(err);               
        });
    });
}

sendDonorRequest(requestData){
    return new Promise((resolve,reject) =>{
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.http.post(donorurl,JSON.stringify(requestData),{headers:headers})
        .subscribe(
            res=>{
                resolve(res.json());
            }, (err) => {
                console.log('error in sending request');
                reject(err);
            }
        );
    });
}

}
