import React, { Component } from "react";
import {
  StyleSheet,View,Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import {
  Container,Content,Text,
  Item,Form,Input,
  Icon,Button,Header,Spinner
} from "native-base";
import { connect } from 'react-redux'
import { loginUser } from '../actions/SignIn'


class SignIn extends Component {
  state = {
    form: [],
    loading: false
  };

  componentDidMount() {
    // alert(JSON.stringify("haloo"))
    AsyncStorage.multiGet(["userToken", "role"], (err, result) => {
      
      if (result[0][1]) {
        if (result[1][1] == "outdoor") {
          this.props.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            key: null,
            actions: [
              {
                type: 'Navigation/NAVIGATE',
                routeName: 'AssitantOutdoorMain'
              },
            ]
          })
        } else if (result[1][1] == "cs") {
          this.props.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            key: null,
            actions: [
              {
                type: 'Navigation/NAVIGATE',
                routeName: 'AssitantCSMain'
              },
            ]
          })
        }
      }
    });
  }

  handleSignIn() {

    this.props.dispatch(loginUser(this.state.form))
    
    .then( result => {
      AsyncStorage.multiSet([
        ["userToken", result.value.data["user-token"]],
        ["objectId", result.value.data.objectId],
        ["role", result.value.data.role]
      ]);
      alert(JSON.stringify(result))
      if(result.value.data.role === "outdoor"){
        this.props.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          key: null,
          actions: [
            {
              type: 'Navigation/NAVIGATE',
              routeName: 'AssitantOutdoorMain'
            },
          ]
        })
      }else if(result.value.data.role === "cs"){
        this.props.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          key: null,
          actions: [
            {
              type: 'Navigation/NAVIGATE',
              routeName: 'AssitantCSMain'
            },
          ]
        })
      }
    })

  }

  navigateToSignUp() {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'Signup'
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.row}>
            <Image
              source={require("../../../assets/images/logo.png")}
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
              
              {this.state.loading == true ? (<Spinner color='red'/>):null}
              {this.state.loading == false ?(
                <Button
                full
                style={styles.btnLogin}
                onPress={() => this.handleSignIn()}
                >
                <Text style={{ color: "#fff" }}>Login</Text>
              </Button>
              ):null}

              <Button
                transparent
                full
                onPress={()=>this.navigateToSignUp()}
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
const mapStateToProps = (state) => {
  return{
    loginReducer:state.loginReducer
  }
}


export default connect(mapStateToProps)(SignIn)

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
