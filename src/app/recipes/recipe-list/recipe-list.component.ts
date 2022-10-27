import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [ // after the colon just tells typescript what type of variable this is
    new Recipe('A Test Recipe', 'This is simply a test', 'https://images.pexels.com/photos/9203735/pexels-photo-9203735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
  ]; 

  constructor() { }

  ngOnInit(): void {
  }

}
