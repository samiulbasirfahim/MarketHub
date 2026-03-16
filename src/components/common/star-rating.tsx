import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star, StarHalf } from 'lucide-react-native';

interface StarRatingProps {
    rating: number;
    size?: number;
    color?: string;
}

export default function StarRating({ rating, size = 16, color = '#F5B63B' }: StarRatingProps) {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={`full-${i}`}
                    size={size}
                    color={color}
                    fill={color}
                    style={styles.star}
                />
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <StarHalf
                    key="half"
                    size={size}
                    color={color}
                    fill={color}
                    style={styles.star}
                />
            );
        }

        // Empty stars
        const emptyCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyCount; i++) {
            stars.push(
                <Star
                    key={`empty-${i}`}
                    size={size}
                    color="#E0E0E0"
                    style={styles.star}
                />
            );
        }

        return stars;
    };

    return <View style={styles.container}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    star: {
        marginRight: 2,
    },
});
