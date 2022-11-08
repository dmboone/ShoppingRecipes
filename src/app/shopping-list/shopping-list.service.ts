import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>(); // creates a Subject
    startedEditing = new Subject<number>(); // creates a Subject so that we can also access this from the shopping-edit component
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients(){
        return this.ingredients.slice(); // this creates a copy so if we update we have to get the updated array to our service somehow
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); // send back a copy of the newly updated array as part of the event emit so that our shopping list can store the new data
    }

    addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient); // viable option but would emit event for every ingredient added
        // }
        this.ingredients.push(...ingredients); // can use the spread operator instead!
        this.ingredientsChanged.next(this.ingredients.slice()); // emit event and pass new ingredients array
    }
}