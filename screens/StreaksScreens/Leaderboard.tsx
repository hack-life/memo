import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,

} from 'react-native';

import IconButtonMat from '@/components/memoMVP/UI/IconButtonMat';

import { Colors } from "@/constants/Colors";
import { useNavigation } from 'expo-router';


function Leaderboard (){

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <IconButtonMat icon="arrow-back-ios" size={40} color={Colors.purple1} onPress={() => navigation.navigate("Home")}/>
            <Text>Leaderboard</Text>
        </SafeAreaView>
    
    
)
}
   

export default Leaderboard;

const styles = StyleSheet.create({

});