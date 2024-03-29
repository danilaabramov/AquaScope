/**
*В данной папке находится код функций калькуляторов.
*Калькулятор уровня содержания СО2
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const CO2Level = ({navigation}) => {

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();

    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const [PHValue, setPHValue] = useState(null)//текущее значение pH
    const [KHLevel, setKHLevel] = useState(null)//текущий уровень KH


    return (//рендер компонентов
        <View style={styles.container}>


<View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}} >
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>Уровень СО2</Text></View>

         <ScrollView  showsVerticalScrollIndicator={false} >
         <Image style={{ width: screenWidth - 40, height: (screenWidth - 40) / 809 * 446}}

                //в зависимости от цветовой схемы устройства импортируем определённое изображение
                source={theme.dark ? require('./AquariumCO2.jpg') : require('./AquariumCO2.jpg')}/>

<View>

<Text style={{color: '#72D695', marginLeft: 20}}>Текущее значение pH</Text>
<View style={styles.inputWrapper}>
  <TextInput keyboardType='numeric'
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

   //инициализация переменной PHValue значением, введённым пользователем
    placeholder="" onChangeText={text => setPHValue(text)} value={PHValue}
      placeholderTextColor={'#666'} />
       </View>


       <Text style={{color: '#72D695', marginLeft: 20}}>Текущий уровень KH</Text>
       <View style={styles.inputWrapper}>
  <TextInput keyboardType='numeric'
   style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

   //инициализация переменной KHLevel значением, введённым пользователем
    placeholder="" onChangeText={text => setKHLevel(text)} value={KHLevel}
      placeholderTextColor={'#666'}/>
       </View>
</View>


{/*Расчёт уровня СО2 в воде:*/}
<View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
<Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>

    <Text style={{color: colors.text}}>{(KHLevel * 3.2 * 10**(7 - PHValue)).toFixed(3)} ppm</Text>

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
    inputWrapper: {
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
     writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
