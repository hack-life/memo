import FlatButton from '@/components/memoMVP/UI/FlatButton';
import {
    Text,
    SafeAreaView,
    StyleSheet,

} from 'react-native';

import { useNavigation } from "@react-navigation/native";

function ProfileScreen (){

    const navigation = useNavigation();

    return (
        <SafeAreaView>

            <Text>Profile</Text>

            <FlatButton  children={"Retour"} onPress={() => navigation.navigate("Home") } />

        </SafeAreaView>
    
)
}
   

export default ProfileScreen;

const styles = StyleSheet.create({

});