
import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../UI/IconButton';
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';



function ProgressBarIcon ({progress}){   

    const navigation = useNavigation();

    return (
        <View style={styles.bottomContainer} >
          <IconButton 
            icon="arrow-left-circle" 
            size={24} 
            color={Colors.purple2}
            onPress={() => navigation.goBack()}/>
          <Progress.Bar
            width={250}
            height={7}
            progress={progress}
            color={Colors.purple2}
          />
          <IconButton 
            icon="star"  
            size={24} 
            color={Colors.purple2}/>
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









