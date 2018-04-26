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
    Footer,
    Body,
    Title,
    ListItem, 
    CheckBox,
    Radio,
    Right,
    Left,
    Picker,
    Icon,
    FooterTab,
    List
} from 'native-base'
import { StyleSheet, View, TouchableOpacity, StatusBar, Image, PixelRatio, AppRegistry } from 'react-native';

import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

const uri = "https://api.backendless.com/A54546E5-6846-C9D4-FFAD-EFA9CB9E8A00/241A72A5-2C8A-1DB8-FFAF-0F46BA4A8100";

export default class TambahLapakToko extends Component{

    state = {
        selectedIsNew: "",
        selectedPreOrder: "",
        imageSource: null,

        items_isNew: [{
            id: 1,
            name: "Baru",
            value: true
        },
        {
            id: 2,
            name: "Bekas",
            value: false
        },
        ],

        items_preOrder: [{
            id: 1,
            name: "Ya",
            value: true
        },
        {
            id: 2,
            name: "Tidak",
            value: false
        },
        ],

        data: {}
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
  
              imageSource: source
  
            });

            const data = new FormData();
            data.append("photo", {
                uri: source.uri,
                type: "image/jpeg",
                name: "Photo"
            });
            fetch(`${uri}/files/images/logoProduct.png?overwrite=true`, {
                method: "post",
                body: data
            }).then(result => {
                this.setState({
                    data: {...this.state.data, image: result.url}
                })
            })
          }
        });
      }

    checkIsNew(name, is_new){
        this.setState({
            selectedIsNew: name,
            data: {...this.state.data, is_new}
        })
    }

    checkIsPreOrder(name, is_preorder){
        this.setState({
            selectedPreOrder: name,
            data: {...this.state.data, is_preorder}
        })
    }

    allProduct(){
        axios.get(`${uri}/data/products?sortBy=created%20desc`).then(result => {
            this.setState({
                data: result.data
            })
        })
    }

    handleSubmit(){ 
        const data = {
            ...this.state.data, 
            price: Number(this.state.data.price),
            weight: Number(this.state.data.weight),
            processing_days: Number(this.state.data.processing_days)
        }

        // const dataRelationADS = [
            //Get objectID from available_delivery_services, then use it in parameter 2 at axios.post avalibale_delivery_services 
        // ],

        // const dataRelationStores = [
            //GET objectID from stores, then user it in parameter 2 at axios.post store
        // ]

        // alert(JSON.stringify(data));

        axios.post(`${uri}/data/products`, data).then(result => {
            if(result.data){
                alert("Succes!")
            }
        })

        //Use this when object dataRelationASD and dataRelationStore is ready
        // axios.post(`${uri}/data/products`, data).then(result => {
        //     if(result.data){
        //         axios.post(`${uri}/data/products/${result.data.objectId}/available_delivery_services:delivery_services:n`).then(result2 => {
        //             if(result2.data){
        //                 axios.post(`${uri}/data/products/${result.data.objectId}/store:stores:1`).then(result3 => {
        //                     if(result3.data){
        //                         this.allProduct(),
        //                         alert("Succes!")
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // })

    }

    render(){
        return(
            <Container>
                <Header style={styles.mainColor} androidStatusBarColor="#b4424b">
                    <Body>
                        <Title>
                            Tambah Lapak
                        </Title>
                    </Body>
                </Header>

                <Content padder>
                <Form>
                    <Label style={styles.upperLimit}>Nama Produk (max 70 karakter)</Label>
                    <Item regular>
                        <Input onChangeText={(name) => this.setState({data: {...this.state.data, name}})}/>
                    </Item>

                    <Label style={styles.upperLimit}>Gambar Produk</Label>
                        
                        { this.state.imageSource === null ? (
                            <Button transparent onPress={ this.selectPhotoTapped.bind(this)}>
                                <Text style={styles.fileChooser}>TAMBAHKAN FOTO</Text>
                            </Button>
                        )
                        :
                        (
                        <View>
                            <View>
                            <Button transparent onPress={ this.selectPhotoTapped.bind(this)}>
                                <Text style={styles.fileChooser}>GANTI FOTO</Text>
                            </Button>
                            </View>
                            <View
                                style={[
                                styles.avatar,
                                styles.avatarContainer,
                                { marginBottom: 20 }
                                ]}
                            >
                                <Image style={styles.avatar} source={this.state.imageSource} />
                            </View>
                        </View>
                        )
                        }

                    <Label style={styles.upperLimit}>Harga</Label>
                    <Item regular>
                        <Input onChangeText={(price) => this.setState({ data: {...this.state.data, price}})} keyboardType = 'numeric'/>
                    </Item>

                    <Label style={styles.upperLimit}>Pemesanan minimun/buah</Label>
                    <Item regular>
                        <Input keyboardType = 'numeric'/>
                    </Item>

                    <Label style={styles.upperLimit}>Kondisi</Label>
                    
                    {this.state.items_isNew.map((item, index)=> {
                        return(
                            <ListItem key={item.id} style={styles.items}>
                                <Radio selected = {item.name == this.state.selectedIsNew ? true : false} onPress={()=> this.checkIsNew(item.name, item.value)} />
                                <Body>
                                <Label style={styles.labelSelect}>{item.name}</Label>
                                </Body>
                            </ListItem>
                        )
                    } )}

                    <Label style={styles.upperLimit}>Deskripsi Produk</Label>
                    <Textarea rowSpan={5} bordered onChangeText={(description) => this.setState({data: {...this.state.data, description}})}/>

                    <Label style={styles.upperLimit}>Berat (kg)</Label>
                    <Item regular>
                        <Input onChangeText={(weight) => this.setState({data: {...this.state.data, weight}})} keyboardType = 'numeric'/>
                    </Item>

                    <Label style={styles.upperLimit}>Aktifkan preorder untuk waktu proses produksi yang lebih lama</Label>

                    {this.state.items_preOrder.map((item, index)=> {
                        return(
                            <ListItem key={item.id} style={styles.items}>
                                <Radio selected = {item.name == this.state.selectedPreOrder ? true : false} onPress={()=> this.checkIsPreOrder(item.name, item.value)} />
                                <Body>
                                <Label style={styles.labelSelect}>{item.name}</Label>
                                </Body>
                            </ListItem>
                        )
                    } )}

                    <Label style={styles.upperLimit}>Waktu Proses (wajib diisi untuk mengetahui lama produk diproses)</Label>
                    <Item regular>
                        <Input onChangeText={(processing_days) => this.setState({data: {...this.state.data, processing_days}})} keyboardType = 'numeric'/>
                    </Item>

                    <ListItem style={{alignSelf:'center', justifyContent:'center'}}>
                        <Button block style={styles.submitBtn} onPress={()=> this.handleSubmit()}>
                            <Text>Submit</Text>
                        </Button>
                    </ListItem>
                </Form>
                </Content>

                <Footer style={styles.mainColor}>
                    <FooterTab style={styles.mainColor}>
                        <Button >
                            <Icon name="home" />
                        </Button>
                        <Button>
                            <Icon name="cart" />
                        </Button>
                        <Button>
                            <Icon name="settings" />
                        </Button>
                    </FooterTab>
              </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    submitBtn:{
        flex: 1,
        backgroundColor: "#b4424b"
    },

    upperLimit:{
        marginTop: 10
    },

    labelBtn:{
        marginLeft: 55
    },

    labelSelect:{
        marginLeft: 20
    },

    label:{
        margin: 20
    },

    items:{
        marginLeft: -0.1
    },

    fileChooser:{
        color: '#156af2',
        marginLeft: -15
    },

    mainColor:{
        backgroundColor: '#dd5453'
    },

    avatarContainer: {
        borderColor: "#9B9B9B",
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center"
    }
})