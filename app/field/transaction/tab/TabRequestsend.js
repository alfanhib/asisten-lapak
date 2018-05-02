import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  SectionList,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import {
  Container,
  Content,
  Header,
  SwipeRow,
  View,
  Icon,
  Button
} from "native-base";

import Row from "../../../../components/Row";

import axios from "axios";
import moment from "moment";

import getDateSections from "../../../../getDateSections";
import config from "../../../../config";

export default class TabRequestsend extends Component {
  state = {
    refreshing: true,
    transactions: []
  };

  getAllData() {
    this.setState({ refreshing: true });
    axios
      .get(
        `${
          config.uri
        }/data/transactions?where=status%3D'pending'&props=name%2Caddress%2Ccreated%2CdeadlineDate&loadRelations=typeOfShipping`
      )
      .then(transactions => {
        this.setState({
          transactions: getDateSections(transactions.data, "deadlineDate"),
          refreshing: false
        });
      });
  }

  componentDidMount() {
    this.getAllData();
  }

  render() {
    console.log(this.state.transactions);
    return (
      <Container>
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getAllData.bind(this)}
            />
          }
        >
          <Content>
            <SectionList
              renderItem={({ item, index, section }) => (
                <Row
                  body={
                    <View style={{ flexDirection: "row", padding: 10 }}>
                      {/* <Image style={styles.rowImage}
                                                source={require('../../../../assets/images/market.png')}
                                            /> */}
                      <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={styles.rowTextTitle}>{item.name}</Text>
                        <Text style={styles.rowTextAddress}>
                          {item.address}
                        </Text>
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
                  }
                  onpress={{
                    view: () =>
                      this.props.navigation.navigate(
                        "FieldTransactionRequestView",
                        {
                          item,
                          status: "pending",
                          getAllData: this.getAllData.bind(this)
                        }
                      )
                  }}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.deadline}>Batas Akhir, {title}</Text>
              )}
              sections={this.state.transactions}
              keyExtractor={(item, index) => item + index}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  deadline: {
    textAlign: "center",
    padding: 5,
    color: "black",
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 5
  },
  rowImage: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    flex: 2
  },
  rowTextTitle: {
    fontSize: 20,
    marginBottom: 5,
    color: "black"
  },
  rowTextIn: {
    fontSize: 13,
    color: "#7c7c7c"
  },
  rowTextAddress: {
    fontSize: 15,
    color: "#4c4c4c",
    marginBottom: 5
  },
  rowTextDate: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2
  },
  rowTextSender: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 1,
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    borderRadius: 50
  }
});
