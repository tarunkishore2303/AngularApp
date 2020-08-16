import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  leaders: Leader[];
  constructor(private leaderService: LeaderService) {
    this.leaders = this.leaderService.getLeaders();
  }

  ngOnInit(): void {}
}
