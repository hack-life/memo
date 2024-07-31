import { Pressable, StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

function IconButtonAnt({ icon, size, color, onPress }) {
    return (
      <Pressable
        onPress={onPress}
        style ={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.buttonContainer}>
          <AntDesign name={icon} size={size} color={color} />
        </View>
      </Pressable>
    );
  }
  

export default IconButtonAnt;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75,
  },
});
