import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/Dish';
import { DishService } from '../service/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dish = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }
}
