import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Details({ route }) {
    const { carpark } = route.params;
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const carparkRates = {
            weekdaysRate1: carpark.weekdays_rate_1 || "N/A",
            weekdaysRate2: carpark.weekdays_rate_2 || "N/A",
            saturdayRate: carpark.saturday_rate || "N/A",
            sundayPHRate: carpark.sunday_publicholiday_rate || "N/A"
        };
        setRates(carparkRates);
    }, [carpark]);

    if (!rates) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{carpark.carpark}</Text>
                <Text style={styles.detail}> <Text style={styles.label}>Weekday Rate 1:</Text> {rates.weekdaysRate1}</Text>
                <Text style={styles.detail}> <Text style={styles.label}>Weekday Rate 2:</Text> {rates.weekdaysRate2}</Text>
                <Text style={styles.detail}> <Text style={styles.label}>Saturday Rate:</Text> {rates.saturdayRate}</Text>
                <Text style={styles.detail}> <Text style={styles.label}>Sunday/Public Holiday:</Text> {rates.sundayPHRate}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
        textAlign: 'center'
    },
    card: {
        width: '90%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderColor: '#007AFF',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 4 },
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#007AFF',
        marginBottom: 15,
        textAlign: 'center'
    },
    detail: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center'
    },
    label: {
        fontWeight: '600',
        color: '#007AFF'
    }
});
