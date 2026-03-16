export type OrderStatus = 'All' | 'Delivered' | 'Return' | 'Cancelled';

export type OrderItem = {
    id: string;
    date: string;
    itemCount: number;
    total: number;
    status: Exclude<OrderStatus, 'All'>;
};

export const ORDER_ITEMS: OrderItem[] = [
    {
        id: 'ORD-1001',
        date: '1/15/2026',
        itemCount: 3,
        total: 124.5,
        status: 'Delivered',
    },
    {
        id: 'ORD-1002',
        date: '1/16/2026',
        itemCount: 2,
        total: 88.0,
        status: 'Return',
    },
    {
        id: 'ORD-1003',
        date: '1/18/2026',
        itemCount: 1,
        total: 39.99,
        status: 'Cancelled',
    },
    {
        id: 'ORD-1004',
        date: '1/20/2026',
        itemCount: 4,
        total: 220.75,
        status: 'Delivered',
    },
    {
        id: 'ORD-1005',
        date: '1/21/2026',
        itemCount: 2,
        total: 64.25,
        status: 'Delivered',
    },
];
