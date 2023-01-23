import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label,
  iconName,
  error,
  password,
  value,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          size={30}
          color="#900"
          style={{
            color: COLORS.darkBlue,
            fontSize: 22,
            marginRight: 10,
          }}
        />

        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          value={value}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off'}
            style={{color: COLORS.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 12,
    color: COLORS.grey,
  },
  inputContainer: {
    marginHorizontal: 10,
    height: 40,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default Input;
