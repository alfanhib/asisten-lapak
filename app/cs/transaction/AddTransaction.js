import React, { Component } from "react";
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
  List,
  Thumbnail
} from "native-base";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import Modal from "react-native-modal";

import Footer from "../../../components/Footer";
import config from "../../../config";

export default class AddTransaction extends Component {


  state = {
    selectedTypeShipping: "",
    selectedTypePacking: "",

    finalDS: "",

    deliveryServices: [],

    itemsPacking: [
      {
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

    data: {},
    orderData: {},

    visibleModal: false,
    selectedName: null,
    storeObjectId: "",

    visibleModalProduct: false,
    selectedNameProduct: null,
    productObjectId: "",

    selected1: "key1",

    stores: [],
    products: [],

    productPrice: "",
    productId: "",
    transactionId: ""
  };

  allDeliveryServices() {
    axios
      .get(
        `${
        config.uri
        }/data/delivery_services?pageSize=100&sortBy=created%20desc`
      )
      .then(result => {
        this.setState({
          deliveryServices: result.data
        });
      });
  }

  allStores() {
    axios.get(`${config.uri}/data/stores?sortBy=name%20desc`).then(result => {
      this.getProducts();
      this.setState({
        stores: result.data
      })
    })
  }

  getProducts(storeObjectId_) {
    axios.get(`${config.uri}/data/products?where=store.objectId%20%3D%20'${storeObjectId_}'`).then(result => {
      this.setState({
        products: result.data
      });
    }).catch((e) => {
      alert(e.response.data.message)
    });
  }

  handleSubmit() {
    const storeRelation = [this.state.storeObjectId];

    const typeOfShipp = [this.state.finalDS];

    const productRelation = [this.state.productId];

    const transactionRelation = [this.state.transactionId];

    axios.post(`${config.uri}/data/transactions`, this.state.data).then(result => {
      if (result.data) {
        axios.post(`${config.uri}/data/transactions/${result.data.objectId}/typeOfShipping:delivery_services:1`, typeOfShipp).then(resultTypeShipp => {
          if (resultTypeShipp.data) {
            axios.post(`${config.uri}/data/transactions/${result.data.objectId}/storeId:stores:1`, storeRelation).then(storeResult => {
              if (storeResult.data) {
                axios.post(`${config.uri}/data/orders`, this.state.orderData).then(resultOrder => {
                  if (resultOrder.data) {
                    axios.post(`${config.uri}/data/orders/${resultOrder.data.objectId}/productId:products:1`, productRelation).then(productResult => {
                      if (productResult.data) {
                        axios.post(`${config.uri}/data/orders/${resultOrder.data.objectId}/transactionId:transactions:1`, [String(result.data.objectId)]).then(transactionResult => {
                          if (transactionResult.data) {
                            Alert.alert(
                              '',
                              'Success!',
                              [
                                { text: 'OK', onPress: () => this.props.navigation.goBack() },
                              ],
                              { cancelable: false }
                            )
                          }
                        }).catch((e) => {
                          alert(e.response.data.message)
                        });
                      }
                    }).catch((e) => {
                      alert(e.response.data.message)
                    });
                  }
                }).catch((e) => {
                  alert(e.response.data.message)
                });
              }
            }).catch((e) => {
              alert(e.response.data.message)
            });
          }
        }).catch((e) => {
          alert(e.response.data.message)
        });
      }
    }).catch((e) => {
      alert(e.response.data.message)
    });


  }

  checkRadioShipping(name, id) {
    this.setState({
      selectedTypeShipping: name,
      radioShiping: id,
      finalDS: id
    });
  }

  checkRadioPacking(typeOfPacking, id) {
    this.setState({
      selectedTypePacking: typeOfPacking,
      radioPacking: id,
      data: { ...this.state.data, typeOfPacking }
    });
  }

  componentDidMount() {
    this.allDeliveryServices();
    this.allStores();
    this.setState({
      data: { ...this.state.data, status: "pending", deadlineDate: new Date() }
    })


  }

  getProductsFromStore(name, objectId) {
    this.setState({
      selectedName: name,
      storeObjectId: objectId,
      visibleModal: false
    });

    this.getProducts(objectId);
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  render() {
    return (
      <Container>
        <Content padder style={{ backgroundColor: "white" }}>
          <Form>
            <Label style={styles.upperLimit}>Pilih toko </Label>
            <List style={{ marginLeft: -30 }}>
              <ListItem onPress={() => this.setState({ visibleModal: true })}>
                <Body>
                  {this.state.selectedName === null ? (
                    <Text>Please Select Store</Text>
                  ) : (
                      <Text>{this.state.selectedName}</Text>
                    )}
                </Body>
                <Right>
                  <Icon name="arrow-dropdown" />
                </Right>
              </ListItem>
            </List>
            <Modal isVisible={this.state.visibleModal}>
              <View style={styles.modalContent}>
                <List>
                  {this.state.stores.length == 0 ? (
                    <View>
                      <Text style={{ textAlign: "center" }}>Store is not available</Text>
                    </View>
                  ) : this.state.stores.map(store => {
                    return (
                      <ListItem
                        key={store.objectId}
                        onPress={() => this.getProductsFromStore(store.name, store.objectId)}
                      >
                        <Thumbnail
                          square
                          size={5}
                          source={{ uri: store.logo }}
                          style={{ marginRight: 20 }}
                        />
                        <Body>
                          <Text>{store.name}</Text>
                          <Text note>{store.address}</Text>
                          <Text note>{store.description}</Text>
                        </Body>
                      </ListItem>
                    );
                  })}
                </List>
                <Button
                  style={styles.button}
                  onPress={() => this.setState({ visibleModal: false })}
                >
                  <Text>Close</Text>
                </Button>
              </View>
            </Modal>
            <Label style={styles.upperLimit}>Produk Pesanan</Label>
            {/* <Input
                onChangeText={orderProduct =>
                  this.setState({ data: { ...this.state.data, orderProduct } })
                }
              /> */}

            <List style={{ marginLeft: -30 }}>
              <ListItem onPress={() => this.setState({ visibleModalProduct: true })}>
                <Body>
                  {this.state.selectedNameProduct === null ? (
                    <Text>Please Select Product</Text>
                  ) : (
                      <Text>{this.state.selectedNameProduct}</Text>
                    )}
                </Body>
                <Right>
                  <Icon name="arrow-dropdown" />
                </Right>
              </ListItem>
            </List>
            <Modal isVisible={this.state.visibleModalProduct}>
              <View style={styles.modalContent}>
                <List>
                  {this.state.products.length == 0 ? (
                    <View>
                      <Text style={{ textAlign: "center" }}>Product is not available</Text>
                    </View>
                  ) : this.state.products.map(product => {
                    return (

                      <ListItem
                        key={product.objectId}
                        onPress={() =>
                          this.setState({
                            selectedNameProduct: product.name,
                            productObjectId: product.objectId,
                            visibleModalProduct: false,
                            productPrice: product.price,
                            productId: product.objectId,
                            data: { ...this.state.data, orderProduct: product.name },
                            orderData: { ...this.state.orderData, price: Number(product.price) }
                          })
                        }
                      >
                        <Thumbnail
                          square
                          size={5}
                          source={{ uri: product.image }}
                          style={{ marginRight: 20 }}
                        />
                        <Body>
                          <Text>{product.name}</Text>
                          <Text note>{product.address}</Text>
                          <Text note>{product.description}</Text>
                        </Body>
                      </ListItem>
                    );
                  })}
                </List>
                <Button
                  style={styles.button}
                  onPress={() => this.setState({ visibleModalProduct: false })}
                >
                  <Text>Close</Text>
                </Button>
              </View>
            </Modal>

            <Label style={styles.upperLimit}>Stock Availability</Label>
            <Item regular>
              <Input
                onChangeText={stockAvailability =>
                  this.setState({
                    data: { ...this.state.data, stockAvailability, total: this.state.productPrice * stockAvailability },
                    orderData: { ...this.state.orderData, qty: Number(stockAvailability) }
                  })
                }
                keyboardType="numeric"
              />
            </Item>

            <Label style={styles.upperLimit}>Special Request</Label>
            <Item regular>
              <Input
                onChangeText={specialRequest =>
                  this.setState({
                    data: { ...this.state.data, specialRequest }
                  })
                }
              />
            </Item>

            <Label style={styles.upperLimit}>Order Number</Label>
            <Item regular>
              <Input
                onChangeText={orderNumber =>
                  this.setState({ data: { ...this.state.data, orderNumber: Number(orderNumber) } })
                }
                keyboardType="numeric"
              />
            </Item>

            <Label style={styles.upperLimit}>Type of Shipping</Label>

            {this.state.deliveryServices.map(item => {
              return (
                <ListItem key={item.objectId} style={styles.items}>
                  <Radio
                    selected={
                      item.name == this.state.selectedTypeShipping
                        ? true
                        : false
                    }
                    onPress={() =>
                      this.checkRadioShipping(item.name, item.objectId)
                    }
                  />
                  <Body>
                    <Label style={styles.labelSelect}>{item.name}</Label>
                  </Body>
                </ListItem>
              );
            })}

            <Label style={styles.upperLimit}>Type of Packing</Label>

            {this.state.itemsPacking.map((item, index) => {
              return (
                <ListItem key={item.name} style={styles.items}>
                  <Radio
                    selected={
                      item.name == this.state.selectedTypePacking ? true : false
                    }
                    onPress={() => this.checkRadioPacking(item.name, item.id)}
                  />
                  <Body>
                    <Label style={styles.labelSelect}>{item.name}</Label>
                  </Body>
                </ListItem>
              );
            })}

            <Label style={styles.upperLimit}>Name of Customer</Label>
            <Item regular>
              <Input
                onChangeText={name =>
                  this.setState({ data: { ...this.state.data, name } })
                }
              />
            </Item>

            <Label style={styles.upperLimit}>Customer Phone Number</Label>
            <Item regular>
              <Input
                onChangeText={mobile_phone =>
                  this.setState({ data: { ...this.state.data, mobile_phone } })
                }
                keyboardType="numeric"
              />
            </Item>

            <Label style={styles.upperLimit}>Customer Address</Label>
            <Textarea
              rowSpan={5}
              bordered
              onChangeText={address =>
                this.setState({ data: { ...this.state.data, address } })
              }
            />

            <Label style={styles.upperLimit}>Nearest Courier Location</Label>
            <Item regular>
              <Input
                onChangeText={nearestCourier =>
                  this.setState({
                    data: { ...this.state.data, nearestCourier }
                  })
                }
              />
            </Item>

            <ListItem>
              <Button
                block
                style={styles.submitBtn}
                onPress={() => this.handleSubmit()}
              >
                <Text>Kirim</Text>
              </Button>
            </ListItem>
          </Form>
        </Content>

        <Footer
          data={{
            activeTransaction: true,
            screenHome: () => this.props.navigation.navigate("CsHome"),
            screenSettings: () => this.props.navigation.navigate("CsSettings")
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#b4424b",
    flex: 1
  },

  upperLimit: {
    marginTop: 10
  },

  labelBtn: {
    marginLeft: 55
  },

  items: {
    marginLeft: -0.1
  },

  label: {
    margin: 20
  },

  fileChooser: {
    color: "#156af2",
    marginLeft: -17
  },

  labelSelect: {
    marginLeft: 20
  },

  mainColor: {
    backgroundColor: "#dd5453"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },

  button: {
    margin: 10,
    width: "60%",
    backgroundColor: "#b4424b",
    alignSelf: "center",
    justifyContent: "center"
  },
});
