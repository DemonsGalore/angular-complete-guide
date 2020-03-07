import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models';
import { map, tap, catchError, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://react-skeleton-app-d64b0.firebaseio.com/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://react-skeleton-app-d64b0.firebaseio.com/recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error.error.error);
        return [];
      })
    );
  }
}
