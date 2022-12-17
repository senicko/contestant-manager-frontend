import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface TableHeader {
  label: string;
  accessor: string;
  processFn?: (value: any) => string;
  compareFn?: (a: any, b: any) => number;
}

export interface RowAction {
  name: string;
  handler: (row: any) => void;
}

type OrderState = {
  accessor: string;
  direction: 'asc' | 'desc';
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input() data: Record<string, any>[] = [];
  @Input() actions: RowAction[] = [];
  @Input() headers: TableHeader[] = [];

  @Output() rowClick = new EventEmitter<any>();

  sortedData?: Record<string, any>[];
  orderState?: OrderState;

  constructor() {}

  ngOnInit(): void {}

  sort(orderByAccessor: string) {
    if (
      this.orderState?.accessor === orderByAccessor &&
      this.orderState.direction === 'asc'
    ) {
      this.orderState = undefined;
      this.sortedData = undefined;
      return;
    }

    if (this.orderState?.accessor === orderByAccessor)
      this.orderState.direction = 'asc';
    else
      this.orderState = {
        accessor: orderByAccessor,
        direction: 'desc',
      };

    const sortedHeader = this.headers.find(
      (header) => header.accessor === orderByAccessor
    );

    const compareFn = sortedHeader?.compareFn ?? this.defaultCompareFn;

    this.sortedData = [...this.data].sort((a, b) => {
      let aValue = a[orderByAccessor];
      let bValue = b[orderByAccessor];

      if (sortedHeader?.processFn) {
        aValue = sortedHeader.processFn(aValue);
        bValue = sortedHeader.processFn(bValue);
      }

      const result = compareFn(aValue, bValue);

      return this.orderState?.direction === 'asc' ? result : -result;
    });

    console.log(this.sortedData);
  }

  private defaultCompareFn(a: any, b: any) {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }
}
