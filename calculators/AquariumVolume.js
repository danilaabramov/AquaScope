/**
*В данной папке находится код функций калькуляторов.
*Калькулятор объёма аквариума
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AquariumVolume = ({navigation}) => {

     //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();

    //информация о линейных размерах аквариума
    const [lengthA, setLengthA] = useState(null)
    const [lengthB, setLengthB] = useState(null)
    const [height, setHeight] = useState(null)


    const [thickness, setThickness] = useState(null)//толщина стенок аквариума
    const [groundHeight, setGroundHeight] = useState(null)//толщина грунта

    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Объем аквариума</Text>
            </View>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <Caption style={[styles.caption, {color: "#9B9B9B"}]}>Прямоугольный аквариум</Caption>
                <Image style={{ width: screenWidth - 40, height: (screenWidth - 40) / 953 * 499}}

                //в зависимости от цветовой схемы устройства импортируем определённое изображение
                source={theme.dark ? require('./AquariumPryamWhite.png') : require('./AquariumPryamBlack.png')}/>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%'}}>
                            <Text style={{color: '#72D695', marginLeft: 20}}>Длина A(cm)</Text>
                                <TextInput  keyboardType='numeric'style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                                //инициализация переменной lengthA значением, введённым пользователем
                                placeholder="" onChangeText={text => setLengthA(text)} value={lengthA} placeholderTextColor={'#666'} />
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%'}}>
                            <Text style={{color: '#72D695', marginLeft: 20}}>Длина B(cm)</Text>
                            <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                             //инициализация переменной lengthB значением, введённым пользователем
                            placeholder="" onChangeText={text => setLengthB(text)} value={lengthB} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  
                    <View>
                        <Text style={{color: '#72D695', marginLeft: 20}}>Высота аквариума(cm)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                        //инициализация переменной height значением, введённым пользователем
                        placeholder="" onChangeText={text => setHeight(text)} value={height} placeholderTextColor={'#666'}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start', width: '49%', marginRight: '2%'}}>
                            <Text style={{color: '#72D695', marginLeft: 20}}>Толщина стекла(mm)</Text>
                            <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                            //инициализация переменной thickness значением, введённым пользователем
                            placeholder="" onChangeText={text => setThickness(text)} value={thickness} placeholderTextColor={'#666'}/>
                        </View>
                        <View style={{justifyContent: 'flex-end', width: '49%'}}>
                            <Text style={{color: '#72D695', marginLeft: 20}}>Высота грунта(cm)</Text>
                            <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                             //инициализация переменной groundHeight значением, введённым пользователем
                            placeholder="" onChangeText={text => setGroundHeight(text)} value={groundHeight} placeholderTextColor={'#666'}/>
                        </View>
                    </View>  
                </View>
                
                {/*//расчёт объёма аквариума по его длине, ширине, высоте и толщине стекла */}
                <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}>Объем: Брутто - {lengthA * lengthB * height / 1000} литров</Text>
                    <Text style={{color: colors.text}}>              Нетто - {lengthA * lengthB * height / 1000 - 
                    ((lengthA * lengthB + 2 * lengthA * height + 2 * lengthB * height) * thickness)/10000 } литров</Text>
                    <Text style={{marginTop: 10, color: colors.text}}>Вес грунта: {lengthA * lengthB * groundHeight * 0.0015} кг</Text>
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
