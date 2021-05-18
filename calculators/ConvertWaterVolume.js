import React, {useState} from 'react';
import {Keyboard, View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ConvertWaterVolume = ({navigation}) => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const {colors} = useTheme();
    const theme = useTheme();
    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)
    const [value3, setValue3] = useState(null)
    const [value4, setValue4] = useState(null)
    

    return (
        <View style={styles.container}>
            <View style={{marginTop: 5, paddingBottom: 10, flexDirection: "row"}}>
                <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.sectionTitle, {color: colors.text}]}>Конвертёр объёма воды</Text>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>


                     <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (литров)</Text>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue1(text)} value={value1} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value1 / 3.78787879).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(value1*1000).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(value1 / 4.54545455).toFixed([3])} галлонов (брит.) </Text>
                    <Text style={{color: colors.text}}> {(value1 *33.814).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(value1 *35.195).toFixed([3])} жидких унций (брит.) </Text>

                    </View>

                    
                    </View>


                    <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (миллилитров)</Text>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue2(text)} value={value2} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value2 / 3785.01136).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(value2/1000).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(value2 / 4545.45455).toFixed([3])} галлонов (брит.) </Text>
                    <Text style={{color: colors.text}}> {(value2 /29.5735494).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(value2 /28.4131269).toFixed([3])} жидких унций (брит.) </Text>

                    </View>

                    
                    </View>




                    <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (галлонов(брит.))</Text>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue3(text)} value={value3} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value3 * 1.20151515).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(value3*4.54545455).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(value3 *4545.45455).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(value3 * 153.7).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(value3 *159.977273).toFixed([3])} жидких унций (брит.) </Text>

                    </View>

                    
                    </View>


                    <View>



                     <View>
                        <Text style={{color: '#72D695', marginLeft: 10, marginTop: 20}}>Объём воды (жидких унций(брит.))</Text>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                        placeholder="" onChangeText={text => setValue4(text)} value={value4} placeholderTextColor={'#666'}/>
                    </View>


                    <View style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text, marginTop: 15, padding: 15}]}>
                    <Text style={{color: '#72D695', fontWeight: 'bold', marginBottom: 10}}>Результат:</Text>
                    <Text style={{color: colors.text}}> {(value4/ 133.17027).toFixed([3])} галлонов (США) </Text>
                    <Text style={{color: colors.text}}> {(value4*35.195).toFixed([3])} литров </Text>
                    <Text style={{color: colors.text}}> {(value4 *28.4131269).toFixed([3])} миллилитров </Text>
                    <Text style={{color: colors.text}}> {(value4/ 1.04084107).toFixed([3])} жидких унций (США) </Text>
                    <Text style={{color: colors.text}}> {(value4 /159.977273).toFixed([3])} галлонов (брит.) </Text>

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