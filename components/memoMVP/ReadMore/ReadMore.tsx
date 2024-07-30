import {
    Text,
    View,
    StyleSheet

} from 'react-native';

import ArticleList from './ArticleList';
import { Divider } from '@rneui/themed';

import { Colors } from "@/constants/Colors";




function ReadMore({articles}){



    return (
        <View>
            <Divider 
            style= {{width:"100%"}}
            color= {Colors.grey1} 
            width = {3} />
            <Text>Want to read</Text>
            <ArticleList articles={articles}/>



        </View>
)
}
   

export default ReadMore;

const styles = StyleSheet.create({

});