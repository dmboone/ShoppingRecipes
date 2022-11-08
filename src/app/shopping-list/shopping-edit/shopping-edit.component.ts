import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe( // subscribing to the startedEditing Subject, which acts similarly to an observable and also emits event data like event emitter
                  // subscribing to the Subject allows us to react as soon as an ingredient is in editing mode
        (index: number) => { // grabbing event data; in this case it's the index where the ingredient is located in the array in shopping-list
          this.editedItemIndex = index;
          this.editMode = true;
        }
      );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void { // make sure to unsubscribe from observable to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
