import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Journey } from '../journey.model';

const EXAMPLE_DATA: Journey[] = [
  {id: 1, name: 'Hydrogen', status: true, numberOfAccesses: 999},
  {id: 2, name: 'Helium', status: true, numberOfAccesses: 999},
  {id: 3, name: 'Lithium', status: true, numberOfAccesses: 999},
  {id: 4, name: 'Beryllium', status: true, numberOfAccesses: 999},
  {id: 5, name: 'Boron', status: true, numberOfAccesses: 999},
  {id: 6, name: 'Carbon', status: true, numberOfAccesses: 999},
  {id: 7, name: 'Nitrogen', status: true, numberOfAccesses: 999},
  {id: 8, name: 'Oxygen', status: true, numberOfAccesses: 999},
  {id: 9, name: 'Fluorine', status: true, numberOfAccesses: 999},
  {id: 10, name: 'Neon', status: true, numberOfAccesses: 999},
  {id: 11, name: 'Sodium', status: true, numberOfAccesses: 999},
  {id: 12, name: 'Magnesium', status: true, numberOfAccesses: 999},
  {id: 13, name: 'Aluminum', status: true, numberOfAccesses: 999},
  {id: 14, name: 'Silicon', status: true, numberOfAccesses: 999},
  {id: 15, name: 'Phosphorus', status: true, numberOfAccesses: 999},
  {id: 16, name: 'Sulfur', status: true, numberOfAccesses: 999},
  {id: 17, name: 'Chlorine', status: true, numberOfAccesses: 999},
  {id: 18, name: 'Argon', status: true, numberOfAccesses: 999},
  {id: 19, name: 'Potassium', status: true, numberOfAccesses: 999},
  {id: 20, name: 'Calcium', status: true, numberOfAccesses: 999},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class JourneyRead2DataSource extends DataSource<Journey> {

  data: Journey[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Journey[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Journey[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Journey[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
