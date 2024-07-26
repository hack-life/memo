import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Summary from './summary'; // Ensure the import path is correct
import { Colors } from '@/constants/Colors';

function Carousel({ title, summary1, summary2, summary3, image, source, length} ) {
    const navigation = useNavigation();

    return (
        <View style={styles.carouselOuter}>
            <Pressable onPress={() => navigation.navigate('Read')}>
                <View style={styles.carouselInner}>
                    <Image
                        source={require('@/assets/images/MyImages/noise.jpg')} 
                        style={styles.image}/>
                        
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.summaryContainer}>
                        <Summary icon="close" text={summary1} />
                        <Summary icon="add" text={summary2} />
                        <Summary icon="add" text={summary3} />
                    </View>
                    <View style={styles.bottomCarousel}>
                        <Text style={styles.leftText}>{source}</Text>
                        <Text style={styles.rightText}>{length}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default Carousel;

const styles = StyleSheet.create({
    carouselOuter: {
        flex:1,
        alignItems: "center",
    },
    carouselInner: {
        flexDirection: 'column',
        backgroundColor: Colors.black2,
        
        borderRadius: 30,

        shadowColor: Colors.grey2,
        shadowOpacity: 10,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: '25%',
        marginBottom: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.white1,
        alignSelf: 'flex-start',
        marginLeft:10,
    },
    summaryContainer: {
        alignSelf: 'flex-start',
        marginBottom: 16,

    },
    bottomCarousel: {
        
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
    },
    leftText: {
        alignSelf: 'flex-start',
        fontSize: 20,
        color: Colors.white1
    },
    rightText: {
        alignSelf: 'flex-end',
        fontSize: 20,
        color: Colors.white1
    }
});
