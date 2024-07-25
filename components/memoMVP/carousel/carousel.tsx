import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Summary from './summary'; // Ensure the import path is correct
import { Colors } from '@/constants/Colors';

function Carousel() {
    const navigation = useNavigation();

    return (
        <View style={styles.carouselOuter}>
            <Pressable onPress={() => navigation.navigate('Read')}>
                <View style={styles.carouselInner}>
                    <Image
                        source={require('@/assets/images/MyImages/Kamala.jpeg')}
                        style={styles.image}
                    />
                    <View>
                        <Text style={styles.title}>Carousel Title</Text>
                    </View>
                    <View style={styles.summaryContainer}>
                        <Summary icon="close" text="test1" />
                        <Summary icon="add" text="test2" />
                        <Summary icon="alert" text="test3" />
                    </View>
                    <View style={styles.bottomCarousel}>
                        <Text style={styles.leftText}>Source</Text>
                        <Text style={styles.rightText}>12min</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default Carousel;

const styles = StyleSheet.create({
    carouselOuter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    carouselInner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.black2,
        margin: 20,
        
        borderRadius: 30,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        backgroundColor: Colors.error1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.white1
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
    },
    leftText: {
        alignSelf: 'flex-start',
    },
    rightText: {
        alignSelf: 'flex-end',
    }
});
