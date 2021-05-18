import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {Caption, Paragraph} from "react-native-paper";
export const CalculatorScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    return (
        <View style={[styles.container, {marginTop: 50, paddingHorizontal: 10}]}>


        <View style={{  paddingHorizontal: 10, flexDirection: "row"}}>
        <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                               navigation.openDrawer()}}  />
                           <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 6}]}>Калькуляторы</Text></View>


                           <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{ paddingTop: 20}}>

<View style={[styles.item, {backgroundColor: colors.background2}]}>
                           <TouchableOpacity onPress={() => {navigation.navigate("AquariumVolume")} } style={{width: '100%'}}
                                                          >
                                       
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}> Объем аквариума</Paragraph>
                                        
                                        
                                        
                                        </TouchableOpacity>
</View>


<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("CO2Level")}} style={{width: '100%'}}
                                             >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>Уровень СО2</Paragraph>
                                        </TouchableOpacity>
</View>

<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("AquariumWater")}} style={{width: '100%'}}
                                                          >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>Подмена воды</Paragraph>
                                        </TouchableOpacity>
</View>
<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("WaterBalance")}} style={{width: '100%'}}
                                             >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>Водный баланс</Paragraph>
                                        </TouchableOpacity>
</View>





<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("ConvertWaterVolume")}} style={{width: '100%'}}
                                             >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>Конвертёр объёма воды</Paragraph>
                                        </TouchableOpacity>
</View>

<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("KNO3")}} style={{width: '100%'}}
                                             >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>KNO3</Paragraph>
                                        </TouchableOpacity>
</View>

<View style={[styles.item, {backgroundColor: colors.background2}]}>
                                        <TouchableOpacity onPress={() => {navigation.navigate("MixerRO")}} style={{width: '100%'}}
                                             >
                                           
                                          <Paragraph  style={[{color: '#72D695', fontWeight: 'bold', fontSize: 18}]}>Миксер RO</Paragraph>
                                        </TouchableOpacity>
</View>

            </ScrollView>
        </View>
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
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
