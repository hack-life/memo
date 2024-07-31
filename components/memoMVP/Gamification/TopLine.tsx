import {
    Text,
    View,
    StyleSheet

} from 'react-native';


import { useNavigation } from "@react-navigation/native";
import StreaksButton from './StreaksButton';
import ProfileButton from './ProfileButton'

import { Colors } from "@/constants/Colors";


import { useFonts } from 'expo-font';



function TopLine (){

    const [fontsLoaded] = useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
      });
    
    const navigation = useNavigation();

    return (

        <View style= {styles.TopLine}>
            <ProfileButton />
            <View style={styles.titleBox}>
                <Text style={styles.title}>Memo</Text>
            </View>
            <StreaksButton dayCount={100}/>
        </View>


        
)
}
   

export default TopLine;

const styles = StyleSheet.create({
    TopLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        backgroundColor: Colors.black1,

    },

    title : {
        fontSize: 35,
        fontFamily: "Serif",
        color: Colors.purple1,   
    },

    titleBox: {
        marginHorizontal:30,

    }
});