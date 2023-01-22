export interface TableColumn {
    header: string;
    field: string;
    position?: 'right' | 'left';
    isSortable?: boolean;
}
