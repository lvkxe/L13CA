import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchCarparkData();
    }, []);

    const fetchCarparkData = async () => {
        try {
            const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_9f6056bdb6b1dfba57f063593e4f34ae');
            const json = await response.json();
            if (json.result && json.result.records) {
                setData(json.result.records);
                setFilteredData(json.result.records);
            } else {
                console.error("Invalid API response:", json);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (text) => {
        setSearch(text);
        const filtered = data.filter((item) =>
            (item.car_park || item.carpark || "").toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const CarparkItem = React.memo(({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Carpark Details', { carpark: item })}
            aria-label={`Navigate to details of ${item.car_park || item.carpark}`}
        >
            <Text style={styles.carparkName}>{item.car_park || item.carpark}</Text>
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder="Search for a carpark..."
                placeholderTextColor="#888"
                value={search}
                onChangeText={handleSearch}
                autoCapitalize="none"
                accessibilityLabel="Search carparks"
            />

            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => `${item.car_park || item.carpark}-${index}`}
                renderItem={({ item }) => <CarparkItem item={item} />}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No carparks found</Text>}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 20,
        paddingTop: 40, // Adds space from the top for a better visual balance
    },
    searchBox: {
        height: 50,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#FFF',
        color: '#333',
        marginBottom: 20, // Adds spacing between search box and list
    },
    item: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        marginBottom: 15, // Adds spacing between each list item
    },
    carparkName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
        textAlign: 'center',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    listContainer: {
        paddingBottom: 20, // Ensures bottom space even if the list is short
    },
});
