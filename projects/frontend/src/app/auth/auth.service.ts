// import { Observable, from } from 'rxjs';

// import { Store } from '@ngrx/store';
// import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/app';
// // export default firebase;
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AppState } from '../store';


// @Injectable()
// export class AuthService {

//   user: firebase.User;

//   constructor(public  afAuth:  AngularFireAuth, public  router:  Router,
//               private store: Store<AppState>) {
//     // this.afAuth.authState.subscribe(user => {
//     //   if (user){
//     //     this.user = user;
//     //     localStorage.setItem('user', JSON.stringify(this.user));
//     //   } else {
//     //     localStorage.setItem('user', null);
//     //   }
//     // })
//   }

//   login(email: string, password: string) {
//   }

//   async register(email: string, password: string) {
//     // console.log(email,password);
//     // var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
//     // console.log(result);
//     // this.sendEmailVerification();
//   }

//   async sendEmailVerification() {
//     // (await this.afAuth.currentUser).sendEmailVerification()
//     // this.router.navigate(['auth/verify-email']);
//   }

//   async sendPasswordResetEmail(passwordResetEmail: string) {
//     // return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
//   }

//   async logout(){
//     // await this.afAuth.signOut();
//     // localStorage.removeItem('user');
//     // this.router.navigate(['auth/login']);
//   }

//   get isLoggedIn(): boolean {
//     const  user  =  JSON.parse(localStorage.getItem('user'));
//     return  user  !==  null;
//   }

//   async  loginWithGoogle(){
//     // await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
//     // this.router.navigate(['auth/profile']);
//   }
// }
