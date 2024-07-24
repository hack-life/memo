
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import {useState} from 'react';



import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import ProgressBarIcon from '@/components/memoMVP/ProgressBarIcon';



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

  const navigation = useNavigation();
  

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

        <ProgressBarIcon />

        
        
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.black1,
    alignItems: 'center'
  },

  paragraph : {
    fontSize : 20,
    color: Colors.white1
  },

});
