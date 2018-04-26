import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  NativeModules,
  Alert,
  PixelRatio,
  Image
} from "react-native";
import {
  Content,
  Header,
  Form,
  Item,
  FooterTab,
  Text,
  Container,
  Input,
  Textarea,
  List,
  ListItem,
  Label,
  Button,
  Body,
  Title,
  Right,
  Left,
  Picker,
  Icon,
  Thumbnail,
  CheckBox,
  Radio
} from "native-base";
import axios from "axios";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";

import Footer from "../../../components/Footer";

const uri =
  "https://api.backendless.com/A54546E5-6846-C9D4-FFAD-EFA9CB9E8A00/241A72A5-2C8A-1DB8-FFAF-0F46BA4A8100";

export default class CsAddStore extends Component {
  state = {
    selectedStatus: "",
    imageSource: null,

    typesCategory: [
      {
        id: 1,
        name: "Fashion Wanita"
      },
      {
        id: 2,
        name: "Fashion Pria"
      },
      {
        id: 3,
        name: "Fashion Muslim"
      },
      {
        id: 4,
        name: "Fashion Anak"
      },
      {
        id: 5,
        name: "Handphone dan Tablet"
      },
      {
        id: 6,
        name: "Elektronik"
      },
      {
        id: 7,
        name: "Kecantikan"
      },
      {
        id: 8,
        name: "Kesehatan"
      },
      {
        id: 9,
        name: "Ibu dan bayi"
      },
      {
        id: 10,
        name: "Perawatan tubuh"
      },
      {
        id: 11,
        name: "Rumah Tangga"
      },
      {
        id: 12,
        name: "Gaming"
      },
      {
        id: 13,
        name: "Laptop dan Aksesoris"
      },
      {
        id: 14,
        name: "Komputer dan Aksesoris"
      },
      {
        id: 15,
        name: "Kamera"
      },
      {
        id: 16,
        name: "Otomotif"
      },
      {
        id: 17,
        name: "Olahraga"
      },
      {
        id: 18,
        name: "Film dan Musik"
      },
      {
        id: 19,
        name: "Dapur"
      },
      {
        id: 20,
        name: "Office dan Stationeri"
      },
      {
        id: 21,
        name: "Sofenir dan Kado"
      },
      {
        id: 22,
        name: "Mainan dan Hobi"
      },
      {
        id: 23,
        name: "Makanan dan Minuman"
      },
      {
        id: 24,
        name: "Buku"
      },
      {
        id: 25,
        name: "Software"
      },
      {
        id: 26,
        name: "Produk Lainya"
      }
    ],

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

    data: {},
    deliveryServices: [],
    visibleModal: false,
    users: [],
    selectedName: null,
    userObjectId: "",
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

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
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
        fetch(`${uri}/files/images/logoToko.png?overwrite=true`, {
          method: "post",
          body: data
        }).then(result => {
          this.setState({
            data: { ...this.state.data, logo: result.url }
          });
        });
      }
    });
  }

  radioProductStts(name, id) {
    this.setState({
      selectedStatus: name,
      radio1: id
    });
  }

  addCheckCategories(set, categories) {
    if (!this.state.check.includes(set)) {
      getCheck = this.state.check;
      getCheck.push(set);
      this.setState({
        check: getCheck,
        check1: getCheck,
        data: { ...this.state.data, categories }
      });
    } else {
      geCheck = this.state.check;
      geCheck = geCheck.filter(item => item !== set);
      this.setState({
        check: geCheck
      });
    }
  }

  addCheckDeliveryServices(set) {
    if (!this.state.checkk.includes(set)) {
      getCheck = this.state.checkk;
      getCheck.push(set);
      this.setState({
        checkk: getCheck,
        check2: getCheck
      });
    } else {
      geCheck = this.state.checkk;
      geCheck = geCheck.filter(item => item !== set);
      this.setState({
        checkk: geCheck
      });
    }
  }

  allDeliveryServices() {
    axios
      .get(
        `${uri}/data/delivery_services?pageSize=100&offset=0&sortBy=created%20desc`
      )
      .then(result => {
        this.setState({
          deliveryServices: result.data
        });
      });
  }

  getAllUser() {
    axios.get(`${uri}/data/Users`).then(result => {
      console.log(result.data);
      this.setState({ users: result.data });
    });
  }

  handleSubmit() {
    const assistantRelation = [
      //GET objectID from user login
      //For Example:
      //// "AFCD2A0E-3C7C-093E-FFB4-16C27896D200"
    ];

    axios.post(`${uri}/data/stores`, this.state.data).then(result => {
      if (result.data) {
        alert("Succes!");
      }
    });

    //Use this if yout assistant object id is ready
    // axios.post(`${uri}/data/stores`, this.state.data).then(result => {
    //     if(result.data){

    //         axios.post(`${uri}/data/stores/${result.data.objectId}/assistant:Users:1`, assistantRelation).then(result2 => {
    //             if(result2.data){
    //                 alert("Success!")
    //             }
    //         })
    //     }
    // })
  }

  componentDidMount() {
    this.allDeliveryServices();
    this.getAllUser();
  }

  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#dd5453" }}
          androidStatusBarColor="#b4424b"
        >
          <Body>
            <Title>Tambah Lapak</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Label style={styles.upperLimit}>Nama Asisten Lapak </Label>
            <List>
              <ListItem onPress={() => this.setState({ visibleModal: true })}>
                <Body>
                  {this.state.selectedName === null ? (
                    <Text>Please Select Assistant</Text>
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
                          <Text>{user.email}</Text>
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

            <Label style={styles.upperLimit}>Nama Toko</Label>
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
                  this.setState({ data: { ...this.state.data, mobile_phone } })
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
                  this.setState({ data: { ...this.state.data, bank_account } })
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

            {this.state.typesCategory.map((item, key) => (
              <ListItem key={key} style={styles.items}>
                <CheckBox
                  onPress={() => this.addCheckCategories(item.id, item.name)}
                  checked={this.state.check.includes(item.id) ? true : false}
                  color="#dd5453"
                />
                <Body>
                  <Label style={styles.labelSelect}>{item.name}</Label>
                </Body>
              </ListItem>
            ))}

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
                    onPress={() => this.addCheckDeliveryServices(item.objectId)}
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

            <ListItem style={{ alignSelf: "center", justifyContent: "center" }}>
              <Button
                block
                style={styles.submitBtn}
                onPress={() => this.handleSubmit()}
              >
                <Text>Submit</Text>
              </Button>
            </ListItem>
          </Form>
        </Content>

        <Footer style={styles.mainColor}>
          <FooterTab style={styles.mainColor}>
            <Button>
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
  }
});
