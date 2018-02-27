// @flow
import {StackNavigator, TabNavigator} from 'react-navigation';

import LoginScreen from './scenes/LoginScreen';
import LogoutScreen from './scenes/LogoutScreen';
import GoToDetail from './scenes/GoToDetail';
import Detail from './scenes/Detail';
import SelectContact from './scenes/SelectContact';
import ChatScreen from './scenes/ChatScreen';

const tabs = TabNavigator(
  {
    Tab1: {screen: GoToDetail},
    Tab2: {screen: SelectContact},
    Tab3: {screen: LogoutScreen},
  },
  {
    tabBarOptions: {activeTintColor: 'tomato'},
    order: ['Tab1', 'Tab2', 'Tab3'],
    animationEnabled: false,
  },
);

export default StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {gesturesEnabled: false, headerLeft: null},
    },
    MainScreen: {
      screen: tabs,
      navigationOptions: {gesturesEnabled: false, headerLeft: null},
    },
    Detail: {screen: Detail},
    Chat: {screen: ChatScreen},
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
