import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';


function WisdomBar({wisdomScore}){

    return (
        <Progress.Bar
        width={250}
        height={7}
        progress={wisdomScore}
        color={Colors.purple2}
        
      />
)
}
   

export default WisdomBar;

const styles = StyleSheet.create({});