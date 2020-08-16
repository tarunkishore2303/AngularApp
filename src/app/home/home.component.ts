import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../service/leader.service';
import { BaseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {}

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe((dish) => (this.dish = dish));
    this.promotionService
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion));
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
