export type AddressItem = {
    id: string;
    fullName: string;
    phone: string;
    line1: string;
    line2: string;
    area: string;
    region: string;
    city: string;
    addressLabel: 'Home' | 'Office';
    defaultDelivery: boolean;
    defaultBilling: boolean;
};

export const MOCK_ADDRESSES: AddressItem[] = [
    {
        id: 'addr-1',
        fullName: 'John Doe',
        phone: '+1 234 567 8900',
        line1: '123 Main Street, Apt 4B',
        line2: 'Near Central Park',
        area: 'Manhattan',
        region: 'Dhaka',
        city: 'Dhaka - South',
        addressLabel: 'Home',
        defaultDelivery: true,
        defaultBilling: true,
    },
    {
        id: 'addr-2',
        fullName: 'John Doe',
        phone: '+1 234 567 8900',
        line1: '456 Oak Avenue',
        line2: 'Near Brooklyn Bridge',
        area: 'Brooklyn',
        region: 'Chattogram',
        city: 'Gulshan',
        addressLabel: 'Office',
        defaultDelivery: false,
        defaultBilling: false,
    },
];
