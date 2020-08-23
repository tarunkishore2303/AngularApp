import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
import { BaseURL } from '../shared/baseurl';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display:block;',
  },
  animations: [flyInOut(), expand()],
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
