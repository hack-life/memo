import FlatButton from '@/components/memoMVP/UI/FlatButton';
import {
    Text,
    SafeAreaView,
    StyleSheet,

} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useContext } from 'react';
import { AuthContext } from '@/store/auth-context';

function ProfileScreen (){

    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);

    return (
        <SafeAreaView>

            <Text>Profile</Text>
            <FlatButton  children={"Go back"} onPress={() => navigation.navigate("Home") } />
            <FlatButton  children={"LogOut"} onPress={authCtx.logout} />

        </SafeAreaView>
    
)
}
   

export default ProfileScreen;

const styles = StyleSheet.create({

});