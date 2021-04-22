import { Component, OnInit } from '@angular/core';

import { Journey } from '../journey.model';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'app-journey-read',
  templateUrl: './journey-read.component.html',
  styleUrls: ['./journey-read.component.scss']
})
export class JourneyReadComponent implements OnInit {

  journeys: Journey[]
  displayedColumns = ['id', 'name', 'status']
  
  constructor(private journeyService: JourneyService) { }

  ngOnInit(): void {
    this.journeyService.read().subscribe(journeys => {
      this.journeys = journeys
    })
  }

}
