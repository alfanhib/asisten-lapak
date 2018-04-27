import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView, AsyncStorage } from 'react-native'
import { Container, Title, Content, Text, Icon, Fab, Card, CardItem, Body, Label, Button } from 'native-base';
import axios from 'axios';

import config from "../../../config";
import Footer from '../../../components/Footer'
import Row from '../../../components/Row'

export default class Main extends Component {
	
	
	state = {
		stores: [],
		products: []
	}

	getAllData() {
		this.setState({ refreshing: true });

		const objectId = this.props.navigation.state.params.objectId;
	
		AsyncStorage.getItem("objectId", (err, result) => {
		  if (result) {
			// alert(result);
			axios
			  .get(
				`${
				  config.uri
				}/data/stores?where=status%20%3D%20'pending'&loadRelations=assistant_outdoor%2Cassistant_cs&where=assistant_outdoor.objectId%20%3D%20'${result}'&where=objectId%20%3D%20'${objectId}'`
			  )
			  .then(stores => {
				this.setState({ stores: stores.data, refreshing: false });
			  });
		  }
		});
	  }

	  getAllProduct(){
		const objectId = this.props.navigation.state.params.objectId;

		axios.get(`${config.uri}/data/stores?where=objectId%20%3D%20'${objectId}'`).then(result => {
			if(result.data){
				this.setState({
					products: result.data
				})
				
			}
		})
	  }

	  componentDidMount(){
		this.getAllData();
		this.getAllProduct();
	  }

	render() {
		return (
			<Container>
				<Content style={{ backgroundColor: 'white' }}>
					{/* <Row
						body={(
							<View style={{ flexDirection: 'row', padding: 10 }}>
								<Image style={styles.rowImage}
									source={require('../../../assets/images/market.png')}
								/>
								<View style={{ flex: 5, paddingLeft: 10 }}>
									<Text style={styles.rowTextTitle}>Cawet Ijo</Text>
									<Text style={styles.rowTextCondition}>Baru</Text>
									<Text style={styles.rowTextPrice}>Rp. 200000</Text>
								</View>
							</View>
						)}
					/> */}
					{this.state.stores.map((store, indexes) => (
						<Row
							body={
							<View
									style={{
									flexDirection: "row",
									paddingLeft: 20,
									paddingRight: 20
								}}
							>
								<Image
									style={styles.rowImage}
									source={{ uri: store.logo }}
								/>
								<View style={{ flex: 6, paddingLeft: 10 }}>
									<Text style={styles.rowTextTitle}>{store.name}</Text>
									<Text style={styles.rowSlogan}>{store.slogan}</Text>
									<Text style={styles.rowTextAsistName}>{store.assistant_cs.name}</Text>
									<Text style={styles.rowTextAsistName}>{store.assistant_outdoor.name}</Text>
									<Text style={styles.rowTextAddress}>{store.address}</Text>
									<Text style={styles.rowWebsite}>{store.website}</Text>
									<Text style={styles.rowDescription}>{store.description}</Text>
								</View>
							</View>
							}
							key={indexes}
						/>
					))}

					{this.state.products.length == 0 ? (
					<View>
						<Text style={{ textAlign: "center", marginTop: 10 }}>
							Product is Empty
						</Text>
					</View>
					) : null}

					{this.state.products.map((product, indexes) => (
					<View key={indexes}>
						<Text style={{textAlign: "center"}}>List Product</Text>
						<Row
							body={
							<View
								style={{
								flexDirection: "row",
								paddingLeft: 20,
								paddingRight: 20
								}}
							>
								<Image
								style={styles.rowImage}
								source={{ uri: product.logo }}
								/>
								<View style={{ flex: 6, paddingLeft: 10 }}>
								<Text style={styles.rowTextTitle}>{product.name}</Text>
								<Text style={styles.rowTextAsist}>Asisten CS</Text>
								<Text style={styles.rowTextAsistName}>
									adsfasd
								</Text>
								<Text style={styles.rowTextAddress}>dfasdf</Text>
								</View>
							</View>
							}
							key={indexes}
						/>
					</View>
					))}
					
				</Content>

				<Fab style={{ bottom: 60, backgroundColor: '#DD5453' }}
					onPress={() => this.props.navigation.navigate('FieldHomeAddProduct', {objectId: this.props.navigation.state.params.objectId})}>
					<Icon name="add" />
				</Fab>

				<Footer data={
					{
						activeHome: true,
						screenTransaction: () => this.props.navigation.navigate('FieldTransaction'),
						screenSettings: () => this.props.navigation.navigate('FieldSettings'),
					}
				} />

			</Container>
		)
	}
}

const styles = StyleSheet.create({
	  rowTextCondition:{
		fontSize: 15,
		color: '#4c4c4c',
		flex: 2,
		alignSelf: 'flex-start'
	  },
	  rowTextPrice:{
		fontSize: 15,
		color: '#4c4c4c',
		flex: 2,
		alignSelf: 'flex-start'
	  },

	  rowImage: {
		resizeMode: "contain",
		flex: 2
	  },
	  rowTextTitle: {
		fontSize: 20,
		marginBottom: 5
	  },
	  rowTextAsist: {
		fontSize: 13,
		color: "#828282"
	  },
	  rowTextAsistName: {
		fontSize: 15,
		marginBottom: 5,
		color: "#4c4c4c"
	  },
	  rowTextAddress: {
		fontSize: 15,
		color: "#4c4c4c"
	  },

	  rowSlogan:{
		fontSize: 15,
		marginBottom: 5,
		color: "#4c4c4c"
	  },

	  rowWebsite:{
		fontSize: 15,
		marginBottom: 5,
	  },

	  rowDescription:{
		fontSize: 13,
		color: "#828282"
	  }

})