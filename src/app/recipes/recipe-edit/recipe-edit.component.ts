import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( // checks any time the route parameters change so we can dynamically change what we show accordingly
        (params: Params) => {
          this.id = +params['id']; // keeps the id up to date anytime the route parameters change
          this.editMode = params['id'] != null; // determines whether we are in edit mode
                                                // if there is an id param in the route, editMode is true and we are editing a recipe.
                                                // if there is no id param in the route (would give us null), then editMode is false
                                                // and this is a new recipe.
          this.initForm(); // initializes form
        }
      )
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')) //need to cast to form array first
    .push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){ // if in edit mode grabs values for specific recipe
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){ // if recipe has ingredients
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push( // putting each ingredient and it's amount into a form group and pushing it onto our form array
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({ // creates new form with either empty fields or fields that are being edited from a recipe in edit mode
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
