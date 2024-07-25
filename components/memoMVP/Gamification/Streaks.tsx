import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors } from '@/constants/Colors';


function Streaks ({dayCount}){
    return (
        <View style= {styles.Streaks}>
            <Text style = {styles.DayCount}>{dayCount}</Text>
            <SimpleLineIcons name="fire" size={24} color={Colors.purple2} />

        </View>
    
)
}
   

export default Streaks;

const styles = StyleSheet.create({

    Streaks: {
        flex:1,
        flexDirection: 'row',

    },

    DayCount: {
        fontSize: 20,
        color: Colors.white1
    }
});