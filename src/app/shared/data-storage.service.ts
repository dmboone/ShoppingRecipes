import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'}) // always need to add this if you are going to inject a service
// can either list the service under providers in app module or do what we do above by adding {providedIn: 'root'} to the Injectable
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){} // create the http client variable

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        // could do a post request if this was just one recipe but since multiple, firebase's put request
        // allows us to automatically override all the data stored under that node, so more efficient to
        // use put in this case

        // note on the url - the first part links to our firebase database, then after the slash we
        // name the node what we want - in this case, recipes makes sense
        // lastly, the .json is just required on firebase's end - we are basically making a json file
        // to store this recipes information

        this.http.put('https://shoppingrecipes-b163e-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => { // this request only gets sent if we subscribe to it!!!
                                    // you could also subscribe in the component that calls it if you wanted to do something based on the response,
                                    // like show a loader or something, but not needed here so we just subscribe right here
                console.log(response); // just printing out the response
            });
    }
}