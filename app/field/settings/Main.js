import React, { Component } from "react";
import { StyleSheet, AsyncStorage} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Footer,
  FooterTab,
  Button,
  Icon,
  View,
  Body,
  List,
  ListItem,
  Left,
  Right
} from "native-base";
import axios from 'axios'

import CustomFooter from "../../../components/Footer";

const uri = 'https://api.backendless.com/88269424-FF0F-6299-FFAD-98ED78564100/E87E9DE8-BEB5-B6A8-FF2F-758B1D210D00'


export default class Main extends Component {

  state={
    from:{}
  }

  handleLogout(){
    AsyncStorage.getItem('userToken',(err, result) =>{
      if(result){
        axios({
          method:"get",
          url: `${uri}/users/logout`,
          headers:{
            "user-token": result
          }
        }).then(Response=>{
          AsyncStorage.removeItem("userToken", err=>{
            if(!err){
              this.props.navigation.navigate("SignIn")
            }else{
              alert("Logout Gagal")
            }
          })
        })
      }
    })
  }
  render() {
    return (
      <Container>
        <Header hasTabs androidStatusBarColor="#b4424b" style={{backgroundColor: '#dd5453'}}>
          <Body>
            <Title>Setting</Title>
          </Body>
        </Header>
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
          full style={{ margin: 10, backgroundColor:'#b4424b' }} 
          onPress={()=>this.handleLogout()}
        >
          <Text> Logout </Text>
        </Button>
        <CustomFooter
          footer={{
            activeSettings: true,
            screenHome: () => this.props.navigation.navigate("FieldHome"),
            screenCart: () => this.props.navigation.navigate("FieldCart")
          }}
        />
      </Container>
    );
  }
}
