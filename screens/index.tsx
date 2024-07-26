import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

import { useContext } from 'react';
import IconButton from '@/components/memoMVP/UI/IconButton';
import { AuthContext } from '@/store/auth-context';
import WisdomBar from '@/components/memoMVP/Gamification/wisdomBar';
import Streaks from '@/components/memoMVP/Gamification/Streaks';
import SwipableDeck from '@/components/memoMVP/carousel/SwipableDeck';


export default function HomeScreen() {
    const authCtx = useContext(AuthContext);

    const deviceWidth = Dimensions.get('screen').width;
    const deviceHeight = Dimensions.get('screen').height;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>

                <View style={[styles.topContainer, { height: deviceHeight * 0.1 }]}>
                    <WisdomBar wisdomScore={0.75} />
                    <Streaks dayCount={5} />
                </View>

                <View style={{ height: deviceHeight * 0.72 }}>
                    <SwipableDeck />
                </View>

                <View style={[styles.bottomContainer, { height: deviceHeight * 0.1 }]}>
                    <IconButton icon='logout' size={24} color={Colors.purple2} onPress={authCtx.logout} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.black1,
    },
    wrapper: {
        flex: 1,
    },
    topContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.black1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        margin: 10,
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
});