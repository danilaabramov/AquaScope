/**
*В данной папке находится код функций калькуляторов.
*Конвертер объёма воды (литры-миллилитры-галлоны-жидкие унции)
*/

//Импорт элементов из библиотек
import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const ConvertWaterVolume = ({navigation}) => {
    
    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const {colors} = useTheme();
    const theme = useTheme();

    const [volL, setVolL] = useState(null)//объём воды в литрах
    const [volML, setVolML] = useState(null)//объём воды в миллилитрах
    const [volGal, setVolGal] = useState(null)//объём воды в галлонах
    const [volUnc, setVolUnc] = useState(null)//объём воды в жидких унциях
    

    return (//рендер компонентов
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Конвертёр объёма воды</Text>
            </View>
            <ScrollView  showsVerticalScrollIndicator={false}>


                     <View>
                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (литров)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной volL значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolL(text)} value={volL} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод значений из литров в другие системы измерений */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(volL / 3.78787879).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(volL*1000).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(volL / 4.54545455).toFixed([3])} галлонов (брит.) </Text>
                    <Text style={{color: colors.text}}> {(volL *33.814).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(volL *35.195).toFixed([3])} жидких унций (брит.) </Text>

                    </View>
                        </View>
                 <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (миллилитров)</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                        //инициализация переменной volML значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolML(text)} value={volML} placeholderTextColor={'#666'}/>
                     </View>

                    
                    {/*//перевод значений из миллилитров в другие системы измерений */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(volML / 3785.01136).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(volML /1000).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(volML / 4545.45455).toFixed([3])} галлонов (брит.) </Text>
                    <Text style={{color: colors.text}}> {(volML /29.5735494).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(volML /28.4131269).toFixed([3])} жидких унций (брит.) </Text>

                    </View>

                 </View>
                    
                    <View>
                    
                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (галлонов(брит.))</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        
                        //инициализация переменной volGal значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolGal(text)} value={volGal} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод значений из галлонов в другие системы измерений */}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(volGal * 1.20151515).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(volGal*4.54545455).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(volGal *4545.45455).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(volGal * 153.7).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(volGal *159.977273).toFixed([3])} жидких унций (брит.) </Text>
                    
                    </View>
                    
                    </View>
                    
                    <View>
                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (жидких унций(брит.))</Text>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}

                        //инициализация переменной volUnc значением, введённым пользователем
                        placeholder="" onChangeText={text => setVolUnc(text)} value={volUnc} placeholderTextColor={'#666'}/>
                    </View>

                    {/*перевод значений из жидких унций в другие системы измерений*/}
                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(volUnc/ 133.17027).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(volUnc*35.195).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(volUnc *28.4131269).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(volUnc/ 1.04084107).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(volUnc /159.977273).toFixed([3])} галлонов (брит.) </Text>

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
        fontSize: 22,
        fontWeight: 'bold'
    },
});