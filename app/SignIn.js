import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Form,
  Input,
  Icon,
  Button,
  Header
} from "native-base";
import axios from "axios";

import config from "../config";

export default class SignIn extends Component {
  state = {
    form: []
  };

  componentDidMount() {
    AsyncStorage.multiGet(["userToken", "role"], (err, result) => {
      //   alert(JSON.stringify(result));
      if (result[0][1]) {
        if (result[1][1] == "lapangan") {
          this.props.navigation.navigate("FieldHome");
        } else if (result[1][1] == "cs") {
          this.props.navigation.navigate("CsHome");
        }
      }
    });
  }

  handleSignIn() {
    axios
      .post(`${config.uri}/users/login`, this.state.form)
      .then(result => {
        AsyncStorage.multiSet([
          ["userToken", result.data["user-token"]],
          ["objectId", result.data.objectId],
          ["role", result.data.role]
        ]);
        if (result.data.role === "lapangan") {
          this.props.navigation.navigate("FieldHome");
        } else if (result.data.role === "cs") {
          this.props.navigation.navigate("CsHome");
        }
      })
      .catch(e => alert(e));
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.row}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
          <KeyboardAvoidingView>
            <Form style={styles.input}>
              <Item>
                <Icon name="mail" style={styles.icons} />
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={login =>
                    this.setState({ form: { ...this.state.form, login } })
                  }
                />
              </Item>
              <Item last>
                <Icon name="lock" style={styles.icons} />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={password =>
                    this.setState({ form: { ...this.state.form, password } })
                  }
                />
              </Item>
              <Button
                full
                style={styles.btnLogin}
                onPress={() => this.handleSignIn()}
              >
                <Text style={{ color: "#fff" }}>Login</Text>
              </Button>
              <Button
                transparent
                full
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text>Dont account? Register</Text>
              </Button>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  input: {
    marginTop: 50,
    padding: 20
  },
  icons: {
    color: "#595959"
  },
  logo: {
    height: 150,
    resizeMode: "contain",
    width: 300
  },
  btnLogin: {
    backgroundColor: "#dd5453",
    marginTop: 30
  },
  error: {
    borderWidth: 2,
    borderColor: "red"
  }
});
