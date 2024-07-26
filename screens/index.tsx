import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';
import Carousel from '@/components/memoMVP/carousel/carousel';
import { useContext } from 'react';
import IconButton from '@/components/memoMVP/UI/IconButton';
import { AuthContext } from '@/store/auth-context';
import WisdomBar from '@/components/memoMVP/Gamification/wisdomBar';
import Streaks from '@/components/memoMVP/Gamification/Streaks';
import SwipableDeck from '@/components/memoMVP/carousel/SwipableDeck';

export default function HomeScreen() {
    const authCtx = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>

                <View style={styles.topContainer}>
                    <WisdomBar wisdomScore={0.75} />
                    <Streaks dayCount={5} />
                </View>

                <View style={styles.carouselOuter}>
                    <SwipableDeck />
                </View>

                <View style={styles.bottomContainer}>
                    <IconButton icon='logout' size={24} color={Colors.purple1} onPress={authCtx.logout} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.grey2,
    },
    wrapper: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        maxHeight: '10%',
        flexDirection: 'row',
        backgroundColor: Colors.black1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        margin: 10,
    },
    carouselOuter: {
        flex:1,
        maxHeight: '80%',
        overflow:"hidden",

    },
    bottomContainer: {
        flex: 1,
        maxHeight: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
});