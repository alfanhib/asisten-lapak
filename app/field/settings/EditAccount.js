import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native'
import { Container, View, Text, Form, Input, Content, Label, Item, Header, Button, Title, Body, Textarea } from 'native-base'

export default class EditAccount extends Component{
    render(){
        return(
            <Container>
                <Header androidStatusBarColor="#b4424b" style={{backgroundColor: '#dd5453'}} >
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                    </Header>
                <Content>
                    <View style={styles.row}>
                        <Image source={require('../images/logo.png')} style={styles.logo} />
                    </View>
                    <Form style={styles.form}>
                        <Label style={styles.lblForm}>Name :</Label>
                        <Item regular style={styles.itmUser}>
                            <Input placeholder="Rehan Choirul"/>
                        </Item>
                        <Label style={styles.lblForm}>Number Phone :</Label>
                        <Item regular style={styles.itmUser}>
                            <Input placeholder="08*********"/>
                        </Item>
                        <Label style={styles.lblForm}>Address :</Label>
                            <Textarea placeholder="Jl. dimana-mana" style={{marginBottom:5}} rowSpan={5} bordered />
                        <Button full style={styles.btnSave}>
                            <Text>
                                Save
                            </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}   

const styles = StyleSheet.create({
    logo:{
        height:100,
        width:100,
        borderRadius:100,
    },
    row:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
    },
    form:{
        padding:20
    },
    itmUser:{
        padding:5,
    },
    lblForm:{
        marginTop:10,
        padding:5,
        fontSize:20,
    },
    btnSave:{
        backgroundColor: '#b4424b'
    }
})