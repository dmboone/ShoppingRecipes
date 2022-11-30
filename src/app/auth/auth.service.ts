import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData{ // defining the firebase sign up response
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient){}

    signup(email: string, password: string){ // post request using firebase authentication api which requires specific fields as seen below
        return this.http.post<AuthResponseData>( // <> tells Typescript that the response will be of type AuthResponseData, which we have defined in the interface above
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBvaFptcTa6_gKPCl9OLsGS3sWEIrfdSo', // this is the endpoint for the signup feature of firebase's authentication api
            { // firebase requires us to provide this information when making a post request to their authentication api for sign up
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}