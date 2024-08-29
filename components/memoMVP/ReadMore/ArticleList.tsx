import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import ArticleBox from './ArticleBox';

function ArticleList({ articles }) {
  return (
      <View style={styles.listContainer}>
          <FlatList
              data={articles}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <ArticleBox title={item.title} url={item.url} />
              )}
          />
      </View>
  );
}

export default ArticleList;

const styles = StyleSheet.create({
  listContainer: {
      flex: 1, // Allow the list container to take up available space
      width: '95%', // Make sure it takes the full width
  },

});
