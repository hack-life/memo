import {
    Text,
    View,
    StyleSheet
    Modal,


} from 'react-native';




function AddURL (){
    
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


    return (
        <View>

            <Modal
    isVisible={isVisible}
    onSwipeComplete={handleClose}
    swipeDirection="down"
    style={{ justifyContent: "flex-end", margin: 0 }}
    >



        </Modal>

    </View>
    
)
}
   

export default AddURL;

const styles = StyleSheet.create({

});




