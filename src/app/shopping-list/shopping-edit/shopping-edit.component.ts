import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef; // grabs element from reference 'nameInput' found in html file
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef; // grabs element from reference 'amountInput' found in html file

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value; // gathers actual input data from nameInputRef element (see properties above)
    const ingAmount = this.amountInputRef.nativeElement.value; // gathers actual input data from amountInputRef element (see properties above)
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }
}
