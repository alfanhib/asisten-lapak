import React, { Component } from 'react';
import {
    Content,
    Text,
    Header,
    Container,
    Form,
    Item,
    Input,
    Textarea,
    Label,
    Button,
    Body,
    Title,
    ListItem, 
    CheckBox,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    List
} from 'native-base'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Footer from '../../../components/Footer'
import config from "../../../config";

const uri = "https://api.backendless.com/A54546E5-6846-C9D4-FFAD-EFA9CB9E8A00/241A72A5-2C8A-1DB8-FFAF-0F46BA4A8100/data"

export default class AddTransaction extends Component{

    state = {
        selectedTypeShipping: "",
        selectedTypePacking: "",

        finalDS: "",

        deliveryServices: [],
        
        itemsPacking: [{
            id: 1,
            name: "Electronic"
        },
        {
            id: 2,
            name: "Non Electronic"
        },
        {
            id: 3,
            name: "Other"
        }
        ],

        data:{}
    }

    allDeliveryServices(){
        axios.get(`${config.uri}/delivery_services?pageSize=100&offset=0&sortBy=created%20desc`).then(result => {
            this.setState({
                deliveryServices: result.data
            })
        })
    }

    handleSubmit(){

        const storeRelation = [
            //""
            //Get objectId from store, insert to parameter 2
        ]

        const typeOfShipp = [
            this.state.finalDS
        ]

        axios.post(`${config.uri}/transactions`, this.state.data).then(result => {
            if(result.data){
                axios.post(`${config.uri}/transactions/${result.data.objectId}/typeOfShipping:delivery_services:1`, typeOfShipp).then(result2 => {
                    alert("Success")
                })  
            }
        })

        //Use it when store objectId is ready
        // axios.post(`${uri}/transactions`, this.state.data).then(result => {
        //     if(result.data){
        //         axios.post(`${uri}/transactions/${result.objectId}/storeId:stores:1`).then(result2 => {
        //             if(result2.data){
        //                 axios.post(`${uri}/transactions/${result2.objectId}/typeOfShipping:delivery_services:1`, typeOfShipp).then(result => {
        //                     alert("Success")
        //                 })
        //             }
        //         })   
        //     }
        // })
    }

    checkRadioShipping(name, id){
        this.setState({
            selectedTypeShipping: name,
            radioShiping: id,
            finalDS: id
        })
    }

    checkRadioPacking(typeOfPacking, id){
        this.setState({
            selectedTypePacking: typeOfPacking,
            radioPacking: id,
            data: {...this.state.data, typeOfPacking}
        })
    }

    componentDidMount(){
        this.allDeliveryServices()
    }

    render(){
        return(
            <Container>
                <Content padder style={{backgroundColor:'white'}}>
                <Form>
                    <Label style={styles.upperLimit}>Produk Pesanan</Label>
                    <Item regular>
                        <Input onChangeText={(orderProduct) => this.setState({data: {...this.state.data, orderProduct}})}/>
                    </Item>

                    <Label style={styles.upperLimit}>Stock Availability</Label>
                    <Item regular>
                        <Input onChangeText={(stockAvailability) => this.setState({data: {...this.state.data, stockAvailability}})} keyboardType = 'numeric'/>
                    </Item>

                    <Label style={styles.upperLimit}>Special Request</Label>
                    <Item regular>
                        <Input onChangeText={(specialRequest) => this.setState({data:{...this.state.data, specialRequest}})}/>
                    </Item>
                    
                    <Label style={styles.upperLimit}>Order Number</Label>
                    <Item regular>
                        <Input onChangeText={(orderNumber) => this.setState({data:{...this.state.data, orderNumber}})} keyboardType = 'numeric'/>
                    </Item>
                    
                    <Label style={styles.upperLimit}>Type of Shipping</Label>

                    {this.state.deliveryServices.map((item) => {
                        return(
                            <ListItem key={item.objectId} style={styles.items}>
                                <Radio selected = {item.name == this.state.selectedTypeShipping ? true : false} onPress={()=> this.checkRadioShipping(item.name, item.objectId)} />
                                <Body>
                                    <Label style={styles.labelSelect}>{item.name}</Label>
                                </Body>
                            </ListItem>
                        )
                    })}

                    <Label style={styles.upperLimit}>Type of Packing</Label>
                    
                    {this.state.itemsPacking.map((item, index)=> {
                        return(
                            <ListItem key={item.name} style={styles.items}>
                                <Radio selected = {item.name == this.state.selectedTypePacking ? true : false} onPress={()=> this.checkRadioPacking(item.name, item.id)} />
                                <Body>
                                    <Label style={styles.labelSelect}>{item.name}</Label>
                                </Body>
                            </ListItem>
                        )
                    } )}

                    <Label style={styles.upperLimit}>Name of Customer</Label>
                    <Item regular>
                        <Input onChangeText={(name) => this.setState({data:{...this.state.data, name}})}/>
                    </Item>

                    <Label style={styles.upperLimit}>Customer Phone Number</Label>
                    <Item regular>
                        <Input onChangeText={(mobile_phone) => this.setState({data: {...this.state.data, mobile_phone}})} keyboardType = 'numeric'/>
                    </Item>

                    <Label style={styles.upperLimit}>Customer Address</Label>
                    <Textarea rowSpan={5} bordered onChangeText={(address) => this.setState({data: {...this.state.data, address}})}/>

                    <Label style={styles.upperLimit}>Nearest Courier Location</Label>
                    <Item regular>
                        <Input onChangeText={(nearestCourier) => this.setState({data: {...this.state.data, nearestCourier}})} />
                    </Item>
                    
                    <ListItem>
                        <Button block style={styles.submitBtn} onPress={()=> this.handleSubmit()}>
                            <Text>Kirim</Text>
                        </Button>
                    </ListItem>
                </Form>
                </Content>

              <Footer data={
                    {
                        activeTransaction: true,
                        screenHome: () => this.props.navigation.navigate('CsHome'),
                        screenSettings: () => this.props.navigation.navigate('CsSettings')
                    }
                } />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    submitBtn:{
        backgroundColor: "#b4424b",
        flex: 1
    },

    upperLimit:{
        marginTop: 10
    },

    labelBtn:{
        marginLeft: 55
    },

    items:{
        marginLeft: -0.1
    },

    label:{
        margin: 20
    },

    fileChooser:{
        color: '#156af2',
        marginLeft: -17
    },

    labelSelect:{
        marginLeft: 20
    },

    mainColor:{
        backgroundColor: '#dd5453'
    }
})

