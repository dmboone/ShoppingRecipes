import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'}, // pathMatch property now only redirects if the full path is empty
    {
        path: 'recipes', 
        component: RecipesComponent, 
        children: [ // these children will all have /recipes in front of it
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent}, // new should come before dynamic id path! otherwise angular will try to parse the word 'new' as an id rather than simply 'new' which is a predefined path
            {
                path: ':id', 
                component: RecipeDetailComponent,
                resolve: [RecipesResolverService]
            },
            {
                path: ':id/edit', 
                component: RecipeEditComponent,
                resolve: [RecipesResolverService]
            }
        ]
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}