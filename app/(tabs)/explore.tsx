
import { View, Text, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import { Card } from 'react-native-paper';


export default function ReadScreen() {
  
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  const UpdateProgressBar = (value) => {
    const contentOffsetY = value.nativeEvent.contentOffset.y;
    const totalScrollHeight = scrollViewContentHeight - scrollViewHeight;
    if (totalScrollHeight > 0) {
      setProgress(contentOffsetY / totalScrollHeight);
    } else {
      setProgress(0);
    }
  };



    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={UpdateProgressBar}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollViewContentHeight(contentHeight)
          }
          onLayout={(event) =>
            setScrollViewHeight(event.nativeEvent.layout.height)
          }
          scrollEventThrottle={12}
        >


          <Text style={styles.paragraph}>Test</Text>

          
        </ScrollView>
        <View>
          <Progress.Bar
            width={250}
            height={7}
            progress={progress}
            color={'#694F8E'}
          />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 40,
    alignItems: 'center'
  },

  paragraph : {
    fontSize : 50
  },
});
