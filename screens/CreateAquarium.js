import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Keyboard } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import PushNotification from "react-native-push-notification";

export const CreateAquarium = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
      const screenWidth = Dimensions.get('screen').width;

const [name, setName] = useState(null)
const [type, setType] = useState(null)
const [capacity, setCapacity] = useState(null)
const [date, setDate] = useState(null)
  const [notificationsDate, setNotificationsDate] = useState([])
     const [listNotification, setListNotification] = useState([])

const [aquarium, setAquarium] = useState([{
                isAquarium: false,
                name: '',
                type: '',
                capacity: '',
                date: ''
            }])

            PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

    const showNotificationShedule = (title, message, index, id, chanel, time, time2) => {
    PushNotification.createChannel(
      {
        channelId: chanel,
        channelName: chanel,
        channelDescription: "A chanel to categorise your notifications",
        playSound: false,
        soundName: "default",
        importance: 4,
        vibrate: true,
         
      }
    )

    PushNotification.localNotificationSchedule(
       {
           id: id,
           channelId: chanel,
           title: title,
          message: message,
          vibrate: true,
          vibration: 300,
          soundName: "default",
          date: new Date(Date.now() + time2 * 1000) ,
          allowWhileIdle: true,
          repeatType: "time",
          repeatTime: time * 1000,
          groupSummary: true,
          ignoreInForeground: true,
        }
    )
}

const handleAddAquarium = async () => {
    let time = 0
    if(capacity < 70) time = 60 * 60 * 168
    else if(capacity >= 70 && capacity < 100) time = 60 * 60 * 336
    else time = 60 * 60 * 672
    let fishes = []
    try {
        fishes = [...JSON.parse(await AsyncStorage.getItem('fishItems'))]
    } catch (e) { console.warn(e) }
    if(capacity < 70) time += 0
    else if(capacity >= 70 && capacity < 100) time -= fishes.length * 0.5 * 60 * 60
    else time -= fishes.length * 0.3 * 60 * 60
    let d = notificationsDate
    let a = new Date(Date.now())
    let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())
    let utc2 = Date.UTC(d[1].year, d[1].month, d[1].day, d[1].hour, d[1].min, d[1].sec)
    let seconds = Math.floor((utc2 - utc1) / 1000)
    seconds += (Math.abs(Math.floor(seconds / time))) * time
    if(listNotification[1].active){
        PushNotification.cancelLocalNotifications({id: listNotification[1].key});
        let chanel = "com.aquascope" + listNotification[1].key
        showNotificationShedule("Оповещение", listNotification[1].title, 1, listNotification[1].key, chanel, time, seconds)
    }  
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
        let data = [...JSON.parse(await AsyncStorage.getItem('notifications'))]
        setListNotification([...data]);

         } catch (e) { console.log(e) 
         setListNotification( [
      
            {
                key: 1,
                title: 'Покормить рыбок',
                active: false
            },
            {
                key: 2,
                title: 'Почистить аквариум',
                active: false
               
            },
            {
                key: 3,
                title: 'Поменять воду в аквариуме',
                active: false
               
            }
        ])}


try {
        setNotificationsDate([...JSON.parse(await AsyncStorage.getItem('notificationsDate'))])
      
    } catch (e) {
      console.log(e)
         setNotificationsDate([{
           year: 0,
           month: 0,
           day: 0,
           hour: 0,
           min: 0,
           sec: 0
         },
         {
           year: 0,
           month: 0,
           day: 0,
           hour: 0,
           min: 0,
           sec: 0
         },
         {
           year: 0,
           month: 0,
           day: 0,
           hour: 0,
           min: 0,
           sec: 0
         }])
    }
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
