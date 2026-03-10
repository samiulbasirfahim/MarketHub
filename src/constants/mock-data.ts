import { Category } from '@/components/common/category-card';
import { Product } from '@/components/common/product-card';

export const MOCK_CATEGORIES: Category[] = [
    {
        id: '1',
        name: 'Home & Living',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
    },
    {
        id: '2',
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200',
    },
    {
        id: '3',
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200',
    },
    {
        id: '4',
        name: 'Sports',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200',
    },
    {
        id: '5',
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200',
    },
    {
        id: '6',
        name: 'Beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
    },
    {
        id: '7',
        name: 'Books',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200',
    },
    {
        id: '8',
        name: 'Toys',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200',
    },
    {
        id: '9',
        name: 'Groceries',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    },
    {
        id: '10',
        name: 'Automotive',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200',
    },
    {
        id: '11',
        name: 'Garden',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200',
    },
    {
        id: '12',
        name: 'Pet Supplies',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
    },
];

export const MOCK_POPULAR_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Adventure Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        rating: 4.8,
        reviewCount: 443,
        price: 2.0,
        originalPrice: 3.99,
    },
    {
        id: '2',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.6,
        reviewCount: 218,
        price: 19.99,
        originalPrice: 34.99,
    },
    {
        id: '3',
        name: 'Running Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        rating: 4.7,
        reviewCount: 312,
        price: 45.0,
        originalPrice: 79.0,
    },
    {
        id: '4',
        name: 'Smart Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        rating: 4.5,
        reviewCount: 189,
        price: 59.99,
        originalPrice: 99.99,
    },
    {
        id: '5',
        name: 'Yoga Mat Pro',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
        rating: 4.4,
        reviewCount: 97,
        price: 14.5,
        originalPrice: 22.0,
    },
    {
        id: '6',
        name: 'Leather Wallet',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
        rating: 4.9,
        reviewCount: 560,
        price: 12.0,
        originalPrice: 20.0,
    },
];

export const MOCK_BEST_DEALS: Product[] = [
    {
        id: 'b1',
        name: 'Portable Speaker',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        rating: 4.3,
        reviewCount: 134,
        price: 9.99,
        originalPrice: 24.99,
    },
    {
        id: 'b2',
        name: 'Sunglasses Classic',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        rating: 4.5,
        reviewCount: 87,
        price: 8.0,
        originalPrice: 18.0,
    },
    {
        id: 'b3',
        name: 'Ceramic Coffee Mug',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
        rating: 4.7,
        reviewCount: 203,
        price: 3.5,
        originalPrice: 8.0,
    },
    {
        id: 'b4',
        name: 'Phone Stand',
        image: 'https://images.unsplash.com/photo-1586495777744-4e6232595ca9?w=400',
        rating: 4.2,
        reviewCount: 45,
        price: 2.99,
        originalPrice: 6.99,
    },
    {
        id: 'b5',
        name: 'Canvas Tote Bag',
        image: 'https://images.unsplash.com/photo-1614179818511-8ca6a6bce2e2?w=400',
        rating: 4.6,
        reviewCount: 321,
        price: 5.0,
        originalPrice: 12.0,
    },
    {
        id: 'b6',
        name: 'Scented Candle Set',
        image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400',
        rating: 4.8,
        reviewCount: 276,
        price: 7.99,
        originalPrice: 15.99,
    },
];
