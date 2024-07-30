import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import IconButtonMat from '../UI/IconButtonMat';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

function ProfileButton (){

    const navigation = useNavigation();

    return (
        <View style={styles.Profile}>
            <Text style={styles.text}>Profile</Text>
            <IconButtonMat 
                icon="account-circle" 
                size={40} 
                color={Colors.purple1} 
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    );
}
   

export default ProfileButton;

const styles = StyleSheet.create({

    Profile: {
        flex:1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center"

    },

    text: {
        fontSize: 40,
        color: Colors.white1,
        fontFamily: 'Serif-Italic'
    }
});