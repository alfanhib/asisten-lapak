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
  Card,
  CardItem,
  List
} from "native-base";
import {
  StyleSheet,
  View,
  Image,
  PixelRatio,
  TouchableOpacity,
  AppRegistry,
  Alert
} from "react-native";
import axios from "axios";
import ImagePicker from "react-native-image-picker";
import moment from "moment";

import Footer from "../../../components/Footer";
import config from "../../../config";
import Row from "../../../components/Row";

export default class CsAddProduct extends Component {
  state = {
    checkedName: "",
    imageSource: null,
    conditione: false,
    checkedName2: "",
    conditionChoice: "",
    preOrderChoice: "",
    value: null,
    conditionItems: [
      {
        id: 1,
        name: "Baru",
        value: true
      },
      {
        id: 2,
        name: "Bekas",
        value: false
      }
    ],

    preOrderItems: [
      {
        id: 1,
        name: "Ya",
        value: true
      },
      {
        id: 2,
        name: "Tidak",
        value: false
      }
    ],

    data: {}
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
            data: { ...this.state.data, image: result.url }
          });
        });
      }
    });
  }

  allProduct() {
    axios
      .get(`${config.uri}/data/products?sortBy=created%20desc`)
      .then(result => {
        this.setState({
          data: result.data
        });
      });
  }

  handleSubmit() {
    const data = {
      ...this.state.data,
      price: Number(this.state.data.price),
      weight: Number(this.state.data.weight),
      processing_days: Number(this.state.data.processing_days)
    };

    const objectId = this.props.navigation.state.params.objectId;

    const dataRelationStores = [String(objectId)];

    axios
      .post(`${config.uri}/data/products`, data)
      .then(result => {
        if (result.data) {
          axios
            .post(
              `${config.uri}/data/products/${
                result.data.objectId
              }/store:stores:1`,
              dataRelationStores
            )
            .then(resultStoreRelation => {
              if (resultStoreRelation.data) {
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

  radioCondition(name, is_new) {
    this.setState({
      conditionChoice: name,
      data: { ...this.state.data, is_new }
    });
  }

  preOrderRadio(name, is_preorder) {
    this.setState({
      preOrderChoice: name,
      data: { ...this.state.data, is_preorder }
    });
  }

  componentDidMount() {
    const objectId = this.props.navigation.state.params.objectId;
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "white" }}>
          <Form>
            <View style={{ width: "95%", alignSelf: "center" }}>
              <Label style={styles.upperLimit}>
                Nama Produk (max 70 karakter){" "}
              </Label>
              <Item regular>
                <Input
                  onChangeText={name =>
                    this.setState({ data: { ...this.state.data, name } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Gambar Produk</Label>

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

              <Label style={styles.upperLimit}>Harga</Label>
              <Item regular>
                <Input
                  onChangeText={price =>
                    this.setState({ data: { ...this.state.data, price } })
                  }
                  keyboardType="numeric"
                />
              </Item>

              <Label style={styles.upperLimit}>Pemesanan minimun/buah</Label>
              <Item regular>
                <Input keyboardType="numeric" />
              </Item>

              <Label style={styles.upperLimit}>Kondisi</Label>

              {this.state.conditionItems.map((item, index) => {
                return (
                  <ListItem key={item.name} style={styles.items}>
                    <Radio
                      selected={
                        item.name == this.state.conditionChoice ? true : false
                      }
                      onPress={() => this.radioCondition(item.name, item.value)}
                    />
                    <Body>
                      <Label style={styles.labelSelect}>{item.name}</Label>
                    </Body>
                  </ListItem>
                );
              })}

              <Label style={styles.upperLimit}>Deskripsi Produk</Label>
              <Item regular>
                <Input
                  onChangeText={description =>
                    this.setState({ data: { ...this.state.data, description } })
                  }
                />
              </Item>

              <Label style={styles.upperLimit}>Berat (kg)</Label>
              <Item regular>
                <Input
                  onChangeText={weight =>
                    this.setState({ data: { ...this.state.data, weight } })
                  }
                  keyboardType="numeric"
                />
              </Item>

              <Label style={styles.upperLimit}>
                Aktifkan preorder untuk waktu proses produksi yang lebih lama
              </Label>

              {this.state.preOrderItems.map((item, index) => {
                return (
                  <ListItem key={item.name} style={styles.items}>
                    <Radio
                      selected={
                        item.name == this.state.preOrderChoice ? true : false
                      }
                      onPress={() => this.preOrderRadio(item.name, item.value)}
                    />
                    <Body>
                      <Label style={styles.labelSelect}>{item.name}</Label>
                    </Body>
                  </ListItem>
                );
              })}

              <Label style={styles.upperLimit}>
                Waktu Proses (wajib diisi untuk mengetahui lama produk diproses)
              </Label>
              <Item regular>
                <Input
                  onChangeText={processing_days =>
                    this.setState({
                      data: { ...this.state.data, processing_days }
                    })
                  }
                  keyboardType="numeric"
                />
              </Item>
            </View>

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

  items: {
    marginLeft: -0.1
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

  fileChooser: {
    color: "#156af2",
    marginLeft: -15
  },

  cardHeader: {
    fontSize: 20,
    marginBottom: 5,
    color: "#0c0c0c"
  },
  cardContent: {
    color: "#424242"
  },
  cardDate: {
    marginTop: 5
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
