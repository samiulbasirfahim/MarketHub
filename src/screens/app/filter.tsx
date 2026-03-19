import React, { useMemo, useRef, useState } from 'react';
import {
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { X } from 'lucide-react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import StarRating from '@/components/common/star-rating';
import { AppSelect } from '@/components/common/dropdown';
import { colors } from '@/constants/colors';
import { router } from '@/navigations/router';
import { Layout } from '@/components/layout';

const SORT_OPTIONS = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Law to High', value: 'price_low_to_high' },
    { label: 'Price: High to Law', value: 'price_high_to_low' },
    { label: 'Highest Rated', value: 'highest_rated' },
    { label: 'Newest First', value: 'newest_first' },
    { label: 'Most Popular', value: 'most_popular' },
];

const CATEGORY_OPTIONS = [
    { label: "Men's Fashion", count: 245 },
    { label: "Women's Fashion", count: 389 },
    { label: 'Phones & Accessories', count: 156 },
    { label: 'Computer & Gaming', count: 198 },
    { label: 'Electronic Accessories', count: 287 },
    { label: 'TV & Home Appliances', count: 134 },
    { label: 'Home & Living', count: 421 },
];

const VENDOR_OPTIONS = ['TechGear Pro', 'Fashion Forward'];

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

export default function FilterScreen() {
    const [sortBy, setSortBy] = useState('default');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [trackWidth, setTrackWidth] = useState(0);

    const lowStartX = useRef(0);
    const highStartX = useRef(0);

    const priceRange = MAX_PRICE - MIN_PRICE;

    const valueToX = (value: number) => {
        if (trackWidth <= 0) return 0;
        return ((value - MIN_PRICE) / priceRange) * trackWidth;
    };

    const xToValue = (x: number) => {
        if (trackWidth <= 0) return MIN_PRICE;
        const ratio = Math.min(1, Math.max(0, x / trackWidth));
        const raw = MIN_PRICE + ratio * priceRange;
        return Math.round(raw / 1000) * 1000;
    };

    const clamp = (value: number, min: number, max: number) => {
        return Math.min(max, Math.max(min, value));
    };

    const lowThumbResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    lowStartX.current = valueToX(minPrice);
                },
                onPanResponderMove: (_, gesture) => {
                    const maxX = valueToX(maxPrice);
                    const nextX = clamp(lowStartX.current + gesture.dx, 0, maxX);
                    setMinPrice(xToValue(nextX));
                },
            }),
        [minPrice, maxPrice, trackWidth],
    );

    const highThumbResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    highStartX.current = valueToX(maxPrice);
                },
                onPanResponderMove: (_, gesture) => {
                    const minX = valueToX(minPrice);
                    const nextX = clamp(
                        highStartX.current + gesture.dx,
                        minX,
                        trackWidth,
                    );
                    setMaxPrice(xToValue(nextX));
                },
            }),
        [minPrice, maxPrice, trackWidth],
    );

    const minX = valueToX(minPrice);
    const maxX = valueToX(maxPrice);

    const toggleString = (
        value: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value],
        );
    };

    const toggleRating = (rating: number) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(item => item !== rating)
                : [...prev, rating],
        );
    };

    return (
        <Layout>
            <View style={styles.headerRow}>
                <View>
                    <Text variant="primary" size="xl" weight="bold" style={styles.title}>
                        Filters
                    </Text>
                    <Text variant="body" style={styles.subtitle}>
                        Customize your shopping experience
                    </Text>
                </View>

                <Pressable style={styles.closeBtn} onPress={() => router.goBack()}>
                    <X size={24} color={colors.text} />
                </Pressable>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <View style={styles.section}>
                        <Text
                            variant="secondary"
                            weight="semibold"
                            style={styles.sectionTitle}
                        >
                            Sort By
                        </Text>
                        <AppSelect
                            value={sortBy}
                            onChange={value => setSortBy(value)}
                            options={SORT_OPTIONS}
                            placeholder="Default"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text
                            variant="secondary"
                            weight="semibold"
                            style={styles.sectionTitle}
                        >
                            Price Range
                        </Text>

                        <View
                            style={styles.sliderWrap}
                            onLayout={event => setTrackWidth(event.nativeEvent.layout.width)}
                        >
                            <View style={styles.sliderTrack} />
                            <View
                                style={[
                                    styles.sliderActiveTrack,
                                    { left: minX, width: Math.max(0, maxX - minX) },
                                ]}
                            />

                            <View
                                style={[styles.thumb, { left: minX - 12 }]}
                                {...lowThumbResponder.panHandlers}
                            />
                            <View
                                style={[styles.thumb, { left: maxX - 12 }]}
                                {...highThumbResponder.panHandlers}
                            />
                        </View>

                        <View style={styles.rangeValuesRow}>
                            <Text variant="secondary" style={styles.rangeValueText}>
                                {minPrice}
                            </Text>
                            <Text variant="secondary" style={styles.rangeValueText}>
                                {maxPrice}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text
                            variant="secondary"
                            weight="semibold"
                            style={styles.sectionTitle}
                        >
                            Categories
                        </Text>
                        {CATEGORY_OPTIONS.map(item => {
                            const isChecked = selectedCategories.includes(item.label);
                            return (
                                <Pressable
                                    key={item.label}
                                    style={styles.rowItem}
                                    onPress={() =>
                                        toggleString(
                                            item.label,
                                            selectedCategories,
                                            setSelectedCategories,
                                        )
                                    }
                                >
                                    <View style={styles.rowLeft}>
                                        <Checkbox
                                            value={isChecked}
                                            onValueChange={() =>
                                                toggleString(
                                                    item.label,
                                                    selectedCategories,
                                                    setSelectedCategories,
                                                )
                                            }
                                            size={18}
                                        />
                                        <Text variant="body" style={styles.optionText}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    <Text variant="label" style={styles.countText}>
                                        ({item.count})
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    <View style={styles.section}>
                        <Text
                            variant="secondary"
                            weight="semibold"
                            style={styles.sectionTitle}
                        >
                            Vendors
                        </Text>
                        {VENDOR_OPTIONS.map(vendor => {
                            const isChecked = selectedVendors.includes(vendor);
                            return (
                                <Pressable
                                    key={vendor}
                                    style={styles.rowItem}
                                    onPress={() =>
                                        toggleString(vendor, selectedVendors, setSelectedVendors)
                                    }
                                >
                                    <View style={styles.rowLeft}>
                                        <Checkbox
                                            value={isChecked}
                                            onValueChange={() =>
                                                toggleString(
                                                    vendor,
                                                    selectedVendors,
                                                    setSelectedVendors,
                                                )
                                            }
                                            size={18}
                                        />
                                        <Text variant="body" style={styles.optionText}>
                                            {vendor}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>

                    <View style={styles.section}>
                        <Text
                            variant="secondary"
                            weight="semibold"
                            style={styles.sectionTitle}
                        >
                            Rating
                        </Text>
                        {RATING_OPTIONS.map(rating => {
                            const isChecked = selectedRatings.includes(rating);
                            return (
                                <Pressable
                                    key={`rating-${rating}`}
                                    style={styles.rowItem}
                                    onPress={() => toggleRating(rating)}
                                >
                                    <View style={styles.rowLeft}>
                                        <Checkbox
                                            value={isChecked}
                                            onValueChange={() => toggleRating(rating)}
                                            size={18}
                                        />
                                        <View style={styles.ratingRow}>
                                            <StarRating rating={rating} size={18} />
                                            <Text variant="body" style={styles.optionText}>
                                                & Up
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    label="Apply Filters"
                    onPress={() => router.goBack()}
                    fullWidth
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingTop: 18,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    title: {
        color: colors.text,
        fontSize: 24,
    },
    subtitle: {
        color: colors.textSecondary,
        marginTop: 6,
    },
    closeBtn: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    scroll: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        backgroundColor: colors.background,
        padding: 14,
        gap: 20,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    sliderWrap: {
        height: 30,
        justifyContent: 'center',
        marginTop: 2,
    },
    sliderTrack: {
        height: 10,
        borderRadius: 8,
        backgroundColor: '#DCE3F2',
    },
    sliderActiveTrack: {
        position: 'absolute',
        height: 10,
        borderRadius: 8,
        backgroundColor: colors.primary,
    },
    thumb: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.primary,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rangeValuesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeValueText: {
        color: colors.text,
        fontSize: 14,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    optionText: {
        color: colors.textSecondary,
    },
    countText: {
        color: '#8A97AD',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    footer: {
        paddingVertical: 14,
    },
});
