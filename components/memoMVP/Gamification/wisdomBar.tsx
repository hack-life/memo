import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';


function WisdomBar({wisdomScore}){
    const percentage = wisdomScore * 100

    const [fontsLoaded] =useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
      });

    return (

    <View style={styles.main} >
        <View style={styles.info}>
            <Text style={styles.gameText}>Wisdom</Text>
            <Text style={styles.gameText}>{percentage}%</Text>
        </View>
        
        <Progress.Bar
        width={250}
        height={7}
        progress={wisdomScore}
        color={Colors.purple2}
        
      />

    </View>
)
}
   

export default WisdomBar;

const styles = StyleSheet.create({

    main: {
        
        flexDirection: "column",
        justifyContent: "center",
        
    },

    info: {
        flex:1,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    gameText: {
        fontSize: 20,
        color: Colors.white1,
        fontFamily: "Serif"


    }
});