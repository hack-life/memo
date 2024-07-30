import {
    Text,
    View,
    StyleSheet

} from 'react-native';


import { useNavigation } from "@react-navigation/native";
import StreaksButton from './StreaksButton';
import ProfileButton from './ProfileButton.tsx'

function TopLine (){

    
    const navigation = useNavigation();

    return (

        <View style= {styles.TopLine}>
            <ProfileButton />
            <Text>Memo</Text>
            <StreaksButton dayCount={5}/>
        </View>


        
)
}
   

export default TopLine;

const styles = StyleSheet.create({
    TopLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,


        
    }
});