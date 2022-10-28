import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [ // after the colon just tells typescript what type of variable this is
    new Recipe('A Test Recipe', 'This is simply a test', 'https://images.pexels.com/photos/9203735/pexels-photo-9203735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    new Recipe('Another Test Recipe', 'This is another test', 'https://images.pexels.com/photos/3297367/pexels-photo-3297367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ]; 

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
