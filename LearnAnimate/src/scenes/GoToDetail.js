//@flow
import React from 'react';
import {Button, Text, View} from 'react-native';

export default function GoToDetail(props) {
  return (
    <View>
      <Text>Go To Detail</Text>
      <Button
        title="Go to detail"
        onPress={() => props.navigation.navigate('Detail')}
      />
    </View>
  );
}
