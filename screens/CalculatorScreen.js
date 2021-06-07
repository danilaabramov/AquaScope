import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {Caption, Paragraph} from "react-native-paper";
import AnimatedHeader from 'react-native-animated-header';
export const CalculatorScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    return (
        <AnimatedHeader 
        style={{flex: 1, marginTop: 20, paddingHorizontal: 10}}
        title='Калькуляторы'
        renderLeft={() => ( <TouchableOpacity onPress={() => {navigation.openDrawer()}} style={{height: 50, width: 50, marginTop: 15, marginLeft: 20}}>
                    <Icon name="ios-menu" size={35}  color={colors.text}/>
                </TouchableOpacity>)}
        backStyle={{ left: 0 }}
        backTextStyle={{fontSize: 18, color: '#000'}}
        titleStyle={{ fontSize: 25, left: 30, bottom: 20, color: colors.text, fontWeight: 'bold' }}
        headerMaxHeight={120}
        toolbarColor={colors.background}
        disabled={false}
        noBorder={true}
      >

                           <ScrollView showsVerticalScrollIndicator={false}>




<View style={[styles.item, {backgroundColor: colors.background2}]}>

<View style={ {backgroundColor: '#72D695',  borderRadius: 20, margin: 10}}>

                                           
                                          <Paragraph  style={[{color: colors.background2, fontWeight: 'bold', fontSize: 20, padding: 15}]}>Основные</Paragraph>
</View>

                           <TouchableOpacity onPress={() => {navigation.navigate("AquariumVolume")} } style={{width: '100%'}}
                                                     activeOpacity={0.5}     >
                                       
                                          <Paragraph  style={[{color:  colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}> Объем аквариума</Paragraph>
                                        
                                        
                                        
                                        </TouchableOpacity>




                                        <TouchableOpacity onPress={() => {navigation.navigate("CO2Level")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Уровень СО2</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("WaterBalance")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Водный баланс RO</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("AquariumWater")}} style={{width: '100%'}}
                                                    activeOpacity={0.5}      >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Подмена воды</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("MixerRO")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, fontSize: 20, padding: 25}]}>Миксер RO</Paragraph>
                                        </TouchableOpacity>
</View>





<View style={[styles.item, {backgroundColor: colors.background2}]}>
<View style={ {backgroundColor: '#72D695',  borderRadius: 20, margin: 10}}>

                                           
                                          <Paragraph  style={[{color: colors.background2, fontWeight: 'bold', fontSize: 20, padding: 15}]}>Калькуляторы сухой соли</Paragraph>
</View>
                                        <TouchableOpacity onPress={() => {navigation.navigate("KNO3")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>KNO3</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("K2SO4")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>K2SO4</Paragraph>
                                        </TouchableOpacity>

                                         <TouchableOpacity onPress={() => {navigation.navigate("KHCO3")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>KHCO3</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("KHCO3")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>KHCO3</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("K2CO3")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>K2CO3</Paragraph>
                                        </TouchableOpacity>

                                         <TouchableOpacity onPress={() => {navigation.navigate("CaCO3")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, fontSize: 20, padding: 25}]}>CaCO3</Paragraph>
                                        </TouchableOpacity>
</View>

<View style={[styles.item, {backgroundColor: colors.background2}]}>
<View style={ {backgroundColor: '#72D695',  borderRadius: 20, margin: 10}}>

                                           
                                          <Paragraph  style={[{color: colors.background2, fontWeight: 'bold', fontSize: 20, padding: 15}]}>Конвертёры</Paragraph>
</View>
                                        <TouchableOpacity onPress={() => {navigation.navigate("ConvertWaterVolume")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Конвертёр объёма воды</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("ConvertTemperature")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Конвертёр температуры</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("ConvertLength")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, borderBottomWidth: 1, borderBottomColor: theme.dark ? '#2E2E2E' : '#F2F2F2', fontSize: 20, padding: 25}]}>Конвертёр длины</Paragraph>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {navigation.navigate("ConvertWeight")}} style={{width: '100%'}}
                                           activeOpacity={0.5}  >
                                           
                                          <Paragraph  style={[{color: colors.text, fontSize: 20, padding: 25}]}>Конвертёр веса</Paragraph>
                                        </TouchableOpacity>
</View>



            </ScrollView>
        </AnimatedHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        
        borderRadius: 20,
        marginBottom: 20,
    },
});
