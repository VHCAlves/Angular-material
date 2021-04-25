import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

import { Journey } from '../journey.model';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'app-journey-read',
  templateUrl: './journey-read.component.html',
  styleUrls: ['./journey-read.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JourneyReadComponent implements OnInit {

  public journeys;
  public displayedColumns: string[] = ['id', 'name', 'status'];
  
  constructor(private journeyService: JourneyService) { }

  ngOnInit(): void {
    this.journeyService.read().subscribe(journeys => {
      this.troca(journeys);
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.journeys.filter = filterValue.trim().toLowerCase();
  }

  public troca(journeys: Journey[]): any {
    journeys.map(r => {
      if(r.status === "1") r.status = "on";
      else r.status = "off";
    })
    this.journeys = new MatTableDataSource(journeys);
  }

  // public sortData(sort: Sort) {
  //   const data = this.journeys.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.journeys = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'id': return compare(a.id, b.id, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
