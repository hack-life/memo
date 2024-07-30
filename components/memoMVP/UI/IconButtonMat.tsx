import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Pressable, StyleSheet, View } from 'react-native';


function IconButtonMat({ icon, size, color, onPress }) {
    return (
      <Pressable
        onPress={onPress}
        style ={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.buttonContainer}>
          <MaterialIcons name={icon} size={size} color={color} />
        </View>
      </Pressable>
    );
  }
  

export default IconButtonMat;

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
