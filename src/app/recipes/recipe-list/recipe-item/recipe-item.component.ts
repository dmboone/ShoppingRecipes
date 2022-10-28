import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe; // is now bindable from outside (from our parent component, in this case recipe-list)
  @Output() recipeSelected = new EventEmitter<void>(); // created our own event for when item has been clicked (recipeSelected); event can now be accessed by parent (recipe-list)

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit();
  }
}
