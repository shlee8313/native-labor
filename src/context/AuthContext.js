import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [nomuUser, setNomuUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = data => {
    setIsLoading(true);
    console.log('전송 회원가입테이타' + JSON.stringify(data));
    axios
      .post(`${BASE_URL}/user/register`, {
        data,
      })
      .then(res => {
        let nomuUser = res.data;
        setNomuUser(nomuUser);
        AsyncStorage.setItem('nomuUser', JSON.stringify(nomuUser));
        setIsLoading(false);
        console.log(nomuUser);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/user/login`,
        {
          email,
          password,
        },
        // ,{
        //   withCredentials: true,
        // },
      )
      .then(response => {
        console.log(
          '로그인시 서버에서오는 자료' + JSON.stringify(response.data),
        );
        if (!response.data.isUser) {
          Alert.alert('이메일을 확인해주세요 !');
          return;
        }
        if (!response.data.valid_password) {
          Alert.alert('비밀번호를 확인해주세요 !');
          // toast.error('비밀번호를 확인해주세요 !');
          // alert("비밀번호를 확인해주세요");
          return;
        }
        // const token = newToken();
        let nomuUser = response.data.user;
        console.log('user info' + JSON.stringify(nomuUser));
        setNomuUser(nomuUser);
        AsyncStorage.setItem('nomuUser', JSON.stringify(nomuUser));
        setIsLoading(false);
        // navigation.navigate('HomeScreen');
        // setSession(response.data.valid_password, nomuUser);
        // return token;
      })
      .catch(error => {
        // if (!found) {
        //   return reject(new Error("user not found"));
        // }
        // toast.error('아이디를 확인해 주세요 !');
        // alert("아이디를 확인해 주세요");
        console.log('실패' + error);
        console.log(`login error ${e}`);
        setIsLoading(false);
        // return error;
      });

    //   let nomuUser = res.data;
    //   console.log('user info' + JSON.stringify(nomuUser));
    //   setNomuUser(nomuUser);
    //   AsyncStorage.setItem('nomuUser', JSON.stringify(nomuUser));
    //   setIsLoading(false);
    // })
    // .catch(e => {
    //   console.log(`login error ${e}`);
    //   setIsLoading(false);
    // });
  };

  const logout = () => {
    setIsLoading(true);

    // axios
    //   .post(
    //     `${BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: {Authorization: `Bearer ${nomuUser.access_token}`},
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
    AsyncStorage.removeItem('nomuUser');
    setNomuUser({});
    setIsLoading(false);
    // })
    // .catch(e => {
    //   console.log(`logout error ${e}`);
    //   setIsLoading(false);
    // });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let nomuUser = await AsyncStorage.getItem('nomuUser');
      nomuUser = JSON.parse(nomuUser);

      if (nomuUser) {
        setNomuUser(nomuUser);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        nomuUser,
        setNomuUser,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
