import {
    Text,
    View,
    StyleSheet

} from 'react-native';
import { Colors } from '@/constants/Colors';


function Article (props){


    return (
        <View>
            <View style= {styles.dateNauthor} >
                <Text>Date</Text>
                <Text>Author</Text>
            </View>




        </View>
    
)
}
   

export default Article;

const styles = StyleSheet.create({
    dateNauthor : {
        flex: 1,
        fontSize: 10,
        color : Colors.white1,
        
    }
});