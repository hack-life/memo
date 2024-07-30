import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
  } from 'react-native';
  import { BlurView } from 'expo-blur';
  import { Colors } from "@/constants/Colors";
  import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
  
  function AddURL({ isModalVisible, toggleModal }) {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <BlurView intensity={10} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>This is the modal content!</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fixedButton}>
              <IconButtonAnt icon="closecircle" size={100} color={Colors.purple1} onPress={toggleModal} />
            </View>

          </BlurView>
        </Modal>
      </View>
    );
  }
  
  export default AddURL;
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: Colors.purple1,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    fixedButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      zIndex: 1,
    },
  });
  