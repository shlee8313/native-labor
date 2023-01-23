import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../../constants';
import FloatingButton from '../../navigations/Floating';
import {AuthContext} from '../../context/AuthContext';
// import {useContext} from 'react';
const UserInfo = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  /**
   * 

   */
  const handleLogout = async e => {
    e.preventDefault();

    await logout();
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        flex: 10,

        backgroundColor: COLORS.bgColor,
      }}>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <Text>회원정보</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <FloatingButton />
    </View>
  );
};

export default UserInfo;
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
