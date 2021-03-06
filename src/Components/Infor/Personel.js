/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import {firebaseApp} from '../config';
import 'firebase/firestore';
import {Table, Row, Cols} from 'react-native-table-component';
import {Platform, InteractionManager} from 'react-native';
import {DismissKeyboardView} from '../DismissKeyBroad';

const {width: WIDTH} = Dimensions.get('window');

//set time out
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
export class Personel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tableHead: ['Tên', 'Năm sinh', 'Số điện thoại'],
      tableData: [],
      text: '',
      data: [],
      roles: '',
    };
  }
  componentDidMount() {
    var name = [];
    firebaseApp
      .firestore()
      .collection('user')
      .where('disabled', '==', false)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().roles[0] !== 'Admin') {
            name.push({
              id: doc.id,
              ten: doc.data().fullName,
              sdt: doc.data().phoneNumber,
              namsinh: doc.data().staffDateOfBirth,
              hinhanh: doc.data().avatars[0].publicUrl,
              email: doc.data().email,
              chucvu: doc.data().roles[0],
              idphong: doc.data().productUnit,
              idnhom: doc.data().iamTeam,
            });
          }
        });
        this.setState({
          tableData: name.sort((a, b) => {
            return a.ten > b.ten;
          }),
          loading: true,
          data: name,
        });
      });
  }
  filterSearch(text) {
    this.setState({
      value: text,
    });
    let newdata = this.state.data.filter(function(item) {
      let itemData = item.ten.toUpperCase();
      let textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      tableData: newdata,
    });
  }
  render() {
    return (
      <SafeAreaView>
        <DismissKeyboardView>
          <Text style={styles.headerText}>Thông tin nhân viên</Text>
          <Image
            style={{
              position: 'absolute',
              height: 30,
              width: 30,
              top: 60,
              left: 20,
            }}
            source={require('../../img/Profile/seach.png')}
          />
          <View style={{paddingHorizontal: 10, marginBottom: 10}}>
            <TextInput
              placeholder="Tìm kiếm"
              style={styles.seachbar}
              onChangeText={text => this.filterSearch(text)}
              value={this.state.value}
            />
          </View>
          <View style={styles.container}>
            <Table
              style={{
                maxHeight: '90%',
                marginHorizontal: 10,
              }}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={{textAlign: 'center'}}
                borderStyle={{borderWidth: 1, borderColor: '#000'}}
                flexArr={[1.4, 0.85, 0.95]}
              />
              <FlatList
                data={this.state.tableData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('PersonalDetail', {
                        id: item.id,
                        ten: item.ten,
                        sdt: item.sdt,
                        namsinh: item.namsinh,
                        hinhanh: item.hinhanh,
                        email: item.email,
                        chucvu: item.chucvu,
                        idphong: item.idphong,
                        idnhom: item.idnhom,
                      });
                      // console.log(item.email);
                    }}>
                    <Cols
                      data={[[item.ten], [item.namsinh], [item.sdt]]}
                      textStyle={styles.text}
                      // style={styles.boder}
                      borderStyle={{borderWidth: 1, borderColor: '#000'}}
                      flexArr={[1.4, 0.85, 0.95]}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </Table>
          </View>
        </DismissKeyboardView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // paddingTop: 5,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  head: {
    height: 40,
    backgroundColor: '#1787AB',
  },
  text: {
    marginLeft: 5,
    marginBottom: 12,
    marginTop: 12,
    // alignSelf: 'center',
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
    marginTop: 10,
    marginBottom: 10,
  },
  seachbar: {
    backgroundColor: 'rgba(78, 158, 237, 0.3)',
    borderRadius: 30,
    paddingLeft: 50,
    height: 40,
  },
});
