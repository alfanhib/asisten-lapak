import React, { Component } from 'react';
import { Container, Content, Label, View, Item, Icon, ListItem, Radio, Body, Form, Button, Text} from 'native-base'
import { Image, StyleSheet,  KeyboardAvoidingView} from 'react-native'
import { Field, reduxForm} from 'redux-form'

import TypeInput from '../../components/Input'

class FormSignUp extends Component{
    
    state = {

        dataUser:{},
        roleChoice:"",
        roleUser: [
            {
              id: 1,
              name: "outdoor",
            },
            {
              id: 2,
              name: "cs",
            }
          ],
      
    }

    getRole(name, role){
        this.setState({
            roleChoice: name,
            dataUser: { ...this.state.dataUser, role: name }
          });
    }

    render() {
      return (
        <Container>
                <Content>
                    <View style={styles.row}>
                        <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
                    </View>
                    <KeyboardAvoidingView>
                        <Form style={styles.input}>
                            <Item>
                                <Icon name="person" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="name"
                                    label="Name"
                                />
                            </Item>
                            <Item>
                                <Icon name="lock" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="password"
                                    label="Password"
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Item>
                                <Icon name="mail" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="email"
                                    label="E-Mail"
                                    keyboardType="email-address"
                                />
                            </Item>
                            <Item>
                                <Icon name="home" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="city"
                                    label="City"
                                />
                            </Item>
                            <Item>
                                <Field
                                    component={TypeInput}
                                    name="id_card_number"
                                    label="ID Card"
                                    keyboardType="numeric"
                                />
                            </Item>
                            <Item>
                                <Icon name="phone-portrait" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="mobile_phone"
                                    label="Phone Number"
                                />
                            </Item>
                            <Item>
                                <Icon name="code" style={styles.icons}/>
                                <Field
                                    component={TypeInput}
                                    name="postal_code"
                                    label="Postal Code"
                                />
                            </Item>
                            <Label>Status</Label>
                            {this.state.roleUser.map((role, index) => {
                                    return (
                                        <ListItem key={role.name} style={styles.items}>
                                            <Radio
                                                selected={
                                                    role.name == this.state.roleChoice ? true : false
                                                }
                                                onPress={() => this.getRole(role.name, role.value)}
                                            />
                                            <Body>
                                                <Label style={styles.labelSelect}>{role.name}</Label>
                                            </Body>
                                        </ListItem>
                                    );
                                })}
                            <Button full style={styles.btnSigUp} onPress={()=>this.handleRegister()}><Text>Sign Up</Text></Button>
                            <Button full transparent onPress={()=>this.navigateToSignIn()}><Text>Have an account ? Log In</Text></Button>
                        </Form>
                    </KeyboardAvoidingView>   
                </Content>
            </Container>   
      )
    }

}

export default reduxForm({
    form:'formSignUp'
  })(FormSignUp)

const styles=StyleSheet.create({
    logo:{
        height:150,
        width:300,
        resizeMode:'contain'
    },
    row:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    input:{
        marginTop:50,
        padding:20
    },
    icons:{
        color:'#595959'
    },
    btnSigUp:{
        backgroundColor:"#dd5453",
        marginTop:30  
    },
    error:{
        borderWidth:3,
        backgroundColor:'red'
    },
    items: {
        marginLeft: -0.1
    },
    labelSelect: {
        marginLeft: 20
      },
})