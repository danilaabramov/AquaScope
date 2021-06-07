import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ConvertWeight = ({navigation}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const {colors} = useTheme();
    const theme = useTheme();
    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)
    const [value3, setValue3] = useState(null)
   

    return (
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Конвертёр веса</Text>
            </View>
            <ScrollView   showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>


                     <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Вес (миллиграмм)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue1(text)} value={value1} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value1 / 1000)} граммов </Text>
                    <Text style={{color: colors.text}}> {(value1/453592).toFixed([7])} фунтов </Text>
                   
                    </View>

                    
                    </View>


                    <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Вес (грамм)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue2(text)} value={value2} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value2*1000 )} миллиграмм </Text>
                    <Text style={{color: colors.text}}> {(value2 / 454).toFixed([3])} фунтов </Text>
                   
                    </View>

                    
                    </View>




                    <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Вес (фунт)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue3(text)} value={value3} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value3 * 454)} граммов </Text>
                    <Text style={{color: colors.text}}> {(value3* 453592)} миллиграмм </Text>
                   
                    </View>

                    
                    </View>


                   













            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 20,
    },
    textInput: {
        marginTop: 20,
        padding: 10,
        fontSize: 17,
        borderRadius: 20
    },
    input: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});