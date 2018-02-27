// @flow
import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default function LoginScreen(props) {
  let resetNavigation = (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: targetRoute})],
    });
    props.navigation.dispatch(resetAction);
  };
  return (
    <View style={{backgroundColor: 'skyblue', alignItems: 'center'}}>
      <Text>Login to Application</Text>
      <Button title="Login" onPress={() => resetNavigation('MainScreen')} />
    </View>
  );
}
