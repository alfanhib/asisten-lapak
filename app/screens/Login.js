/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';

class Login extends Component {

  navigateToAssistantCS() {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'AssitantCSMain'
    })
  }

  navigateToAssistantOutdoor() {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'AssitantOutdoorMain'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Testing</Text>
        <Button onPress={()=>this.navigateToAssistantCS()} title="to Assistant CS"/>
        <Button onPress={()=>this.navigateToAssistantOutdoor()} title="to Assistant Outdoor"/>
      </View>
    )
  }
}

export default connect()(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
