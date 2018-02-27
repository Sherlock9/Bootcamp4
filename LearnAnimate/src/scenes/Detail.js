//@flow
import React from 'react';
import {Button, Text, View} from 'react-native';

export default function Detail(props) {
  return (
    <View>
      <Text>Detail</Text>
      <Button
        title="Press to go back"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
}
