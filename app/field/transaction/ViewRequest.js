import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  List,
  ListItem,
  Thumbnail,
  Body
} from "native-base";
import axios from "axios";
import moment from "moment";

import config from "../../../config";
import Footer from "../../../components/Footer";
import Row from "../../../components/Row";

export default class ViewRequest extends Component {
  state = {
    listOrders: null,
    isLoading: true
  };

  getAllOrders() {
    const { item } = this.props.navigation.state.params;
    axios
      .get(
        `${config.uri}/data/orders?where=transactionId.objectId%20%3D%20'${
          item.objectId
        }'&loadRelations=productId.store%2CtransactionId`
      )
      .then(result => {
        this.setState({
          listOrders: result.data,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getAllOrders();
  }

  handleProcess(objectId) {
    const { getAllData } = this.props.navigation.state.params;
    axios
      .put(
        `${
          config.uri
        }/data/bulk/transactions?where=objectId%20%3D%20'${objectId}'`,
        {
          status: "process"
        }
      )
      .then(result => {
        getAllData();
        this.props.navigation.goBack();
      });
  }

  handleSuccess(objectId) {
    const { status, getAllData } = this.props.navigation.state.params;
    axios
      .put(
        `${
          config.uri
        }/data/bulk/transactions?where=objectId%20%3D%20'${objectId}'`,
        {
          status: "success"
        }
      )
      .then(result => {
        getAllData();
        this.props.navigation.goBack();
      });
  }

  handleFailed(objectId) {
    const { status, getAllData } = this.props.navigation.state.params;
    axios
      .put(
        `${
          config.uri
        }/data/bulk/transactions?where=objectId%20%3D%20'${objectId}'`,
        {
          status: "failed"
        }
      )
      .then(result => {
        getAllData();
        this.props.navigation.goBack();
      });
  }

  getTotalPrice() {
    let hasil = 0;
    if (this.state.listOrders != null) {
      this.state.listOrders.map(order => {
        hasil += order.qty * order.price;
      });
      return hasil;
    }
  }

  showButton() {
    const { item, status } = this.props.navigation.state.params;
    if (status == "pending") {
      return (
        <View style={{ margin: 10 }}>
          <Button
            full
            style={{ backgroundColor: "#DD5453" }}
            onPress={() => this.handleProcess(item.objectId)}
          >
            <Text>Proses</Text>
          </Button>
        </View>
      );
    } else if (status == "process") {
      return (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <Button
            full
            success
            onPress={() => this.handleSuccess(item.objectId)}
            style={{ flex: 1 }}
          >
            <Text>sukses</Text>
          </Button>
          <Button
            full
            danger
            onPress={() => this.handleFailed(item.objectId)}
            style={{ flex: 1 }}
          >
            <Text>Gagal</Text>
          </Button>
        </View>
      );
    } else {
      return null;
    }
  }

  _renderHeader = () => {
    const { item } = this.props.navigation.state.params;
    return (
      <View>
        <Text style={styles.info}>
          Batas Akhir {moment(item.deadlineDate).format("L")}
        </Text>
        <View style={{ flexDirection: "row", padding: 10 }}>
          {/* <Image
                  style={styles.rowImage}
                  // source={require("../../../assets/images/market.png")}
                /> */}
          <View
            style={{ flex: 5, paddingLeft: 10, backgroundColor: "#ecf0f1" }}
          >
            <Text style={styles.rowTextTitle}>{item.name}</Text>
            <Text style={styles.rowTextAddress}>{item.address}</Text>
            <Text style={styles.rowTextIn}>Masuk</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.rowTextDate}>
                {moment(item.created).format("L")}
              </Text>
              <Text style={styles.rowTextSender}>
                {item.typeOfShipping.name}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.info}>Daftar Barang</Text>
      </View>
    );
  };

  _renderItem = ({ item }) => (
    <ListItem>
      <Thumbnail circular size={50} source={{ uri: item.productId.image }} />
      <Body>
        <Text>{item.productId.name}</Text>
        <Text note>Jumlah: {item.qty}</Text>
        <Text note>Harga per 1 barang: Rp. {item.price}</Text>
      </Body>
    </ListItem>
  );

  _emptyComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Tidak Ada Barang yang di order</Text>
    </View>
  );

  render() {
    return (
      <Container>
        {/* <Content style={{ backgroundColor: "#f9f9f9" }}> */}
        <FlatList
          onRefresh={() => this.getAllOrders()}
          refreshing={this.state.isLoading}
          data={this.state.listOrders}
          keyExtractor={item => item.objectId}
          ListHeaderComponent={this._renderHeader}
          renderItem={this._renderItem}
          ListEmptyComponent={this._emptyComponent}
        />
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginRight: 10,
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text>Total =</Text>
          </View>
          <View>
            <Text>Rp {this.getTotalPrice()}</Text>
          </View>
        </View>
        {this.showButton()}
        {/* </Content> */}

        <Footer
          data={{
            activeTransaction: true,
            screenHome: () => this.props.navigation.navigate("FieldHome"),
            screenSettings: () =>
              this.props.navigation.navigate("FieldSettings")
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    textAlign: "center",
    padding: 5,
    color: "black",
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    marginBottom: 10
  },
  rowImage: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    flex: 1
  },
  rowTextTitle: {
    fontSize: 20,
    marginBottom: 5,
    color: "black",
    alignSelf: "flex-start"
  },
  rowTextIn: {
    fontSize: 13,
    alignSelf: "flex-start",
    color: "#7c7c7c"
  },
  rowTextAddress: {
    fontSize: 15,
    color: "#4c4c4c",
    marginBottom: 5,
    alignSelf: "flex-start"
  },
  rowTextDate: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2,
    alignSelf: "flex-start"
  },
  rowTextSender: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 1,
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    borderRadius: 50,
    alignSelf: "flex-start"
  },
  rowTextPcs: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2,
    alignSelf: "flex-start"
  },
  rowTextPrice: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2,
    alignSelf: "flex-start"
  }
});
