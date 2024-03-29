/**
*В данной папке находится код функций калькуляторов.
*расчёт количества воды с нужным значением GH
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const MixerRO = ({navigation}) => {
    
    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();


    const [desVol, setDesVol] = useState(null)//желаемый объём воды с нужной концентрацией
    const [desGH, setDesGH] = useState(null)//желаемое значение GH
    const [valGH, setValGH] = useState(null)//значение GH водопроводной   воды
    const [valGHRO, setValGHRO] = useState(null)//Значение GH RO воды

    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Миксер RO</Text>
            </View>
            <ScrollView  showsVerticalScrollIndicator={false}>
                
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Желаемый объём воды (литров)</Text>
                                <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                                //инициализация переменной desVol значением, введённым пользователем
                                placeholder="" onChangeText={text => setDesVol(text)} value={desVol} placeholderTextColor={'#666'} />
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Желаемое значение GH</Text>
                            <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            
                            //инициализация переменной desGH значением, введённым пользователем
                            placeholder="" onChangeText={text => setDesGH(text)} value={desGH} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  


                   
                </View>


                    
                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}> Значение GH водопроводной воды </Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной valGH значением, введённым пользователем
                        placeholder="" onChangeText={text => setValGH(text)} value={valGH} placeholderTextColor={'#666'}/>
                    </View>

                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}> Значение GH RO воды </Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной valGHRO значением, введённым пользователем
                        placeholder="" onChangeText={text => setValGHRO(text)} value={valGHRO} placeholderTextColor={'#666'}/>
                    </View>



                   {/*расчёт количества водопроводной и RO воды для нужного значения GH*/}
                <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    
                    <Text style={{color: colors.text}}>Для {desVol} литров нужно смешать {(desVol-(desGH*desVol-desVol*valGH)/(valGHRO-valGH)).toFixed([3])} литров водопроводной воды и {((desGH*desVol-desVol*valGH)/(valGHRO-valGH)).toFixed([3])} литров RO воды</Text>
                    
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({//константа в которой содержится определение стилей контейнеров и их свойства
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 15,
    },
    textInput: {
       
        marginTop: 30,
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