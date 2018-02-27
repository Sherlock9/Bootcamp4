// @flow
import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default function LogoutScreen(props) {
  let resetNavigation = (targetRoute) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: targetRoute})],
    });
    props.navigation.dispatch(resetAction);
  };
  return (
    <View style={{backgroundColor: 'powderblue', alignItems: 'center'}}>
      <Text>Logout from Application</Text>
      <Button
        title="Log Out"
        onPress={() => {
          resetNavigation('LoginScreen');
        }}
      />
    </View>
  );
}
