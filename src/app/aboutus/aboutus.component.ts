import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';
import { BaseURL } from '../shared/baseurl';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  leaders: Leader[];
  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {
    this.leaderService
      .getLeaders()
      .subscribe((leaders) => (this.leaders = leaders));
  }

  ngOnInit(): void {}
}
