import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

import { Journey } from '../journey.model';
import { JourneyService } from '../journey.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  public journeys = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'name', 'status', 'numberOfAccesses'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private journeyService: JourneyService) { }
  
  ngOnInit(): void {
    this.journeyService.read().subscribe((data: Array<Journey>) => {
      this.troca(data);
      this.journeys.paginator = this.paginator;
      this.journeys.sort = this.sort;
    });
  }

  public troca(response: Array<Journey>): any {
    response.map((r: Journey) => {
      return r.status = r.status === "1" ? "on" : "off";
    })
    this.journeys = new MatTableDataSource(response);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.journeys.filter = filterValue.trim().toLowerCase();

    if (this.journeys.paginator) {
      this.journeys.paginator.firstPage();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
