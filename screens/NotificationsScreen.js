import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import Notifications from '../model/Notifications';
import {useTheme} from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import {ClockOfFood} from "./Timers";
import AsyncStorage from "@react-native-community/async-storage";

export const NotificationsScreen = ({ navigation}) => {

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


const showNotificationShedule = (title, message, index, id, chanel, time) => {
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
          date: new Date(Date.now() + time * 1000) ,
          allowWhileIdle: true,
          repeatType: "time",
          repeatTime: time * 1000
        }
    )
}

const showNotification = (title, message, index) => {
    PushNotification.createChannel(
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
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const [listData, setListData] = useState([])
  const toggleNotification = async(index) => {
   
        if(listData[index].active){
          PushNotification.cancelLocalNotifications({id: listData[index].key});
        }
        else{

          let chanel = "com.aquascope" + listData[index].key
          showNotificationShedule("Оповещение", listData[index].title, index, listData[index].key, chanel, 60)
          let notif = notificationsDate
          let d = new Date(Date.now())
          notif[index] = {
            year: d.getFullYear(),
            month: d.getMonth(),
            day: d.getDate(),
            hour: d.getHours(),
            min: d.getMinutes(),
            sec: d.getSeconds()
          }
          try {
            await AsyncStorage.setItem('notificationsDate', JSON.stringify([...notif]))
          } catch (e) { console.log(e) }
          setNotificationsDate([...notif])  
        }  
        let data = listData
        data[index].active = !data[index].active
        setListData([...data])
        try {
          await AsyncStorage.setItem('notifications', JSON.stringify([...data]))
        } catch (e) { console.log(e) }
  }

 useEffect( () => {
    setTimeout(async() => {

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




      let data = []
    try {
        data = [...JSON.parse(await AsyncStorage.getItem('notifications'))]
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
   }, [])




    return (
        <View style={[styles.container, {marginTop: 50}]}>



            <View style={{  paddingHorizontal: 20, paddingBottom: 0, flexDirection: "row"}}>
                <Icon.Button name="ios-menu" size={35}  color={colors.text} backgroundColor={colors.background} onPress={() => {
                    navigation.openDrawer()}}  />
                    <Text style={[styles.sectionTitle, {color: colors.text, marginTop: 6}]}>Оповещения</Text>
            </View>

            
      
      
   

            <View style={styles.tasksWrapper}>
            {
                listData.map((data, index) => {
                    return (
                        <View style={[styles.item, {backgroundColor: colors.background2}]} key={data.key}>
                            <TouchableOpacity onPress={() => { toggleNotification(index);}}>
                                <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between',}}>
                                    <View style={[styles.itemLeft, {flexDirection: 'row'}]}>
                                        <View style={[styles.square]}>
                                            <MaterialCommunityIcons name="bell-ring-outline" size={26} color={colors.text}/>
                                        </View>
                                        <Text style={[styles.itemText, {width: screenWidth - 140, color: '#899FFE'/*'#1f65ff'*/, fontWeight: 'bold', fontSize: 18}]}>{data.title}</Text>
                                  
                                    <View pointerEvents="none">
                                       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={data.active ? '#899FFE' : "#f4f3f4"}
            value={data.active}
            
       
          />
                                   </View>


<ClockOfFood index={index} color={colors.text} date={listData} time={60} notif={notificationsDate}/>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                 })
            }
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tasksWrapper: {
        marginTop: 15,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
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
