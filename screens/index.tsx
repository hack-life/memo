import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import Carousel from '@/components/memoMVP/carousel/carousel';
import { useContext } from 'react';
import IconButton from '@/components/memoMVP/UI/IconButton';
import { AuthContext } from '@/store/auth-context';

export default function HomeScreen() {
    const authCtx = useContext(AuthContext);

    return (
        <View style={styles.wrapper}>
            <View style={styles.carouselOuter}>
                <Carousel />
            </View>
            <View style={styles.bottomContainer}>
                <IconButton icon='logout' size={24} color={Colors.purple1} onPress={authCtx.logout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.black1,
    },
    carouselOuter: {
        flex: 8,
        backgroundColor: Colors.black1,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        padding: 5,
    },
});
