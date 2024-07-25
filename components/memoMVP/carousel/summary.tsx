import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Summary({ icon, text }) {
    return (
        <View style={styles.outerContainer}>
            <Ionicons name={icon} size={24} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

export default Summary;

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 16,
    },
});
