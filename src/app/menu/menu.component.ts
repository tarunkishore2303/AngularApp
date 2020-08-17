import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../service/dish.service';
import { Dish } from '../shared/dish';
import { BaseURL } from '../shared/Baseurl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errMess: string;
  selectedDish: Dish;
  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      (errMess) => (this.errMess = <any>this.errMess)
    );
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
