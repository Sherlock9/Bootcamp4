// @flow
import React, {Component} from 'react';
import {
  Animated,
  Easing,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import autobind from 'class-autobind';

type Props = {};
type State = {
  heightValue: Object,
  widthValue: Object,
  rotateValue: Object,
  scaleValue: Object,
};

export default class LearnAnimate extends Component<Props, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      heightValue: new Animated.Value(100),
      widthValue: new Animated.Value(100),
      rotateValue: new Animated.Value(0),
      scaleValue: new Animated.Value(1),
    };
  }
  _buttonPressIn() {
    let {scaleValue} = this.state;
    Animated.spring(scaleValue, {
      toValue: 0.5,
    }).start();
  }
  _buttonPressOut() {
    let {scaleValue} = this.state;
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }
  _growBox() {
    let {heightValue, widthValue} = this.state;
    Animated.parallel([
      Animated.timing(heightValue, {
        toValue: heightValue._value === 200 ? 100 : 200,
        duration: 2000,
        easing: Easing.bounce,
      }),
      Animated.timing(widthValue, {
        toValue: widthValue._value === 200 ? 100 : 200,
        duration: 2000,
        easing: Easing.bounce,
      }),
    ]).start();
  }
  _rotateBox(value) {
    let {rotateValue} = this.state;
    Animated.timing(rotateValue, {
      toValue: value,
      duration: 2000,
    }).start();
  }
  render() {
    let {heightValue, widthValue, rotateValue, scaleValue} = this.state;
    let rotateValueStyle = rotateValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '360deg', '180000deg'],
    });
    let rotateStyle = {
      transform: [{rotate: rotateValueStyle}],
    };
    let scaleStyle = {
      transform: [{scale: scaleValue}],
    };
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.blackBox,
            {height: heightValue, width: widthValue},
            rotateStyle,
          ]}
        />
        <TouchableOpacity
          onPress={this._growBox}
          onPressIn={this._buttonPressIn}
          onPressOut={this._buttonPressOut}
        >
          <Animated.View
            style={[styles.button, {marginBottom: 10}, scaleStyle]}
          >
            <Text>Grow and Shrink Me</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._rotateBox(rotateValue._value === 2 ? 1 : 2)}
          style={styles.button}
        >
          <Text>Rotate Me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackBox: {
    backgroundColor: '#000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
  },
});
