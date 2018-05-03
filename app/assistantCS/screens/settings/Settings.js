import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import {
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Text,
  Right,
  Icon,
  Button
} from "native-base";
import { connect } from 'react-redux'
import axios from "axios";


class Settings extends Component {

  handleLogout() {
    AsyncStorage.clear(err => {
      if(!err){
        this.props.dispatch({
          type:"Navigation/RESET",
          index:0,
          key:0,
          action:{
            type:"Navigation/NAVIGATE",
            routeName:'Login'
          }
        })
      }
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem
              icon
              onPress={() => this.props.navigation.navigate("SettingProfile")}
            >
              <Left>
                <Icon name="person" />
              </Left>
              <Body>
                <Text>Profile</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Button
          primary
          full
          style={{ margin: 10, backgroundColor: "#b4424b" }}
          onPress={() => this.handleLogout()}
        >
          <Text> Logout </Text>
        </Button>

      </Container>
    );
  }
}

export default connect()(Settings)