import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'}, // pathMatch property now only redirects if the full path is empty
    { 
        path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) // implementing lazy loading for recipes module
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}