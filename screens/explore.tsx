
import { SafeAreaView, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {useState} from 'react';



import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import ProgressBarIcon from '@/components/memoMVP/Read/ProgressBarIcon';
import Article from '@/components/memoMVP/Read/Article';




export default function ReadScreen() {
  
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  
  const navigation = useNavigation();
  const UpdateProgressBar = (value) => {
    const contentOffsetY = value.nativeEvent.contentOffset.y;
    const totalScrollHeight = scrollViewContentHeight - scrollViewHeight;
    if (totalScrollHeight > 0) {
      setProgress(contentOffsetY / totalScrollHeight);
    } else {
      setProgress(0);
    }
  };


  const deviceHeight = Dimensions.get('screen').height

  return (
      <SafeAreaView style={styles.container}>

        <ScrollView
          onScroll={UpdateProgressBar}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollViewContentHeight(contentHeight)
          }
          onLayout={(event) =>
            setScrollViewHeight(event.nativeEvent.layout.height)
          }
          scrollEventThrottle={12}

          style = {[styles.ReadingContainer, { height: deviceHeight * 0.85 }]}
        >

          <Article />
    


        </ScrollView>
        
        <ProgressBarIcon progress={progress} />

        
        
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: Colors.black1,
    
  },

  ReadingContainer: {
    backgroundColor: Colors.black1
  }



});
