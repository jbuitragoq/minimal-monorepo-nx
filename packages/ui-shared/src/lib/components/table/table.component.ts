import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableAction, TableColumn } from '../../core/interfaces/table.interfaces';

@Component({
    selector: 'lib-table',
    imports: [],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    @Input({ required: true }) data: unknown[] = [];
    @Input({ required: true }) columns: TableColumn[] = [];
    @Input() actions?: TableAction[];
    @Input() noDataMessage = 'No hay datos disponibles';
    @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

    sortColumn: string | null = null;
    sortDirection: 'asc' | 'desc' = 'asc';

    get sortedData(): unknown[] {
        if (!this.sortColumn) {
            return this.data;
        }

        return [...this.data].sort((a, b) => {
            const aValue = this.getNestedValue(a, this.sortColumn!);
            const bValue = this.getNestedValue(b, this.sortColumn!);

            let comparison = 0;
            if (aValue > bValue) {
                comparison = 1;
            } else if (aValue < bValue) {
                comparison = -1;
            }

            return this.sortDirection === 'desc' ? comparison * -1 : comparison;
        });
    }

    onSort(column: TableColumn): void {
        if (!column.sortable) return;

        if (this.sortColumn === column.key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column.key;
            this.sortDirection = 'asc';
        }

        this.sort.emit({ column: column.key, direction: this.sortDirection });
    }

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, prop) => current?.[prop], obj) ?? '';
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}