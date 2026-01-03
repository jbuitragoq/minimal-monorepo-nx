export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
}

export interface TableAction {
    label: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    onClick: (item: any) => void;
}