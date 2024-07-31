import {
    Text,
    View,
    StyleSheet,
    Pressable

} from 'react-native';

import { useFonts } from 'expo-font';


import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

function ProfileButton (){

    const navigation = useNavigation();

    const [fontsLoaded] =useFonts({
        'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
        'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
        
      });


    return (
        <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.grey2 : Colors.grey1,
            },
            styles.Box,
          ]}
        >

            <View style={styles.Profile}>
                <Text style={styles.text}>Profile</Text>
                <MaterialIcons name="account-circle" size={35} color= {Colors.purple1} />
            </View>

        </Pressable>
        
    );
}
   
export default ProfileButton;

const styles = StyleSheet.create({

    Box: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        
      },
    Profile: {
        flexDirection: 'row',
        alignItems: "center",
     

    },

    text: {
        fontSize: 20,
        color: Colors.white1,
        fontFamily: 'Serif'
    }
});