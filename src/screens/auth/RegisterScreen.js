import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

// import {CameraKitCameraScreen} from 'react-native-camera-kit';
// import {Camera, CameraType} from 'react-native-camera-kit';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/AuthContext';
//Camera
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
//Camera
function newUID(dd) {
  const epoch = Math.floor(new Date() / 1000).toString();
  return `${dd}${epoch}`;
}

/**
 * 
 
 */
const RegisterScreen = ({navigation}) => {
  /*
   *카메라관련
   */

  //Camrea
  // const devices = useCameraDevices();
  // const device = devices.back;

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);
  // const requestCameraPermission = useCallback(async () => {
  //   const permission = await Camera.requestCameraPermission();
  //   if (permission === 'denied') await Linking.openSettings();
  // }, []);

  // const [qrvalue, setQrvalue] = useState('');
  // const [opneScanner, setOpneScanner] = useState(false);

  // const onBarcodeScan = qrvalue => {
  //   // Called after te successful scanning of QRCode/Barcode
  //   setQrvalue(qrvalue);

  //   //여기서 api로 연결해야하나?
  //   setOpneScanner(false);
  //   alert(qrvalue);
  // };

  // const onOpneScanner = () => {
  //   // To Start Scanning
  //   if (Platform.OS === 'android') {
  //     async function requestCameraPermission() {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.CAMERA,
  //           {
  //             title: 'Camera Permission',
  //             message: 'App needs permission for camera access',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           // If CAMERA Permission is granted
  //           setQrvalue('');
  //           setOpneScanner(true);
  //         } else {
  //           alert('CAMERA permission denied');
  //         }
  //       } catch (err) {
  //         alert('Camera permission err', err);
  //         console.warn(err);
  //       }
  //     }
  //     // Calling the camera permission function
  //     requestCameraPermission();
  //   } else {
  //     setQrvalue('');
  //     setOpneScanner(true);
  //   }
  // };
  /**
   카메라관련
   */

  const [inputs, setInputs] = useState({
    email: '',
    user_name: '',
    name: '',
    tel: '',
    password: '',
    address: '',
    jumin: '',
    image: '',
  });
  const user_id = newUID('laborId');
  const user_name = newUID('laborName');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {isLoading, register} = useContext(AuthContext);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('이메일을 입력해주세요', 'email');
      isValid = false;
    }

    if (!inputs.name) {
      handleError('성명을 입력해주세요', 'name');
      isValid = false;
    }

    if (!inputs.tel) {
      handleError('전화번호을 입력해주세요', 'tel');
      isValid = false;
    }
    if (!inputs.address) {
      handleError('주소 입력해주세요', 'address');
      isValid = false;
    }
    if (!inputs.jumin) {
      handleError('주민번호를 입력해주세요', 'jumin');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('비밃ㄴ호를 입력해주세요', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('5자이상을 입력해주세요', 'password');
      isValid = false;
    }

    if (isValid) {
      const email = inputs.email;
      // const user_name = inputs.user_name;
      const password = inputs.password;
      const name = inputs.name;
      const tel = inputs.tel;
      const address = inputs.address;
      const jumin = inputs.jumin;
      const image = inputs.image;

      const data = {
        user_id,
        email,
        user_name,
        password,
        name,
        tel,
        address,
        jumin,
        image,
      };
      register(data);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  /**
   *Camera
   *
   */
  // function renderCamera() {
  //   if (device == null) {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //         }}
  //       />
  //     );
  //   } else {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //         }}>
  //         <Camera
  //           style={{flex: 1}}
  //           device={device}
  //           inActive={true}
  //           enableZoomGesture
  //         />
  //       </View>
  //     );
  //   }
  // }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{paddingTop: 5, paddingHorizontal: 5}}>
        <Text
          style={{
            color: COLORS.black,
            marginLeft: 10,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          회원가입
        </Text>
        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 5}}>
          Enter Your Details to Register
        </Text> */}
        <View style={{marginVertical: 5}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-check-outline"
            label="이메일"
            placeholder="이메일"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="account-lock"
            label="비밀번호"
            placeholder="비밀번호"
            error={errors.password}
            password
          />
          <Input
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            iconName="rename-box"
            label="이름"
            placeholder="이름"
            error={errors.name}
          />
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'jumin')}
            onFocus={() => handleError(null, 'jumin')}
            iconName="page-next"
            label="주민(외국인)등록번호"
            placeholder="주민(외국인)등록번호"
            error={errors.jumin}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'address')}
            onFocus={() => handleError(null, 'address')}
            iconName="post"
            label="주소"
            placeholder="주소"
            error={errors.address}
          />
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'tel')}
            onFocus={() => handleError(null, 'tel')}
            iconName="cellphone"
            label="전화번호"
            placeholder="전화번호"
            error={errors.tel}
          />
          {/* 카메라관련/ */}

          {/* <View style={styles.container}>
            <View style={{flex: 1}} />
            <View style={{flex: 2}}>
              <View style={styles.logoArea}></View>
              <View style={styles.btnArea}>
                <TouchableOpacity style={styles.btn} onPress={renderCamera}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'NanumSquareR',
                    }}>
                    신분증 촬영
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}} />
          </View> */}

          {/* 카메라관련 */}

          <Button title="Register" onPress={validate} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{direction: 'row'}}>
              <Text
                style={{
                  color: COLORS.darkBlue,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                계정이 있습니까?{' '}
              </Text>
              <Text style={{color: COLORS.red, fontWeight: 'bold'}}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 *카메라관련
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoArea: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 15,
  },
  btnArea: {
    height: 30,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1.5,
  },
  btn: {
    flex: 1,
    width: 75,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B8E1B',
  },
  btnoutline: {
    flex: 1,
    width: 75,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2B8E1B',
  },
});
/**
 *
 */
export default RegisterScreen;
