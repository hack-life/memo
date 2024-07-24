
import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import IconButton from './UI/IconButton';
import { ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';



function ProgressBarIcon (){

    return (
        <View style={styles.bottomContainer} >
          <IconButton 
            icon="arrow-left-circle" 
            size={24} 
            color={'#694F8E'}
            onPress={() => navigation.goBack()}/>
          <Progress.Bar
            width={250}
            height={7}
            progress={progress}
            color={'#694F8E'}
          />
          <IconButton 
            icon="star"  
            size={24} 
            color={'#694F8E'}/>
        </View>
    
)
}
   

export default ProgressBarIcon;

const styles = StyleSheet.create({

    bottomContainer : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : 'center',
    
      }
});









