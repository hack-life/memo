import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';

function Streaks ({dayCount}){

    const [fontsLoaded] =useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
      });

    return (
        <View style= {styles.Streaks}>
            <Text style = {styles.DayCount}>{dayCount}</Text>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={50} color={Colors.purple2} />
        </View>
    
)
}
   

export default Streaks;

const styles = StyleSheet.create({

    Streaks: {
        flex:1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center"

    },

    DayCount: {
        fontSize: 40,
        color: Colors.white1,
        fontFamily: 'Serif-Italic'
    }
});