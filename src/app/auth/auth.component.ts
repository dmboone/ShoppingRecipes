import { HttpErrorResponse } from '@angular/common/http';
import {Component, ComponentFactoryResolver} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode; // just switches the isLoginMode value
    }

    onSubmit(form: NgForm){
        if(!form.valid){ // extra check to ensure the form is valid
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>; // this allows us to not have to repeat ourselves since we handle the observable the exact same
                                                    // way in both login mode and signup mode

        this.isLoading = true;
        if(this.isLoginMode){ // confirms we are logging in
            authObs = this.authService.login(email, password);
        }
        else{ // not logging in so need so run signup method
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe( // subscribe to the authentication observable whether we are in logging in or signing up
            resData =>{
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']); // navigate to recipes route on successful authentication
            },
            errorMessage => // specifics of errorMessage is now getting handled in the auth.service through a catchError pipe
            {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset(); // always reset form on submission
    }

    onHandleError(){
        this.error = null;
    }

    private showErrorAlert(message: string){ // gets called and will add error component programmatically
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
    }
}