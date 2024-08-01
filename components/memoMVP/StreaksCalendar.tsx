import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '@/constants/Colors';

// Utility functions
export function getFormattedDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

// Calendar Component
function StreaksCalendar() {
    const today = new Date();

    return (
        <View style={styles.container}>
            <Calendar
                // Customize the appearance of the calendar
                style={styles.calendar}
                // Specify the current date
                current={today}
                // Callback that gets called when the user selects a day
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                // Mark specific dates as marked
                markedDates={{
                    // Add your marked dates here
                }}
                
            />
        </View>
    );
}

export default StreaksCalendar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
    
        height: "80%",
        width: "100%",
    },
});
