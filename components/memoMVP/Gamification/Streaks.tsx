import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import IconButtonMat from '../UI/IconButtonMat';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

function Streaks ({dayCount}){

    const navigation = useNavigation();

    const [fontsLoaded] =useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
      });

    return (
        <View style= {styles.Streaks}>
            <Text style = {styles.DayCount}>{dayCount}</Text>
            <IconButtonMat icon="local-fire-department" size={40} color={Colors.purple1} onPress={() => navigation.navigate("StreaksScreens")}/>
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