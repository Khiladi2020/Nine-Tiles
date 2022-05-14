import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';

const AppDialog = props => {
  return (
    <Modal visible={props.visible} transparent>
      <TouchableWithoutFeedback onPress={props.close}>
        <View style={styles.modal}>
          <View style={styles.main}>{props.children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
