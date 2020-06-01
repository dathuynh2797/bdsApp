/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import 'firebase/firestore';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import bgAva from '../../img/bgAva.png';

export class PersonalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirect: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title="Hồ sơ cá nhân" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  render() {
    const {navigation} = this.props;
    const namsinh = navigation.getParam('namsinh', 'chưa có dữ liệu');
    const ten = navigation.getParam('ten');
    const sdt = navigation.getParam('sdt');
    const email = navigation.getParam('email', 'chưa có dữ liệu');
    const hinhanh = navigation.getParam('hinhanh', 'chưa có dữ liệu');
    const nhom = navigation.getParam('nhom', 'chưa có dữ liệu');
    const phong = navigation.getParam('phong', 'chưa có dữ liệu');
    const role = navigation.getParam('chucvu', 'chưa có dữ liệu');
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1 / 3}}>
          <ImageBackground style={styles.Top} source={bgAva}>
            <Image
              source={{
                uri: hinhanh,
              }}
              style={styles.AvatarImg}
            />
            <Text style={styles.AvatarTxt}>{ten}</Text>
          </ImageBackground>
        </View>
        <View style={styles.Content}>
          <View style={styles.Item}>
            <Image source={require('../..//img/Profile/birthday.png')} />
            <View style={styles.HorizonLine} />
            <Text>Sinh nhật: {namsinh}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/phone.png')} />
            <View style={styles.HorizonLine} />
            <Text>Số điện thoại: {sdt}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/mail.png')} />
            <View style={styles.HorizonLine} />
            <Text>Email: {email}</Text>
          </View>
          {!this.state.isDirect && (
            <View style={styles.Item}>
              <Image source={require('../../img/Profile/team.png')} />
              <View style={styles.HorizonLine} />
              <Text>Nhóm: {nhom}</Text>
            </View>
          )}
          {!this.state.isDirect && (
            <View style={styles.Item}>
              <Image source={require('../../img/Profile/department.png')} />
              <View style={styles.HorizonLine} />
              <Text>Phòng: {phong}</Text>
            </View>
          )}
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/mail.png')} />
            <View style={styles.HorizonLine} />
            <Text>Chức vụ: {role}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Top: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvatarImg: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  AvatarTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  Content: {
    flex: 2 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Item: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 4,
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  HorizonLine: {
    borderWidth: 1,
    height: '100%',
    marginHorizontal: 10,
  },
});
