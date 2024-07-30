import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import IconButtonMat from '@/components/memoMVP/UI/IconButtonMat';

import { Colors } from "@/constants/Colors";
import { useNavigation } from 'expo-router';


function MyStreaks (){

    const navigation = useNavigation();

    return (
        <View>
            <IconButtonMat icon="arrow-back-ios" size={40} color={Colors.purple1} onPress={() => navigation.navigate("Home")}/>
            <Text>MyStreaks</Text>
        </View>
    
)
}
   

export default MyStreaks;

const styles = StyleSheet.create({

});