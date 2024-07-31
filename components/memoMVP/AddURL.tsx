import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,

  } from 'react-native';
  import { BlurView } from 'expo-blur';
  import { Colors } from "@/constants/Colors";
  import IconButtonAnt from "@/components/memoMVP/UI/IconButtonAnt";
  import { useState } from 'react';
  
  function AddURL({ isModalVisible, toggleModal }) {
    const [inputValue, setInputValue] = useState('');
    
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
              <Text style={styles.modalText}>Copy the link to an article or a twitter thread below</Text>

              <TextInput
                style={styles.inputText}
                placeholder="Link to webpage or pdf"
                placeholderTextColor={Colors.grey2}
                value={inputValue}
                onChangeText={setInputValue}
              />

              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}> 
                <Text style={styles.closeButtonText}>Import</Text>
              </TouchableOpacity>

              
            </View>

            <View style={styles.fixedButton}>
              <IconButtonAnt icon="closecircle" size={80} color={Colors.purple1} onPress={toggleModal} />
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
      width: "80%",
      height: "50%",
      padding: 20,
      backgroundColor: Colors.grey1,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: "center"
    },
    modalText: {
      fontSize: 20,
      marginBottom: 20,
      justifyContent: "center",
      textAlign: "center",
      color: Colors.white1,
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      paddingHorizontal: 40,
      backgroundColor: Colors.purple1,
      borderRadius: 20,

        // Shadow properties
        shadowColor: Colors.black1,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10, // Android shadow
    },
    closeButtonText: {
      color: 'white',
      fontSize: 20,
    },
    fixedButton: {
      position: "absolute",
      bottom: 40,
      right: 5,
      zIndex: 1,
    },

    inputText: {
      width: '100%',
      height: 50,
      borderColor: Colors.purple1,
      backgroundColor: Colors.white1,
      borderRadius: 30,
      paddingHorizontal: 10,
      marginBottom: 20,
      textAlign: 'center',

      // Shadow properties
      shadowColor: Colors.black1,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      elevation: 10, // Android shadow
    },
  });
  