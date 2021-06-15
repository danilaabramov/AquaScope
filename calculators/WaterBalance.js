/**
*В данной папке находится код функций калькуляторов.
*Расчёт водного баланса
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const WaterBalance = ({navigation}) => {
    
    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();


    const [volRO1, setVolRO1] = useState(null)//объём RO воды (литры)
    const [volPipes, setVolPipes] = useState(null)//объём водопроводной воды (литры)
    const [volRO2, setVolRO2] = useState(null)//объём RO воды
    const [ratio, setRatio] = useState(null)//соотношение воды
    const [volWater, setVolWater] = useState(null)//объём воды


    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Водный баланс RO</Text>
            </View>
            <ScrollView  showsVerticalScrollIndicator={false}>
                
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>RO вода (литров){"\n"}</Text>
                                <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                                
                                //инициализация переменной volRO1 значением, введённым пользователем
                                placeholder="" onChangeText={text => setVolRO1(text)} value={volRO1} placeholderTextColor={'#666'} />
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%'}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Водопроводная вода</Text>
                            <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            
                            //инициализация переменной volPipes значением, введённым пользователем
                            placeholder="" onChangeText={text => setVolPipes(text)} value={volPipes} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  




                    {/*расчёт соотношения RO воды и водопроводной воды и вычисление коэффициента соотношения воды */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}>Соотношение воды : 1: {volRO1 / volPipes} </Text>
                    <Text style={{color: colors.text}}>Коэффициент :   {(volRO1 / volPipes)*100} </Text>
                </View>


                    
                    <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды RO (литров)</Text>
                        <TextInput keyboardType='numeric' keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной volRO2 значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolRO2(text)} value={volRO2} placeholderTextColor={'#666'}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%', marginTop: 20}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Соотношение воды{"\n"}</Text>
                            <TextInput keyboardType='numeric' keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                            //инициализация переменной ratio значением, введённым пользователем
                            placeholder="" onChangeText={text => setRatio(text)} value={ratio} placeholderTextColor={'#666'}/>
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%', marginTop: 20}}>
                            <Text style={{color: '#72D695', marginLeft: 10}}>Объём  воды(литров) </Text>
                            <TextInput keyboardType='numeric' keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                            
                            //инициализация переменной volWater значением, введённым пользователем
                            placeholder="" onChangeText={text => setVolWater(text)} value={volWater} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  




                    
                </View>
                {/*расчёт количества воды, которую необходимо добавить для достижения нужного соотношения*/}
                <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    
                    <Text style={{color: colors.text}}>Нужно добавить - {volRO2 * volWater / ratio } литров водопроводной воды</Text>
                    
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
        padding: 10,
        fontSize: 17,
        borderRadius: 20
    },
    input: {
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
