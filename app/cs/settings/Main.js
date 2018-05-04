import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

import {
  Container,
  View,
  Text,
  Form,
  Input,
  Content,
  Label,
  Item,
  Header,
  Button,
  Title,
  Body,
  Icon,
  Right,
  Left,
  Spinner
} from "native-base";
import ImagePicker from "react-native-image-picker";
import moment from "moment";
import axios from "axios";

import Footer from "../../../components/Footer";
import config from "../../../config";

export default class EditAccount extends Component {
  state = {
    imageSourceDefault: {
      uri:
        "https://st2.depositphotos.com/1006318/8387/v/950/depositphotos_83874174-stock-illustration-profile-icon-male-hispanic-avatar.jpg"
    },
    imageSource: null,
    form: {},
    info: []
  };

  componentDidMount() {
    AsyncStorage.getItem("objectId", (err, result) => {
      if (result) {
        axios
          .get(`${config.uri}/data/Users?where=objectId%20%3D%20'${result}'`)
          .then(result => {
            this.setState({
              info: result.data
            });
          });
      }
    });
  }

  handelLogout() {
    AsyncStorage.getItem("userToken", (err, result) => {
      if (result) {
        axios({
          method: "get",
          url: `${config.uri}/users/logout`,
          headers: {
            "user-token": result
          }
        }).then(response => {
          AsyncStorage.removeItem("userToken", err => {
            if (!err) {
              this.props.navigation.navigate("SignIn");
            } else {
              alert("Logout Gagal");
            }
          });
        });
      }
    });
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
          `${config.uri}/files/photo-profile/${this.state.info[0].objectId}.${
            fileName[1]
          }?overwrite=true`,
          {
            method: "post",
            body: data
          }
        ).then(result => {
          axios
            .put(
              `${config.uri}/data/bulk/Users?where=objectId%20%3D%20'${
                this.state.info[0].objectId
              }'`,
              {
                photo_profile: result.url
              }
            )
            .then(resImageLink => {
              if (resImageLink) {
                alert("Sukses Upload");
              } else {
                alert("Gagal Upload");
              }
            })
            .catch(e => {
              alert(JSON.stringify(e));
            });
          //     this.setState({
          //     imageSource: { ...this.state.info, imageSource: result.url }
          //   });
        });
      }
    });
  }

  render() {
    return (
      <Container>
        {this.state.info.length != 0 ? (
          <Content>
            <View style={styles.row}>
              {this.state.info[0].photo_profile === null ? (
                <View>
                  <View
                    style={[
                      styles.avatar,
                      styles.avatarContainer,
                      { marginBottom: 20 }
                    ]}
                  >
                    <Image
                      style={styles.avatar}
                      source={this.state.imageSourceDefault}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    <Button
                      transparent
                      onPress={this.selectPhotoTapped.bind(this)}
                    >
                      <Text style={styles.fileChooser}>Change Photo</Text>
                    </Button>
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={[
                      styles.avatar,
                      styles.avatarContainer,
                      { marginBottom: 20 }
                    ]}
                  >
                    <Image
                      style={styles.avatar}
                      source={{ uri: this.state.info[0].photo_profile }}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    <Button
                      transparent
                      onPress={this.selectPhotoTapped.bind(this)}
                    >
                      <Text style={styles.fileChooser}>Change Photo</Text>
                    </Button>
                  </View>
                </View>
              )}
            </View>
            <Form>
              <Label style={styles.lblForm}>Name</Label>
              <Item>
                <Input
                  style={styles.inputForm}
                  disabled
                  placeholder="Name"
                  value={this.state.info[0].name}
                />
                <Icon name="md-create" />
              </Item>
              <Label style={styles.lblForm}>Email</Label>
              <Item>
                <Input
                  style={styles.inputForm}
                  disabled
                  placeholder="Email"
                  value={this.state.info[0].email}
                />
                <Icon name="md-create" />
              </Item>
              <Label style={styles.lblForm}>Nomor Handphone</Label>
              <Item>
                <Input
                  style={styles.inputForm}
                  disabled
                  placeholder="phone Number"
                  value={this.state.info[0].mobile_phone.toString()}
                />
                <Icon name="md-create" />
              </Item>
              <Label style={styles.lblForm}>Address</Label>
              <Item>
                <Input
                  style={styles.inputForm}
                  multiline={true}
                  numberOfLines={4}
                  disabled
                  placeholder="Address"
                  value={this.state.info[0].address}
                />
                <Icon name="md-create" />
              </Item>
            </Form>
            <Button
              primary
              full
              style={{ margin: 10, backgroundColor: "#b4424b" }}
              onPress={() => this.handelLogout()}
            >
              <Text> Logout </Text>
            </Button>
          </Content>
        ) : (
          <Content>
            <Spinner color="red" />
          </Content>
        )}
        <Footer
          data={{
            activeSettings: true,
            screenHome: () => this.props.navigation.navigate("FieldHome"),
            screenTransaction: () =>
              this.props.navigation.navigate("FieldTransaction")
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  itmUser: {
    padding: 5
  },
  lblForm: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14
  },
  inputForm: {
    fontSize: 14
  },
  btnSave: {
    backgroundColor: "#b4424b"
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
