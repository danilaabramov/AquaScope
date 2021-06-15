/**
*В данной папке находится код окон приложения
*Окно уведомлений
*/

//Импорт элементов из библиотек
import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, Button, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import Notifications from '../model/Notifications';
import {useTheme} from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useFocusEffect} from '@react-navigation/native'
import {ClockOfFood} from "./Timers";
import AsyncStorage from "@react-native-community/async-storage";
import AnimatedHeader from 'react-native-animated-header';

export const NotificationsScreen = ({ navigation}) => {

PushNotification.configure({//настройка пуш-уведомлений, регистрация event-ов
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


const showNotificationShedule = (title, message, index, id, chanel, time) => {//функция отображения пуш-уведомления
  PushNotification.createChannel(//создание канала для передачи пуш-уведомления
      {
        channelId: chanel,//id канала
        channelName: chanel,//имя канала
        channelDescription: "A chanel to categorise your notifications",
        playSound: false,//звуковое оповещение при поступлении уведомления
        soundName: "default",
        importance: 4,
        vibrate: true,//вибрация
         
      }
    )

    PushNotification.localNotificationSchedule(//генерация уведомления
      {
          id: id,
          channelId: chanel,
          title: title,//заглавие уведомления
         message: message,//текст уведомления
         vibrate: true,
         vibration: 300,
         soundName: "default",
         date: new Date(Date.now() + 5000/* time * 1000*/) ,//время уведомления
         allowWhileIdle: true,
         repeatType: "time",
         repeatTime: time * 1000,//время повторения уведомления
         groupSummary: true
       }
   )
}

const showNotification = (title, message, index) => {
    PushNotification.createChannel(//не используется в работе
      {
        channelId: "com.aquascope",
        channelName: "com.aquascope",
        channelDescription: "A chanel to categorise your notifications",
        playSound: false,
        soundName: "default",
        importance: 4,
        vibrate: true,
      }
    )

    PushNotification.localNotification({
      channelId: "com.aquascope2",
      title: title,
      message: message,
      vibrate: true,
      vibration: 300,
      soundName: "default",
    })
}

  const [notificationsDate, setNotificationsDate] = useState([])

  //цветовая схема устройства
  const { colors } = useTheme();

  //размеры окна
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const [listData, setListData] = useState([])//массив даты и времени, в которое должен произойти вызов пуш-уведомления
  const [timers, setTimers] = useState([])//массив таймеров для отсчёта времени генерации уведомлений
  
  const toggleNotification = async(index) => {
   
        if(listData[index].active){
          PushNotification.cancelLocalNotifications({id: listData[index].key});
        }
        else{
          let chanel = "com.aquascope" + listData[index].key
          showNotificationShedule("Оповещение", listData[index].title, index, listData[index].key, chanel, timers[index])
          let notif = notificationsDate
          let d = new Date(Date.now())//текущие дата и время
          notif[index] = {
            year: d.getFullYear(),
            month: d.getMonth(),
            day: d.getDate(),
            hour: d.getHours(),
            min: d.getMinutes(),
            sec: d.getSeconds()
          }
          try {
            await AsyncStorage.setItem('notificationsDate', JSON.stringify([...notif]))//добавляем в локальную память новое уведомление
          } catch (e) { console.log(e) }
          setNotificationsDate([...notif])  
        }  
        let data = listData
        data[index].active = !data[index].active
        setListData([...data])
        try {
          await AsyncStorage.setItem('notifications', JSON.stringify([...data]))//добавляем в локальную память новую дату уведомления
        } catch (e) { console.log(e) }
  }

 useFocusEffect(useCallback (() => {
    setTimeout(async() => {

//расчёт времени между вызовами уведомлений
      let times = []
for (let index = 0; index < 3; ++index){
  let time = 60 * 60 * 12
      if(index === 1){
            let capacity = 0
            try {
              let aqua = [...JSON.parse(await AsyncStorage.getItem('Aquarium'))]
            capacity = aqua[0].capacity
            } catch (e) { 
            console.log(e) }

      
          
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
          }

           if(index === 2){
             time = 168 * 60 * 60
           }

          times = [
            ...times,
            time
          ]
}

setTimers([...times])

      try {
        setNotificationsDate([...JSON.parse(await AsyncStorage.getItem('notificationsDate'))])//получаем из локальной памяти дату вызова уведомления
      
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




      let data = []
    try {
        data = [...JSON.parse(await AsyncStorage.getItem('notifications'))]//получаем из локального хранилища информацию о дате вызова пуш-уведомления
        setListData([...data]);

         } catch (e) { console.log(e) 
         setListData( [
      
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
}, 0)
 }, []))




    return (//рендер компонентов
      <AnimatedHeader 
        style={{flex: 1, marginTop: 20, paddingHorizontal: 10}}
        title='Оповещения'
        renderLeft={() => ( <TouchableOpacity onPress={() => {navigation.openDrawer()}} style={{height: 50, width: 50, marginTop: 15, marginLeft: 20}}>
                    <Icon name="ios-menu" size={35}  color={colors.text}/>
                </TouchableOpacity>)}
        backStyle={{ left: 0 }}
        backTextStyle={{fontSize: 18, color: '#000'}}
        titleStyle={{ fontSize: 25, left: 30, bottom: 20, color: colors.text, fontWeight: 'bold' }}
        headerMaxHeight={120}
        toolbarColor={colors.background}
        disabled={false}
        noBorder={true}
      >

            
      
      
     <ScrollView showsVerticalScrollIndicator={false}>

           {/*Для каждого типа уведомления формируется свой таймер и свой тип уведомления*/}
            {
                listData.map((data, index) => {
                    return (
                        <View style={[styles.item, {backgroundColor: colors.background2}]} key={data.key}>
                            <TouchableOpacity onPress={() => { toggleNotification(index)}} activeOpacity={0.5}>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between',}}>
                                    <View style={[styles.itemLeft]}>
                                        <View style={[styles.square, {marginLeft: 10}]}>
                                            <MaterialCommunityIcons name="bell-ring-outline" size={26} color={colors.text}/>
                                        </View>
                                       
                                        <Text style={[styles.itemText, {width: screenWidth - 109, color: '#899FFE', fontSize: 18}]}>{data.title}</Text>
                
                <View style={{flexDirection: 'column'}}>
                {
<View style={{width: screenWidth - 40}}>
  {/*Таймер уведомления*/}
<ClockOfFood index={index} color={colors.text} data={listData} time={timers[index]} notif={notificationsDate}/>
</View>
                }



              


                                    <View pointerEvents="none" style={{marginRight: 20}}>
                                       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={data.active ? '#899FFE' : "#f4f3f4"}
            value={data.active}
            
       
          />
                                   </View>
 </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                 })
            }
      
        </ScrollView>
         </AnimatedHeader> 
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 25,
        top: 5
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 20,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,

        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 76,
        width: 150,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        width: 75,
        right: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    }
});
