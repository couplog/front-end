import {Linking, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ButtonComponent from '../components/design/ButtonComponent';

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Date Plan</Text>
      </View> 
      <View style={styles.inputContainer}> 
        <Text style={styles.label}>전화번호</Text>
        <Controller
        control={control}
        rules={{
        required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="전화번호를 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber && <Text style={styles.errorMsg}>This is required.</Text>}
      <Text style={styles.label}>비밀번호</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.errorMsg}>This is required.</Text>}
        <BouncyCheckbox
        style={styles.checkbox}
        size={18}
        fillColor="black"
        unfillColor="#FFFFFF"
        text="자동 로그인"
        textStyle={{
          textDecorationLine: "none",
          fontSize:14,
          color:"#000000"
        }}
        iconStyle={{ borderColor: "black" }}
        onPress={(isChecked: boolean) => {}}
      />
    </View>
    <View style={styles.signupContainer}>
      <Text 
      style={styles.signupText}
      onPress={() => Linking.openURL('')}>회원가입하기</Text>
      </View>
    <View style={styles.buttonContainer}>
      <ButtonComponent disabled={false} text='로그인' font='bold' onPress={handleSubmit(onSubmit)}/>
    </View>
  </View>
    
  );
};

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer:{
    height:200,
  },
  logo:{
    color: '#000000',
    fontFamily:"Pretendard-Regular",
    fontSize:30,
    paddingTop: 76,
  },
  inputContainer: {
    height:290,
    justifyContent: 'center',
    marginTop:32,
  },
  label: {
    color: '#000000',
    fontFamily:"Pretendard-Regular",
    fontSize:16,
    marginTop: 32,
    marginBottom:5
  },
  input: {
    width: 327,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor: '#CCCCCC',
    height: 40,
    borderRadius: 4,
    paddingLeft:12
  },
  checkbox: {
    marginTop:40,
    marginBottom:200
  },
  errorMsg:{
    color:"red",
    marginTop:2
  },
  signupContainer:{
    height:40
  },
signupText:{
  color: "#909090",
  textDecorationLine:'underline',
  fontSize:14,
  marginBottom:23
},
buttonContainer:{
  height:106
}
});

