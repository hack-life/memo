import {
    Text,
    View,
    StyleSheet

} from 'react-native';


import { useNavigation } from "@react-navigation/native";
import StreaksButton from './StreaksButton';
import ProfileButton from './ProfileButton'

import { Colors } from "@/constants/Colors";


import { useLoadFonts } from '@/hooks/useLoadFonts';


function TopLine (){
    
    const navigation = useNavigation();

    const fontsLoaded = useLoadFonts();

    if (!fontsLoaded) {
      return null; // or some loading indicator
    }
  

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
        color: Colors.purple1,   
        fontFamily: "Serif",
    },

    titleBox: {
        marginHorizontal:30,

    }
});