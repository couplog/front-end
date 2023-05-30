import {Linking, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import ButtonComponent from '../components/design/ButtonComponent';
import Checkbox from '../components/design/CheckBoxComponent';

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.logoView}>
        <Text style={styles.logo}>Date Plan</Text>
      </View> 
      <View style={styles.inputView}> 
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
      {errors.phoneNumber && <Text style={styles.errorFont}>This is required.</Text>}
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
      {errors.password && <Text style={styles.errorFont}>This is required.</Text>}
      <View style={styles.checkboxView}>
        <Checkbox/>
        <Text style={styles.autoLoginFont}>자동 로그인</Text>
      </View>
    </View>
    <View style={styles.signupView}>
      <Text 
      style={styles.signupText}
      onPress={() => Linking.openURL('')}>회원가입하기
      </Text>
    </View>
    <View style={styles.buttonView}>
      <ButtonComponent disabled={false} text='로그인' font='bold' onPress={handleSubmit(onSubmit)}/>
    </View>
  </SafeAreaView>
    
  );
};

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoView:{
    height:140,
  },
  logo:{
    color: '#000000',
    fontFamily:"Pretendard-Regular",
    fontSize:30,
    paddingTop: 76,
  },
  inputView: {
    width:"100%",
    height:230,
    justifyContent: 'center',
    marginTop:32,
    marginBottom:200
  },
  label: {
    color: '#000000',
    fontFamily:"Pretendard-Regular",
    fontSize:16,
    marginTop: 32,
    marginBottom:5
  },
  input: {
    width:"100%",
    backgroundColor: 'white',
    borderWidth:1,
    borderColor: '#CCCCCC',
    height: 40,
    borderRadius: 4,
    paddingLeft:12
  },
  errorFont:{
    color:"red",
    marginTop:2
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop:40,
  },
  autoLoginFont:{
    marginLeft:12
  },
  signupView:{

  },
  signupText:{
    color: "#909090",
    textDecorationLine:'underline',
    fontSize:14,
    marginBottom:23
  },
  buttonView:{
    width:"100%",
    marginBottom: 40,
  }
}); 

