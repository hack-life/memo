import React from 'react';
import { View, StyleSheet, Dimensions,} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { useFonts } from 'expo-font';

// Utility functions
export function getFormattedDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

// Calendar Component
function StreaksCalendar({ activeDay }) {
    const today = new Date();
    
    const [fontsLoaded] = useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null; // or some loading indicator
    }

    // Create marked dates object with custom styles for each active day
    const markedDates = activeDay.reduce((acc, date) => {
        acc[date] = {
            customStyles: {
                container: {
                    backgroundColor: Colors.purple1,
                    borderRadius: 3,
                    alignItem: "center",
                    justifyContent: "center",
                },
                text: {
                    color: Colors.white1,
                    fontWeight: 'bold',
                }
            }
        };
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                current={today}
                onDayPress={day => {
                    console.log('selected day', day); // ici on pourra afficher les articles qui ont été lu ce jour là
                }}
                markingType={'custom'}
                markedDates={markedDates}
               
                enableSwipeMonths={true}
                theme={{
                    calendarBackground: Colors.grey1,


                    textSectionTitleColor: Colors.white1,
                    

                    arrowColor: Colors.white1,

                    monthTextColor: Colors.white1,
                    
                    textDayFontFamily: "Serif",
                    textMonthFontFamily: "Serif",
                    textDayHeaderFontFamily: "Serif",
                    
                    textDayFontSize: 20,
                    textMonthFontSize: 25,
                    textDayHeaderFontSize: 15,

                    
                    dayTextColor: Colors.white1,
                    
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
        height: deviceHeight * 0.4,
        width: deviceWidth * 0.9,
        borderRadius: 20,
    },
});
