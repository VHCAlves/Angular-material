import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Journey } from '../journey.model';
import { JourneyRead2DataSource } from './journey-read2-datasource';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-journey-read2',
  templateUrl: './journey-read2.component.html',
  styleUrls: ['./journey-read2.component.scss']
})
export class JourneyRead2Component implements AfterViewInit, OnInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Journey>;
  dataSource: JourneyRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price'];

  ngOnInit() {
    this.dataSource = new JourneyRead2DataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
