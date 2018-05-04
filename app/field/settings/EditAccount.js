import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image
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
  Textarea
} from "native-base";

import ImagePicker from "react-native-image-picker";

export default class EditAccount extends Component {
  state = {
    imageSource: null
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
          `${config.uri}/files/logo-toko/${moment().format("X")}.${
            fileName[1]
          }`,
          {
            method: "post",
            body: data
          }
        ).then(result => {
          this.setState({
            imageSource: { ...this.state.data, imageSource: result.url }
          });
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#b4424b"
          style={{ backgroundColor: "#dd5453" }}
        >
          <Body>
            <Title>Edit Profile</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.row}>
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
          </View>
          <Form style={styles.form}>
            <Label style={styles.lblForm}>Name :</Label>
            <Item regular style={styles.itmUser}>
              <Input placeholder="Rehan Choirul" />
            </Item>
            <Label style={styles.lblForm}>Number Phone :</Label>
            <Item regular style={styles.itmUser}>
              <Input placeholder="08*********" />
            </Item>
            <Label style={styles.lblForm}>Address :</Label>
            <Textarea
              placeholder="Jl. dimana-mana"
              style={{ marginBottom: 5 }}
              rowSpan={5}
              bordered
            />
            <Button full style={styles.btnSave}>
              <Text>Save</Text>
            </Button>
          </Form>
        </Content>
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
  form: {
    padding: 20
  },
  itmUser: {
    padding: 5
  },
  lblForm: {
    marginTop: 10,
    padding: 5,
    fontSize: 20
  },
  btnSave: {
    backgroundColor: "#b4424b"
  }
});
