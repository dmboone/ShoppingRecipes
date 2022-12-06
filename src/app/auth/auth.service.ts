import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from "./user.model";

export interface AuthResponseData{ // defining the firebase sign up response; we export this so we can use it in the auth component as well
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // this is an optional field because the signup request does not provide this but the login request does
}

@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null); // can get access to the currently active user even if we only subscribe after the user has been emitted

    constructor(private http: HttpClient){}

    signup(email: string, password: string){ // post request using firebase authentication api which requires specific fields as seen below
        return this.http.post<AuthResponseData>( // <> tells Typescript that the response will be of type AuthResponseData, which we have defined in the interface above
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBvaFptcTa6_gKPCl9OLsGS3sWEIrfdSo', // this is the endpoint for the signup feature of firebase's authentication api
            { // firebase requires us to provide this information when making a post request to their authentication api for sign up
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError), // pipe to handle error response
            tap(resData => { // pipe to create user model from signup response data
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        ); 
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBvaFptcTa6_gKPCl9OLsGS3sWEIrfdSo', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError), // pipe to handle error response
            tap(resData => { // pipe to create user model from login response data
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){ // we define how to handle authentication here in one place since we will reuse this for both login and signup
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // calculating the time at which the user token will expire
        const user = new User(email, userId, token, expirationDate); // creating a user based on the model we defined in user.model.ts
        this.user.next(user); // use subject to emit this as our now currently logged in user
    }

    private handleError(errorRes: HttpErrorResponse){ // we defined how to handle the error here in one place since we will reuse this for both login and signup
        let errorMessage = 'An unknown error occured!'; // default error message

            if(!errorRes.error || !errorRes.error.error){ // checks if error format is different than expected
                return throwError(errorMessage);
            }

            switch(errorRes.error.error.message){ // switch to check for cases in which we can deliver a more specific error message
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct';
                    break;
            }

            return throwError(errorMessage);
    }
}