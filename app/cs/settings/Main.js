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
import axios from "axios";

const uri =
  "https://api.backendless.com/1D6EBFAA-2D6A-ACBC-FF77-A80991922A00/A841A3F1-57A0-BB1E-FF8B-343D47243600";

import Footer from "../../../components/Footer";

export default class Main extends Component {
  state = {
    form: {}
  };

  handleLogout() {
    AsyncStorage.clear(err => {
      if (!err) {
        this.props.navigation.navigate("SignIn");
      } else {
        alert("Logout Gagal");
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
        <Footer
          data={{
            activeSettings: true,
            screenHome: () => this.props.navigation.navigate("CsHome"),
            screenTransaction: () =>
              this.props.navigation.navigate("CsTransaction")
          }}
        />
      </Container>
    );
  }
}
