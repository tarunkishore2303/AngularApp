import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/Dish';
import { DishService } from '../service/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import {
  transition,
  trigger,
  state,
  style,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  animations: [
    trigger('visibility', [
      state('shown', style({ transform: 'scale(1.01)', opacity: 1 })),
      state(
        'hidden',
        style({
          transform: 'scale(0.5)',
          opacity: 0,
        })
      ),
      transition('*=>*', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishCopy: Dish;
  comment: Comment;
  commentForm: FormGroup;
  newComment: Comment;
  @ViewChild('cform') CommentformDirective;
  visibility = 'shown';

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL')
    public BaseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this.dishservice.getDish(params['id']);
        })
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dishCopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        (errMess) => (this.errMess = <any>errMess)
      );
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: '',
      rating: 1,
      comment: '',
    });
  }

  onSubmit() {
    console.log('Submit triggered');
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString(); // it seems that method .toISOString doesn't exist
    this.dishCopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dishCopy = dish;
      },
      (errMess) => {
        this.dish = null;
        this.dishCopy = null;
        this.errMess = <any>errMess;
      }
    );
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date: '',
    });

    this.CommentformDirective.resetForm();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
