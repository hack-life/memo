import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Summary from './summary';
import { Colors } from '@/constants/Colors';

function Carousel() {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Read')}>
                <View style={styles.carouselInner}>
                    <Image
                        source={require('@/assets/images/react-logo.png')}
                        style={styles.image} // Added style for the image
                    />
                    <View>
                        <Text>Test0</Text>
                    </View>
                    <Summary icon="close" text="test1" />
                    <Summary icon="add" text="test2" />
                    <Summary icon="alert" text="test3" />
                </View>
            </Pressable>
        </View>
    );
}

export default Carousel;

const styles = StyleSheet.create({
    carouselInner: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Colors.grey2,
        margin: 60,
        padding: 100,
        borderRadius: 30
    },
    image: {
        width: 100, // Set appropriate width
        height: 100, // Set appropriate height
        resizeMode: 'contain', // Adjust based on your need
    }
});
