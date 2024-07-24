import {
    Text,
    View,
    StyleSheet

} from 'react-native';


import { Ionicons } from '@expo/vector-icons';


function Summary ({icon, text}){
    return (
    <View style= {styles.outerContainer} >
        <Ionicons name={icon} size={24}/>
        <Text> {text} </Text>

    </View>
    
)
}
   

export default Summary;

const styles = StyleSheet.create({

    outerContainer: {
        flex:1,
        flexDirection: "row"
    }

});