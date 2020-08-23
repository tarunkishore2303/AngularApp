import { Directive } from '@angular/core';

@Directive({
  selector: '[appCommentform]',
})
export class CommentformDirective {
  constructor() {}
  resetForm() {
    author: '';
    rating: 5;
    comment: '';
  }
}
