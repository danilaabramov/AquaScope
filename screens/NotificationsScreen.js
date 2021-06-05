import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, Button, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import Notifications from '../model/Notifications';
import {useTheme} from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import {ClockOfFood} from "./Timers";
import AsyncStorage from "@react-native-community/async-storage";
import AnimatedHeader from 'react-native-animated-header';

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
          repeatTime: time * 1000,
          groupSummary: true,
          ignoreInForeground: true,
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
    const [timers, setTimers] = useState([])
  const toggleNotification = async(index) => {
   
        if(listData[index].active){
          PushNotification.cancelLocalNotifications({id: listData[index].key});
        }
        else{

      

          let chanel = "com.aquascope" + listData[index].key
          showNotificationShedule("Оповещение", listData[index].title, index, listData[index].key, chanel, timers[index])
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

           
            {
                listData.map((data, index) => {
                    return (
                        <View style={[styles.item, {backgroundColor: colors.background2}]} key={data.key}>
                            <TouchableOpacity onPress={() => { toggleNotification(index)}} activeOpacity={0.5}>
                                <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between',}}>
                                    <View style={[styles.itemLeft, {flexDirection: 'row'}]}>
                                        <View style={[styles.square]}>
                                            <MaterialCommunityIcons name="bell-ring-outline" size={26} color={colors.text}/>
                                        </View>


<View>
                                        <Text style={[styles.itemText, {width: screenWidth - 140, color: '#899FFE'/*'#1f65ff'*/, fontWeight: 'bold', fontSize: 18}]}>{data.title}</Text>
                
                
                {
//listData[index].active ?
<View style={{ height: 20}}>
<ClockOfFood index={index} color={colors.text} data={listData} time={timers[index]} notif={notificationsDate}/>
</View>  
//:<View style={{ height: 20, width: 4}}/>
                }



</View>                


                                    <View pointerEvents="none">
                                       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={data.active ? '#899FFE' : "#f4f3f4"}
            value={data.active}
            
       
          />
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
