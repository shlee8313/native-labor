import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';

// import {View, Text, SafeAreaView} from 'react-native';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  const {login, nomuUser} = useContext(AuthContext);
  console.log('이것도');

  /**
   *
   */
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('이메일을 입력해주세요', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('비밀번호를 입력해주세요', 'password');
      isValid = false;
    }
    if (isValid) {
      await login(inputs.email, inputs.password);
    }
    // navigation.navigate('Home');
  };

  useEffect(() => {
    // const loginUser = AsyncStorage.getItem('nomuUser');
    // if (loginUser !== null) {
    //   // We have data!!
    //   console.log(loginUser);
    // }
    // console.log('로그인 유이펙트' + JSON.stringify(loginUser));

    // AsyncStorage.removeItem('nomuUser');
    console.log('로그인페지 userIngfo' + JSON.stringify(nomuUser));
    // setNomuUser({});
    if (nomuUser[0]?.user_id) {
      console.log('로그인된겻');
      navigation.navigate('Home');
      setInputs({email: '', password: ''});
    }
  }, [nomuUser]);

  /**
   *
   */
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 10, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 20, fontWeight: 'bold'}}>
          로그인
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text> */}
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-check-outline"
            label="이메일"
            placeholder="이메일"
            value={inputs.email}
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="account-lock"
            label="비밀번호"
            placeholder="비밀번호"
            error={errors.password}
            value={inputs.password}
            password
          />
          <Button title="로그인" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              color: COLORS.darkBlue,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            계정이 없습니까?
          </Text>
          <Text> 회원가입</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default LoginScreen;
