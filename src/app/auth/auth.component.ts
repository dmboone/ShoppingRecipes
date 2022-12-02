import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;

    constructor(private authService: AuthService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode; // just switches the isLoginMode value
    }

    onSubmit(form: NgForm){
        if(!form.valid){ // extra check to ensure the form is valid
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if(this.isLoginMode){
            // ..
        }
        else{ // not logged in so need so run signup method
            this.authService.signup(email, password)
            .subscribe(
                resData =>{
                    console.log(resData);
                },
                error =>
                {
                    console.log(error);
                }            
            );
        }

        form.reset(); // always reset form on submission
    }
}