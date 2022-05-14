import React from 'react';
import {Button} from 'react-native';

const AppButton = props => {
  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      color="#dd0074"
      disabled={props.disabled}
    />
  );
};

export default AppButton;
