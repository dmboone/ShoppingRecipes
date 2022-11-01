import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  
  constructor(private recipeService: RecipeService) { } // injects Recipe service; this ensures this parent (recipes) is referencing the same 
                                                        // version of the recipes service as its children (recipe-list and recipe-item)

  ngOnInit(): void {
    this.recipeService.recipeSelected
      .subscribe( // subscribes to recipeSelected event from our recipe service
        (recipe: Recipe) => { // when the event occurs grab recipe data from event and update selectedRecipe variable
          this.selectedRecipe = recipe;
        }
      )
  }
}
