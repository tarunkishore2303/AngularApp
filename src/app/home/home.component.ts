import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../service/leader.service';
import { flyInOut, expand } from '../animations/app.animation';
import { BaseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display:block;',
  },
  animations: [flyInOut(), expand()],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  promotionErrMess: string;
  leader: Leader;
  leaderErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {}

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(
      (dish) => (this.dish = dish),
      (dishErrMess) => (this.dishErrMess = <any>dishErrMess)
    );
    this.promotionService.getFeaturedPromotion().subscribe(
      (promotion) => (this.promotion = promotion),
      (promotionErrMess) => (this.promotionErrMess = <any>promotionErrMess)
    );
    this.leaderService.getFeaturedLeader().subscribe(
      (leader) => (this.leader = leader),
      (leaderErrMess) => (this.leaderErrMess = <any>leaderErrMess)
    );
  }
}
