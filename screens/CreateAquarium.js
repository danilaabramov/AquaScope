import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Keyboard } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'

export const CreateAquarium = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
      const screenWidth = Dimensions.get('screen').width;

const [name, setName] = useState(null)
const [type, setType] = useState(null)
const [capacity, setCapacity] = useState(null)
const [date, setDate] = useState(null)
const [aquarium, setAquarium] = useState([{
                isAquarium: false,
                name: '',
                type: '',
                capacity: '',
                date: ''
            }])
  const handleAddAquarium = async () => {
      

        try {
            await AsyncStorage.setItem('Aquarium', JSON.stringify([{
            isAquarium: true,
            name: name,
            type: type,
            capacity: capacity,
            date: date
        }]));
        } catch (e) {
            console.log(e)
        }
    }


    useFocusEffect(useCallback (() => {
        setTimeout(async() => {
            try {
              //  setAquarium([...JSON.parse(await AsyncStorage.getItem('Aquarium'))]);
              let date = [...JSON.parse(await AsyncStorage.getItem('Aquarium'))]
                setName(date[0].name)
                 setType(date[0].type)
                setCapacity(date[0].capacity)
                setDate(date[0].date)

        } catch (e) { 
            console.log(e) }

        }, 0)
    }, []))

    return (
        <View style={[styles.container, {marginTop: 50, paddingHorizontal: 10}]}>


        <View style={{  paddingHorizontal: 10, flexDirection: "row"}}>
       <TouchableOpacity style={{height: '100%', width: 50}} onPress={() => {navigation.goBack(); Keyboard.dismiss()}}>
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
  <View style={{  width: screenWidth - 80, alignItems: 'flex-end'}}>
                   <TouchableOpacity style={[styles.closeBtnWrapper, { width: 50}]} onPress={() => {handleAddAquarium();navigation.goBack(); Keyboard.dismiss()}}>
                                <MaterialCommunityIcons style={styles.closeModal} name="check" size={35} color={colors.text}/>
                            </TouchableOpacity>
                              </View>
                        </View>


                           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={{ paddingTop: 20}}>


<Text style={{fontSize: 20, marginLeft: 10, color: "#009387"}}>Название</Text>
                    <View style={[styles.inputWrapper]}>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                         onChangeText={text => setName(text)} value={name} placeholderTextColor={'#666'}/>
                    </View>

                    <Text style={{fontSize: 20, marginLeft: 10, color: "#009387"}}>Тип</Text>
                    <View style={[styles.inputWrapper]}>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                         onChangeText={text => setType(text)} value={type} placeholderTextColor={'#666'}/>
                    </View>

                    <Text style={{fontSize: 20, marginLeft: 10, color: "#009387"}}>Вместимость (в литрах)</Text>
                    <View style={[styles.inputWrapper]}>
                        <TextInput keyboardType='numeric' style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                         onChangeText={text => setCapacity(text)} value={capacity} placeholderTextColor={'#666'}/>
                    </View>

                    <Text style={{fontSize: 20, marginLeft: 10, color: "#009387"}}>Дата запуска</Text>
                    <View style={[styles.inputWrapper]}>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                         onChangeText={text => setDate(text)} value={date} placeholderTextColor={'#666'}/>
                    </View>



            </ScrollView>
        
         </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        marginTop: 15
    },
    textInput: {
        padding: 15,
        fontSize: 18,
        borderRadius: 20
    },
});
