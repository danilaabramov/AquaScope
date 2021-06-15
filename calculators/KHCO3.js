/**
*В данной папке находится код функций калькуляторов.
*Расчёт концентрации КHCO3
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const KHCO3 = ({navigation}) => {

    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();


    const [volume, setVolume] = useState(null)//объём аквариума (литры)
    const [solutionVol, setSolutionVol] = useState(null)//объём раствора (миллилитры)
    const [numOfSalt, setNumOfSalt] = useState(null)//количество сухой соли (граммы)
    

    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>KHCO3</Text>
            </View>

            <ScrollView   showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                
                <View>
                    
                <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём аквариума (литров)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной volume значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolume(text)} value={volume} placeholderTextColor={'#666'}/>
                    </View>

                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём раствора (миллилитров)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной solutionVol значением, введённым пользователем
                        placeholder="" onChangeText={text => setSolutionVol(text)} value={solutionVol} placeholderTextColor={'#666'}/>
                    </View>

                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Количество сухой соли (граммов)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //установка значения переменной numOfSalt значением, введённым пользователем
                        placeholder="" onChangeText={text => setNumOfSalt(text)} value={numOfSalt} placeholderTextColor={'#666'}/>
                    </View>
                    
                </View>

                <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    
                    <Text style={{color: colors.text}}>Концентрация после добавления 1 мл раствора KHCO3 </Text>
                    
                    {/*Расчёт концентрации Калия */}
                    <Text style={{color: colors.text}}>K: {(((0.640778841*numOfSalt/1.640778841)/solutionVol*1000/volume)).toFixed([3])} ppm </Text>
                    
                    {/*Расчёт концентрации HCO3 */}
                    <Text style={{color: colors.text}}>HCO3: {((((0.640778841*numOfSalt/1.640778841)*1.56060084)/solutionVol*1000/volume)).toFixed([3])} ppm</Text>
                    
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