import {
    FlatList,
    StyleSheet,

} from 'react-native';

import ArticleBox from './ArticleBox';


function ArticleList ({articles}){



    return (
   
            <FlatList
              style={styles.list}
              data={articles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ArticleBox title={item.title}  source={item.source} />
              )}
            />
);
}
   

export default ArticleList;

const styles = StyleSheet.create({
    list: {

    },


});