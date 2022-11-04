import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [ // after the colon just tells typescript what type of variable this is
    new Recipe('Loaded Baked Potatoes', 
    'Oven baked potatoes', 
    'https://images.pexels.com/photos/9203735/pexels-photo-9203735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    [
      new Ingredient('potato', 10), 
      new Ingredient('sour cream', 11), 
      new Ingredient('cheese', 2),
      new Ingredient('chives', 1)
    ]),
    new Recipe('Salmon Poke Bowl', 
    'A refreshing fish and rice dish', 
    'https://images.pexels.com/photos/4828093/pexels-photo-4828093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    [
      new Ingredient('salmon', 2),
      new Ingredient('rice', 1),
      new Ingredient('cucumber', 1)
    ]),
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice(); // the slice will return an exact copy rather than a direct reference!
  }

  getRecipe(index: number){
    return this.recipes[index]; // grabs a single recipe using the id from the route param as the index
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}

