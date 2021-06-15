/**
*В данной папке находится код функций калькуляторов.
*Конвертер весов (граммы,миллиграммы, фунты)
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ConvertWeight = ({navigation}) => {

    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();


    const [weightMg, setWeightMg] = useState(null)//вес (миллиграмм)
    const [weightG, setWeightG] = useState(null)//вес (грамм)
    const [weightFunt, setWeightFunt] = useState(null)//вес (фунт)
   

    return (//рендер компонентов
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
                        
                        //инициализация переменной weightMg значением, введённым пользователем
                        placeholder="" onChangeText={text => setWeightMg(text)} value={weightMg} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из миллиграмм в граммы и фунты*/}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(weightMg / 1000)} граммов </Text>
                    <Text style={{color: colors.text}}> {(weightMg/453592).toFixed([7])} фунтов </Text>
                   
                    </View>
                    
                    </View>

                    <View>

                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Вес (грамм)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной weightG значением, введённым пользователем
                        placeholder="" onChangeText={text => setWeightG(text)} value={weightG} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из грамм в миллиграммы и фунты*/}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(weightG*1000 )} миллиграмм </Text>
                    <Text style={{color: colors.text}}> {(weightG / 454).toFixed([3])} фунтов </Text>
                   
                    </View>
 
                    </View>

                    <View>

                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Вес (фунт)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной weightFunt значением, введённым пользователем
                        placeholder="" onChangeText={text => setWeightFunt(text)} value={weightFunt} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод из фунтов в граммы и миллиграммы*/}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(weightFunt * 454)} граммов </Text>
                    <Text style={{color: colors.text}}> {(weightFunt * 453592)} миллиграмм </Text>
                   
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