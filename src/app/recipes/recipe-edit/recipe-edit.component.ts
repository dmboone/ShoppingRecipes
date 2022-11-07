import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( // checks any time the route parameters change so we can dynamically change what we show accordingly
        (params: Params) => {
          this.id = +params['id']; // keeps the id up to date anytime the route parameters change
          this.editMode = params['id'] != null; // determines whether we are in edit mode
                                                // if there is an id param in the route, editMode is true and we are editing a recipe.
                                                // if there is no id param in the route (would give us null), then editMode is false
                                                // and this is a new recipe.
        }
      )
  }

}
