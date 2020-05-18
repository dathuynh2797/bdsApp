import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';
import 'firebase/firestore';

export class Ogchartbgd extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'THÔNG TIN CHI TIẾT',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
          <Image
            source={require('../../img/exit.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#0A053F',
      headerTitleAlign: 'center',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bgd: [],
    };
  }

  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('user').onSnapshot(querySnapshot => {
      var name = [];
      querySnapshot.forEach(doc => {
        name.push({
          id: doc.id,
          ten: doc.data().fullName,
          sdt: doc.data().phoneNumber,
          namsinh: doc.data().staffDateOfBirth,
          hinhanh: doc.data().avatars[0].publicUrl,
        });

        this.setState({
          bgd: name,
          loading: false,
        });
      });
    });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.bgd}
          renderItem={({item}) => (
            <View style={styles.scene}>
              <View style={styles.items}>
                <View>
                  <Image style={styles.image} source={{uri: item.hinhanh}} />
                </View>
                <View style={styles.data}>
                  <Text style={styles.title}>{item.ten}</Text>
                  <Text style={styles.title}>{item.namsinh}</Text>
                  <Text style={styles.title}>{item.sdt}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.ten}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  items: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
  data: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 15,
  },
  title: {
    color: '#444',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontWeight: '300',
  },
  price: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: '300',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
});
