/**
*В данной папке находится код окон приложения
*Окно создания нового аквариума
*/

//Импорт элементов из библиотек
import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Keyboard } from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import PushNotification from "react-native-push-notification";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export const CreateAquarium = ({navigation}) => {

  //цветовая схема окна
  const {colors} = useTheme();
  const theme = useTheme();

  //размер окна
  const screenWidth = Dimensions.get('screen').width;


const [name, setName] = useState(null)//название аквариума
const [type, setType] = useState(null)//тип аквариума
const [capacity, setCapacity] = useState(null)//ёмкость аквариума
const [date, setDate] = useState('')//дата создания аквариума
  const [notificationsDate, setNotificationsDate] = useState([])
     const [listNotification, setListNotification] = useState([])

const [aquarium, setAquarium] = useState([{//по умолчанию создаётся пустой аквариум без данных
                isAquarium: false,
                name: '',
                type: '',
                capacity: '',
                date: ''
            }])

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

    const showNotificationShedule = (title, message, index, id, chanel, time, time2) => {//функция отображения пуш-уведомления
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
          date: new Date(Date.now() + time2 * 1000) ,//время уведомления
          allowWhileIdle: true,
          repeatType: "time",
          repeatTime: time * 1000,//время повторения уведомления
          groupSummary: true
        }
    )
}

const handleAddAquarium = async () => {//алгоритмы запуска аквариума и расчёта времени генерации уведомлений
  //время между генерацией уведомления зависит от ёмкости аквариума и от количества рыбок в аквариуме
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
        let chanel = "com.aquascope" + listNotification[1].key //инициализируем канал для передачи пуш-уведомления
        showNotificationShedule("Оповещение", listNotification[1].title, 1, listNotification[1].key, chanel, time, seconds)//генерация уведомления
    }  
        try {//помещаем в локальное хранилище информацию об аквариуме
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
         setListNotification( [//список уведомлений
      
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
        setNotificationsDate([...JSON.parse(await AsyncStorage.getItem('notificationsDate'))])//получаем дату формирования уведомления из локальной памяти
      
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
              let date = [...JSON.parse(await AsyncStorage.getItem('Aquarium'))]//инициализация аквариума из локальной памяти
                setName(date[0].name)
                 setType(date[0].type)
                setCapacity(date[0].capacity)
                setDate(date[0].date)

        } catch (e) { 
            console.log(e) }

        }, 0)
    }, []))
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

   const handleConfirm = (d) => {
       
   setDatePickerVisibility(false);
    setDate(d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear())
   
  };

    return (//рендер элемента
        <View style={[styles.container, {marginTop: 50, paddingHorizontal: 10}]}>
<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

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
                   
                   
                    <TouchableOpacity onPress={() => setDatePickerVisibility(d => !d)} style={[styles.inputWrapper,styles.textInput, {backgroundColor: colors.background2}]}>
                     <Text style={{fontSize: 20, color: colors.text}}>{date}</Text>
                     </TouchableOpacity>



            </ScrollView>
        
         </View>
    );
};

const styles = StyleSheet.create({//константа, в которой содержится определение стилей контейнеров и их свойства
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
