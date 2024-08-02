import {
    Text,
    View,
    StyleSheet,
    Dimensions,

} from 'react-native';

import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

function WisdomBar({wisdomScore}){
    const percentage = wisdomScore * 100

    const [fontsLoaded] = useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
      });

    if (!fontsLoaded) {
        return null; // or some loading indicator
    }
    return (

    <View style={styles.main} >
        <View style={styles.info}>
            <Text style={styles.gameText}>Wisdom</Text>
            <Text style={styles.gameText}>{percentage}%</Text>
        </View>
        
        <Progress.Bar
        width={deviceWidth * 0.85}
        height={8}
        progress={wisdomScore}
        color={Colors.purple1}
        borderRadius={20}
        
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
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop : 15,
    },

    gameText: {
        fontSize: 20,
        color: Colors.white1,
        fontFamily: "Serif-Italic",


    }
});