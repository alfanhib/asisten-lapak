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
  Thumbnail,
  Spinner
} from "native-base";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  PixelRatio,
  AppRegistry,
  Alert,
  ScrollView
} from "react-native";
import axios from "axios";
import ImagePicker from "react-native-image-picker";
import Modal from "react-native-modal";
import moment from "moment";

import Footer from "../../../components/Footer";
import config from "../../../config";

export default class CsAddStore extends Component {
  state = {
    loading: true,
    selectedStatus: "",
    imageSource: null,

    visibleModal: false,
    selectedName: null,
    userObjectId: "",

    users: [],

    typesCategory: [],

    check: [],
    checkk: [],

    productStatus: [
      {
        id: 1,
        name: "Selalu Tersedia"
      },
      {
        id: 2,
        name: "Stock Terbatas"
      },
      {
        id: 3,
        name: "Stock Kosong"
      }
    ],

    // marketName: "",
    // slogan: "",
    // description: "",
    // fullAddress: "",
    // city: "",
    // postCode: "",
    // website: "",
    // phone: "",
    // email: "",
    // bankName: "",
    // radio1: "",

    data: {},
    deliveryServices: [],

    delivery_services: [],
    objectIdCategories: [],

    asCategories: [],
    getCheckName: [],

    check1: [],
    check2: []
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      fileName: if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        let str = response.fileName;
        let fileName = str.split(".");

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
        fetch(
          `${config.uri}/files/images/${moment().format("X")}.${fileName[1]}`,
          {
            method: "post",
            body: data
          }
        ).then(result => {
          this.setState({
            data: { ...this.state.data, logo: result.url }
          });
        });
      }
    });
  }

  getAllCS() {
    axios
      .get(`${config.uri}/data/Users?where=role%20%3D%20'cs'`)
      .then(result => {
        this.setState({ users: result.data, loading: false });
      });
  }

  getAllCategoryTypes() {
    axios
      .get(
        `${
          config.uri
        }/data/category_types?pageSize=100&offset=0&sortBy=created%20desc`
      )
      .then(result => {
        this.setState({ typesCategory: result.data, loading: false });
      });
  }

  radioProductStts(name, id) {
    this.setState({
      selectedStatus: name,
      radio1: id
    });
  }

  addCheckCategories(set) {
    if (!this.state.check.includes(set)) {
      getCheck = this.state.check;
      getCheck.push(set);
      this.setState({
        check: getCheck,
        check1: getCheck,
        objectIdCategories: getCheck
      });
    } else {
      geCheck = this.state.check;
      geCheck = geCheck.filter(item => item !== set);
      this.setState({
        check: geCheck,
        objectIdCategories: geCheck
      });
    }
  }

  addCheckDeliveryServices(set) {
    if (!this.state.checkk.includes(set)) {
      getCheck = this.state.checkk;
      getCheck.push(set);
      this.setState({
        checkk: getCheck,
        check2: getCheck,
        delivery_services: getCheck
      });
    } else {
      geCheck = this.state.checkk;
      geCheck = geCheck.filter(item => item !== set);
      this.setState({
        checkk: geCheck,
        delivery_services: geCheck
      });
    }
  }

  allDeliveryServices() {
    axios
      .get(
        `${
          config.uri
        }/data/delivery_services?pageSize=100&offset=0&sortBy=created%20desc`
      )
      .then(result => {
        this.setState({
          deliveryServices: result.data,
          loading: false
        });
      });
  }

  _handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  _handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  handleSubmit() {
    const assistantRelation = [this.state.userObjectId];
    const deliveryRelation = this.state.delivery_services;
    const categoryRelation = this.state.objectIdCategories;

    // axios.post(`${uri}/data/stores`, this.state.data).then(result => {
    //     if(result.data){
    //         alert("Succes!")
    //     }
    // })

    //Use this if yout assistant object id is ready
    axios
      .post(`${config.uri}/data/stores`, this.state.data)
      .then(result => {
        if (result.data) {
          axios
            .post(
              `${config.uri}/data/stores/${
                result.data.objectId
              }/assistant_cs:Users:1`,
              assistantRelation
            )
            .then(assistantResult => {
              if (assistantResult.data) {
                axios
                  .post(
                    `${config.uri}/data/stores/${
                      result.data.objectId
                    }/available_delivery_services:delivery_services:n`,
                    deliveryRelation
                  )
                  .then(deliveryResult => {
                    if (deliveryResult.data) {
                      axios
                        .post(
                          `${config.uri}/data/stores/${
                            result.data.objectId
                          }/categories:category_types:n`,
                          categoryRelation
                        )
                        .then(categoriesResult => {
                          if (categoriesResult.data) {
                            Alert.alert(
                              "",
                              "Success!",
                              [
                                {
                                  text: "OK",
                                  onPress: () => this.props.navigation.goBack()
                                }
                              ],
                              { cancelable: false }
                            );
                          }
                        })
                        .catch(e => {
                          alert(e.response.data.message);
                        });
                    }
                  })
                  .catch(e => {
                    alert(e.response.data.message);
                  });
              }
            })
            .catch(e => {
              alert(e.response.data.message);
            });
        }
      })
      .catch(e => {
        alert(e.response.data.message);
      });
  }

  componentDidMount() {
    this.allDeliveryServices(),
      this.setState({
        data: { ...this.state.data, status: "Pending" }
      });
    this.getAllCS();
    this.getAllCategoryTypes();
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.state.loading == true ? (
            <Spinner color="red" />
          ) : (
            <Form>
              <Label style={styles.upperLimit}>Nama Customer Lapak </Label>
              <List style={{ marginLeft: -30 }}>
                <ListItem onPress={() => this.setState({ visibleModal: true })}>
                  <Body>
                    {this.state.selectedName === null ? (
                      <Text>Please Select Customer</Text>
                    ) : (
                      <Text>{this.state.selectedName}</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon name="arrow-dropdown" />
                  </Right>
                </ListItem>
              </List>
              <Modal
                isVisible={this.state.visibleModal}
                onSwipe={() => this.setState({ visibleModal: null })}
                swipeDirection="down"
                scrollTo={this._handleScrollTo}
                scrollOffset={this.state.scrollOffset}
                scrollOffsetMax={400 - 300}
              >
                <View style={styles.modalContent}>
                  <ScrollView
                    ref={ref => (this.scrollViewRef = ref)}
                    onScroll={this._handleOnScroll}
                    scrollEventThrottle={16}
                  >
                    <List>
                      {this.state.users.map(user => {
                        return (
                          <ListItem
                            key={user.objectId}
                            onPress={() =>
                              this.setState({
                                selectedName: user.name,
                                userObjectId: user.objectId,
                                visibleModal: false
                              })
                            }
                          >
                            <Thumbnail
                              square
                              size={5}
                              source={{ uri: user.photo }}
                              style={{ marginRight: 20 }}
                            />
                            <Body>
                              <Text>{user.name}</Text>
                              <Text note>{user.email}</Text>
                              <Text note>{user.mobile_phone}</Text>
                            </Body>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ScrollView>
                  <Button
                    style={styles.button}
                    onPress={() => this.setState({ visibleModal: false })}
                  >
                    <Text>Close</Text>
                  </Button>
                </View>
              </Modal>
              <Label>Nama Toko</Label>
              <Item regular>
                <Input
                  onChangeText={name =>
                    this.setState({ data: { ...this.state.data, name } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Slogan</Label>
              <Item regular>
                <Input
                  onChangeText={slogan =>
                    this.setState({ data: { ...this.state.data, slogan } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Logo Toko</Label>

              {this.state.imageSource === null ? (
                <Button transparent onPress={this.selectPhotoTapped.bind(this)}>
                  <Text style={styles.fileChooser}>TAMBAHKAN FOTO</Text>
                </Button>
              ) : (
                <View>
                  <View>
                    <Button
                      transparent
                      onPress={this.selectPhotoTapped.bind(this)}
                    >
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
                    <Image
                      style={styles.avatar}
                      source={this.state.imageSource}
                    />
                  </View>
                </View>
              )}

              <Label style={styles.upperLimit}>Deskripsi</Label>
              <Textarea
                rowSpan={5}
                bordered
                onChangeText={description =>
                  this.setState({ data: { ...this.state.data, description } })
                }
              />

              <Label style={styles.upperLimit}>Alamat Lengkap</Label>
              <Textarea
                rowSpan={5}
                bordered
                onChangeText={address =>
                  this.setState({ data: { ...this.state.data, address } })
                }
              />

              <Label style={styles.upperLimit}>Kota</Label>
              <Item regular>
                <Input
                  onChangeText={city =>
                    this.setState({ data: { ...this.state.data, city } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Kode Pos</Label>
              <Item regular>
                <Input
                  onChangeText={postal_code =>
                    this.setState({ data: { ...this.state.data, postal_code } })
                  }
                  keyboardType="numeric"
                />
              </Item>

              <Label style={styles.upperLimit}>Situs Web</Label>
              <Item regular>
                <Input
                  onChangeText={website =>
                    this.setState({ data: { ...this.state.data, website } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>No Telp</Label>
              <Item regular>
                <Input
                  onChangeText={mobile_phone =>
                    this.setState({
                      data: { ...this.state.data, mobile_phone }
                    })
                  }
                  keyboardType="numeric"
                />
              </Item>

              <Label style={styles.upperLimit}>Alamat Email</Label>
              <Item regular>
                <Input
                  onChangeText={email =>
                    this.setState({ data: { ...this.state.data, email } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Nama Bank</Label>
              <Item regular>
                <Input
                  onChangeText={bank =>
                    this.setState({ data: { ...this.state.data, bank } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Nomor Rekening</Label>
              <Item regular>
                <Input
                  onChangeText={bank_account =>
                    this.setState({
                      data: { ...this.state.data, bank_account }
                    })
                  }
                  keyboardType="numeric"
                />
              </Item>

              <Label style={styles.upperLimit}>Nama Pemilik Akun Bank</Label>
              <Item regular>
                <Input
                  onChangeText={bank_account_owner =>
                    this.setState({
                      data: { ...this.state.data, bank_account_owner }
                    })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Jenis barang (Kategori)</Label>

              {this.state.typesCategory.map(item => {
                return (
                  <ListItem key={item.objectId} style={styles.items}>
                    <CheckBox
                      onPress={() => this.addCheckCategories(item.objectId)}
                      checked={
                        this.state.check.includes(item.objectId) ? true : false
                      }
                      color="#dd5453"
                    />
                    <Body>
                      <Label style={styles.labelSelect}>{item.name}</Label>
                    </Body>
                  </ListItem>
                );
              })}

              {/* {this.state.check.map((check, key) => (
                            <Text key={key}>{check}</Text>
                        ))} */}

              <Label style={styles.upperLimit}>Status Produk (Kategori)</Label>

              {this.state.productStatus.map((item, index) => {
                return (
                  <ListItem key={item.id} style={styles.items}>
                    <Radio
                      selected={
                        item.name == this.state.selectedStatus ? true : false
                      }
                      onPress={() => this.radioProductStts(item.name, item.id)}
                    />
                    <Body>
                      <Label style={styles.labelSelect}>{item.name}</Label>
                    </Body>
                  </ListItem>
                );
              })}

              <Label style={styles.upperLimit}>Jasa Pengiriman</Label>

              {this.state.deliveryServices.map(item => {
                return (
                  <ListItem key={item.objectId} style={styles.items}>
                    <CheckBox
                      onPress={() =>
                        this.addCheckDeliveryServices(item.objectId)
                      }
                      checked={
                        this.state.checkk.includes(item.objectId) ? true : false
                      }
                      color="#dd5453"
                    />
                    <Body>
                      <Label style={styles.labelSelect}>{item.name}</Label>
                    </Body>
                  </ListItem>
                );
              })}

              <ListItem
                style={{ alignSelf: "center", justifyContent: "center" }}
              >
                <Button
                  block
                  style={styles.submitBtn}
                  onPress={() => this.handleSubmit()}
                >
                  <Text>Submit</Text>
                </Button>
              </ListItem>
            </Form>
          )}
        </Content>

        <Footer
          data={{
            activeHome: true,
            screenTransaction: () =>
              this.props.navigation.navigate("FieldTransaction"),
            screenSettings: () =>
              this.props.navigation.navigate("FieldSettings")
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  submitBtn: {
    flex: 1,
    backgroundColor: "#b4424b"
  },

  upperLimit: {
    marginTop: 10
  },

  labelBtn: {
    marginLeft: 55
  },

  labelSelect: {
    marginLeft: 20
  },

  label: {
    margin: 20
  },

  items: {
    marginLeft: -0.1
  },

  fileChooser: {
    color: "#156af2",
    marginLeft: -15
  },

  mainColor: {
    backgroundColor: "#dd5453"
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
  }
});
