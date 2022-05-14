import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';

const AppDialog = props => {
  if (!props.visible) return null;
  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
      <Modal visible={props.visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={styles.modal}>
            <View style={styles.main}>{props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  main: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 5,
    padding: 40,
    alignItems: 'center',
  },
});

export default AppDialog;
