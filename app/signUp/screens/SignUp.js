import React, {Component} from 'react'
import {StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import { Content, Text, View, Header, 
        Container, Form, Item, Icon, 
        Input, Button, ListItem, 
        Label,Body, Radio } from 'native-base'
import {} from 'react-navigation'
import axios from 'axios'
import { connect } from 'react-redux'
import { postSignUp } from '../actions/signUp'

import FormSignUp from '../components/FormSignUp'


class SignUp extends Component{

    // state = {

    //     dataUser:{},
    //     roleChoice:"",
    //     roleUser: [
    //         {
    //           id: 1,
    //           name: "outdoor",
    //         },
    //         {
    //           id: 2,
    //           name: "cs",
    //         }
    //       ],
      
    // }

    // getRole(name, role){
    //     this.setState({
    //         roleChoice: name,
    //         dataUser: { ...this.state.dataUser, role: name }
    //       });
    // }

    handleRegister = () =>{
        this.props.dispatch(postSignUp(this.state.dataUser))
        .then( res => {
            this.props.dispatch({
                type:'Navigation/BACK'
            })
        })
        .catch( err => {
            alert('Error Cuy')
        })
    }

    navigateToSignIn(){
        this.props.dispatch({
            type:'Navigation/BACK'
        })
    }

    render(){
        return(

            <FormSignUp />
            // <Container>
            //     <Content>
            //         <View style={styles.row}>
            //             <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
            //         </View>
            //         <KeyboardAvoidingView>
            //             <Form style={styles.input}>
            //                 <Item>
            //                     <Icon name="person" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="Fullname"
            //                         onChangeText={name=>this.setState({dataUser:{...this.state.dataUser , name}})}
            //                     />
            //                 </Item>
            //                 <Item last>
            //                     <Icon name="lock" style={styles.icons}/>
            //                     <Input
            //                         secureTextEntry={true}
            //                         placeholder="Password" 
            //                         onChangeText={password=>this.setState({dataUser:{...this.state.dataUser, password}})}
            //                     />
            //                 </Item>
            //                 <Item>
            //                     <Icon name="mail" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="E-mail" 
            //                         keyboardType="email-address"
            //                         onChangeText=
            //                             {email=>this.setState({dataUser:{...this.state.dataUser, email}})}
            //                         />
            //                 </Item>
            //                 <Item>
            //                     <Icon name="home" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="City"
            //                         onChangeText={city=>this.setState({dataUser:{...this.state.dataUser, city}})}
            //                         />
            //                 </Item>
            //                 <Item>
            //                     <Icon name="card" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="ID Card"
            //                         keyboardType="numeric"
            //                         onChangeText={id_card_number=>this.setState({dataUser:{...this.state.dataUser, id_card_number}})}
            //                         />
            //                 </Item>
            //                 <Item>
            //                     <Icon name="phone-portrait" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="Phone Number" 
            //                         keyboardType="numeric"
            //                         onChangeText={mobile_phone=>this.setState({dataUser:{...this.state.dataUser, mobile_phone}})}
            //                         />
            //                 </Item>
            //                 <Item>
            //                     <Icon name="code" style={styles.icons}/>
            //                     <Input 
            //                         placeholder="Postal Code" 
            //                         keyboardType="numeric"
            //                         onChangeText={postal_code=>this.setState({dataUser:{...this.state.dataUser, postal_code}})}
            //                         />
            //                 </Item>
            //                 <Label>Status</Label>
            //                 {this.state.roleUser.map((role, index) => {
            //                         return (
            //                             <ListItem key={role.name} style={styles.items}>
            //                                 <Radio
            //                                     selected={
            //                                         role.name == this.state.roleChoice ? true : false
            //                                     }
            //                                     onPress={() => this.getRole(role.name, role.value)}
            //                                 />
            //                                 <Body>
            //                                     <Label style={styles.labelSelect}>{role.name}</Label>
            //                                 </Body>
            //                             </ListItem>
            //                         );
            //                     })}
            //                 <Button full style={styles.btnSigUp} onPress={()=>this.handleRegister()}><Text>Sign Up</Text></Button>
            //                 <Button full transparent onPress={()=>this.navigateToSignIn()}><Text>Have an account ? Log In</Text></Button>
            //             </Form>
            //         </KeyboardAvoidingView>   
            //     </Content>
            // </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        registerReducer: state.registerReducer
    }
}

export default connect(mapStateToProps)(SignUp)


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