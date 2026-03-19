import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Layout } from '@/components/layout';
import { MOCK_ADDRESSES } from './address-data';
import { SettingsSubScreensStackParamList } from '@/navigations';
import { AppSelect } from '@/components/common/dropdown';

type Props = NativeStackScreenProps<
    SettingsSubScreensStackParamList,
    'AddressForm'
>;

type AddressLabel = 'Home' | 'Office';

type FormState = {
    fullName: string;
    phone: string;
    line1: string;
    line2: string;
    area: string;
    region: string;
    city: string;
    addressLabel: AddressLabel;
    defaultDelivery: boolean;
    defaultBilling: boolean;
};

const REGION_OPTIONS = [
    { label: 'Dhaka', value: 'Dhaka' },
    { label: 'Chattogram', value: 'Chattogram' },
    { label: 'Khulna', value: 'Khulna' },
];

const CITY_OPTIONS = [
    { label: 'Dhaka - South', value: 'Dhaka - South' },
    { label: 'Dhaka - North', value: 'Dhaka - North' },
    { label: 'Gulshan', value: 'Gulshan' },
    { label: 'Gulshan 2', value: 'Gulshan 2' },
    { label: 'Gulshan 3', value: 'Gulshan 3' },
    { label: 'Gulshan 4', value: 'Gulshan 4' },
    { label: 'Gulshan 5', value: 'Gulshan 5' },
    { label: 'Gulshan 6', value: 'Gulshan 6' },
    { label: 'Gulshan 7', value: 'Gulshan 7' },
    { label: 'Gulshan 8', value: 'Gulshan 8' },
    { label: 'Gulshan 9', value: 'Gulshan 9' },
    { label: 'Gulshan 10', value: 'Gulshan 10' },
    { label: 'Gulshan 13', value: 'Gulshan 13' },
    { label: 'Gulshan 24', value: 'Gulshan 24' },
];

const ADDRESS_LABELS: AddressLabel[] = ['Home', 'Office'];

const DEFAULT_FORM: FormState = {
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    area: '',
    region: 'Dhaka',
    city: 'Dhaka - South',
    addressLabel: 'Home',
    defaultDelivery: false,
    defaultBilling: false,
};

export default function AddressFormScreen({ navigation, route }: Props) {
    const addressId = route.params?.id;
    const isEditing = !!addressId;

    const initial = useMemo(
        () => MOCK_ADDRESSES.find(item => item.id === addressId) ?? null,
        [addressId],
    );

    const [form, setForm] = useState<FormState>({
        fullName: initial?.fullName ?? DEFAULT_FORM.fullName,
        phone: initial?.phone ?? DEFAULT_FORM.phone,
        line1: initial?.line1 ?? DEFAULT_FORM.line1,
        line2: initial?.line2 ?? DEFAULT_FORM.line2,
        area: initial?.area ?? DEFAULT_FORM.area,
        region: initial?.region ?? DEFAULT_FORM.region,
        city: initial?.city ?? DEFAULT_FORM.city,
        addressLabel: initial?.addressLabel ?? DEFAULT_FORM.addressLabel,
        defaultDelivery: initial?.defaultDelivery ?? DEFAULT_FORM.defaultDelivery,
        defaultBilling: initial?.defaultBilling ?? DEFAULT_FORM.defaultBilling,
    });

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <Layout>
            <View style={styles.headerRow}>
                <MapPin size={28} color={colors.primary} />
                <Text variant="secondary" weight="semibold">
                    {isEditing ? 'Edit Address' : 'Add Address'}
                </Text>
            </View>

            <View style={styles.card}>
                {/* Full name + Phone */}
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Input
                            label="Full Name"
                            value={form.fullName}
                            onChangeText={v => update('fullName', v)}
                            placeholder="John Doe"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.col}>
                        <Input
                            label="Phone Number"
                            value={form.phone}
                            onChangeText={v => update('phone', v)}
                            placeholder="01403XXXXXX"
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <Input
                    label="Address"
                    value={form.line1}
                    onChangeText={v => update('line1', v)}
                    placeholder="Street address"
                    multiline
                    inputWrapperStyle={styles.textArea}
                    inputStyle={styles.textAreaInput}
                />

                <Input
                    label="Landmark (Optional)"
                    value={form.line2}
                    onChangeText={v => update('line2', v)}
                    placeholder="Nearest landmark"
                />

                {/* Address label */}
                <View style={styles.section}>
                    <Text variant="label" style={styles.sectionLabel}>
                        Address Label (Optional)
                    </Text>
                    <View style={styles.row}>
                        {ADDRESS_LABELS.map(l => (
                            <Button
                                key={l}
                                label={l}
                                onPress={() => update('addressLabel', l)}
                                variant={form.addressLabel === l ? 'primary' : 'ghost'}
                                size="sm"
                                style={styles.labelBtn}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.selectStack}>
                    <AppSelect
                        label="Region"
                        value={form.region}
                        onChange={v => update('region', v)}
                        options={REGION_OPTIONS}
                    />
                    <AppSelect
                        label="City"
                        value={form.city}
                        onChange={v => update('city', v)}
                        options={CITY_OPTIONS}
                    />
                </View>

                <Input
                    label="Area"
                    value={form.area}
                    onChangeText={v => update('area', v)}
                    placeholder="Area"
                    multiline
                    inputWrapperStyle={styles.textArea}
                    inputStyle={styles.textAreaInput}
                />

                <View style={styles.section}>
                    <Text variant="label" style={styles.sectionLabel}>
                        Default Address (Optional)
                    </Text>
                    <Pressable
                        style={styles.checkboxRow}
                        onPress={() => update('defaultDelivery', !form.defaultDelivery)}
                    >
                        <Checkbox
                            value={form.defaultDelivery}
                            onValueChange={v => update('defaultDelivery', v)}
                        />
                        <Text variant="body">Default delivery address</Text>
                    </Pressable>
                    <Pressable
                        style={styles.checkboxRow}
                        onPress={() => update('defaultBilling', !form.defaultBilling)}
                    >
                        <Checkbox
                            value={form.defaultBilling}
                            onValueChange={v => update('defaultBilling', v)}
                        />
                        <Text variant="body">Default billing address</Text>
                    </Pressable>
                </View>

                <Button
                    label={isEditing ? 'Update Address' : 'Save Address'}
                    onPress={handleSave}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    card: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        backgroundColor: colors.background,
        padding: 14,
        gap: 12,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    col: {
        flex: 1,
    },
    selectStack: {
        gap: 12,
    },
    section: {
        gap: 8,
    },
    sectionLabel: {
        color: colors.text,
    },
    labelBtn: {
        flex: 1,
        borderRadius: 6,
    },
    textArea: {
        minHeight: 92,
        height: 92,
    },
    textAreaInput: {
        textAlignVertical: 'top',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 2,
    },
});
