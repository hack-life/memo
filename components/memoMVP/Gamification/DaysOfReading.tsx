import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import { useLoadFonts } from '@/hooks/useLoadFonts';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';


function DaysOfReading ({streaksNb}){

    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) {
      return null;
    }


    return (

    <View style={styles.container}>
        <FontAwesome5 name="check-circle" size={30} color={Colors.purple1}/>
        <View  style={styles.TextContainer}>
            <Text style={styles.streaksText}>{streaksNb}</Text>
            <Text style={styles.Text}>days of reading this month</Text>
        </View>
    </View>
)
}
   

export default DaysOfReading;

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.grey1,
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly", 
        width: "60%"


    },

    TextContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between"

    },

    streaksText: {
        fontSize: 25,
        color: Colors.white1,
        fontFamily: "Serif",
        paddingHorizontal: 5
    },

    Text: {
        fontSize: 12,
        color: Colors.white1,
        fontFamily: "Serif"
    }

});