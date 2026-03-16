import React from 'react';
import OrderList from './order-list';

export default function CancelledOrdersTab() {
    return <OrderList status="Cancelled" />;
}
