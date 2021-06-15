/**
*В данной папке находится код функций калькуляторов.
*Конвертер длины (сантиметры-миллиметры-дюймы)
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ConvertLength = ({navigation}) => {

    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();

    //
    const [lengthSm, setLengthSm] = useState(null)//длина (сантиметры)
    const [lengthMm, setLengthMm] = useState(null)//длина (миллиметры)
    const [lengthInch, setLengthInch] = useState(null)//длина (дюймы)
   

    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Конвертёр длины</Text>
            </View>
            <ScrollView   showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                     <View>
                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Длина (сантиметр)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной lengthSm значением, введённым пользователем
                        placeholder="" onChangeText={text => setLengthSm(text)} value={lengthSm} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из сантиметров в миллиметры и дюймы */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(lengthSm * 10)} миллиметров </Text>
                    <Text style={{color: colors.text}}> {(lengthSm/2.54).toFixed([3])} дюймов </Text>
                   
                    </View>

                    </View>

                    <View>

                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Длина (миллиметр)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной lengthMm значением, введённым пользователем
                        placeholder="" onChangeText={text => setLengthMm(text)} value={lengthMm} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из миллиметров в сантиметры и дюймы */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(lengthMm/10 ).toFixed([3])} сантиметров </Text>
                    <Text style={{color: colors.text}}> {(lengthMm/ 25.4).toFixed([3])} дюймов </Text>
                   
                    </View>
                    
                    </View>

                    <View>

                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Длина (дюйм)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной lengthInch значением, введённым пользователем
                        placeholder="" onChangeText={text => setLengthInch(text)} value={lengthInch} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из дюймов в миллиметры и сантиметры */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(lengthInch * 2.54)} сантиметров </Text>
                    <Text style={{color: colors.text}}> {(lengthInch* 25.4).toFixed([3])} миллиметров </Text>
                   
                    </View>

                    
                    </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({//константа в которой содержится определение стилей контейнеров и их свойства
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