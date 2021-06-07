import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View, Text, StyleSheet, Keyboard, ScrollView, Alert, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from "@react-navigation/native";
import {Petuh} from "../components/Petuh"
import {FishClown} from "../components/FishClown"
import {FishOrange2} from "../components/FishOrange2";;
import {FishOrange} from "../components/FishOrange";
import {Scalaria} from "../components/Scalaria";
import {FishBlue} from "../components/FishBlue";
import {Petsilia} from "../components/Petsilia";
import {Antsistrus} from "../components/Antsistrus";
import {Cumeta} from "../components/Cumeta";
import {Molinezia} from "../components/Molinezia";
import {ClownLoach} from "../components/ClownLoach";
import {Ternetsia} from "../components/Ternetsia";
import {Labeo} from "../components/Labeo";
import {Teleskop} from "../components/Teleskop";
import {Gurami} from "../components/Gurami";
import {BigTail} from "../components/BigTail";
import {NanoFish} from "../components/NanoFish";
import {Koridoras} from "../components/Koridoras";
import {SwordBill} from "../components/SwordBill";
import {Danio} from "../components/Danio";
import {Barbus} from "../components/Barbus";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Caption, Paragraph} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'
import fishList from '../model/Manual';
import PushNotification from "react-native-push-notification";

export const FishScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const [name, setName] = useState(null)
    const [title, setTitle] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [icon, setIcon] = useState("FishClown")
    const [fishItems, setFishItems] = useState([]);
    const[isLoading, setIsLoading] = useState(false)
  const [notificationsDate, setNotificationsDate] = useState([])
     const [listNotification, setListNotification] = useState([])


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

    useEffect( () => {
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
        }, 0)
        let cleanupFunction = false;
        if(!cleanupFunction){
            setTimeout(async() => {
            try {
                setFishItems([...JSON.parse(await AsyncStorage.getItem('fishItems'))]);
            } catch (e) { console.log(e) }
            setIsLoading(true)
            navigation.navigate("HomeDrawer")
        }, 0)
        }
        return () => cleanupFunction = true;
    }, [])

    const handleAddFish = async () => {
            let time = 0
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
            else if(capacity >= 70 && capacity < 100) time -= (fishes.length + 1) * 0.5 * 60 * 60
            else time -= (fishes.length + 1) * 0.3 * 60 * 60
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

    



        let data = {
            key: fishItems.length.toString(),
            name: name,
            title: title,
            details: '',
            quantity: quantity,
            ico: icon
        }
        setFishItems([...fishItems, data])
        setName(null)
        setTitle(null)
        setQuantity(null)
        setIcon("FishClown")
        setIsModalVisible(false);
        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...fishItems, data]));
        } catch (e) {
            console.log(e)
        }
    }

    const completeFish = async (index) => {
            let time = 0
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
            else if(capacity >= 70 && capacity < 100) time -= (fishes.length - 1) * 0.5 * 60 * 60
            else time -= (fishes.length - 1) * 0.3 * 60 * 60
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


        let itemsCopy = [...fishItems]
        itemsCopy.splice(index, 1);
        setFishItems(itemsCopy)
        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify([...itemsCopy]));
        } catch (e) {
            console.log(e)
        }
    }

    const changeFish = async (index) => {
        Keyboard.dismiss()
        let data = {
            key: fishItems.length.toString(),
            name: name,
            title: title,
            details: '',
            quantity: quantity,
            ico: icon
        }
        let items = [
            ...fishItems.slice(0, index),
            fishItems[index] = data,
            ...fishItems.slice(index + 1)
        ]
        setFishItems(items)
        setName(null)
        setTitle(null)
        setIcon("FishClown")
        setQuantity(null)
        setIsModalVisible(false);
        setIsModalFish(false)
        try {
            await AsyncStorage.setItem('fishItems', JSON.stringify(items));
        } catch (e) {
            console.log(e)
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isTabVisible, setIsTabVisible] = useState(false)

    const openModal = async () => {
      setIsModalVisible(true);
    }

    const closeModal = () => {
       setName(null)
        setTitle(null)
        setQuantity(null)
        setIcon("FishClown")
        setIsModalVisible(false);
        setIsModalFish(false)
      
    }

    const [isModalFish, setIsModalFish] = useState(false)
    const [modalIndex, setModalIndex] = useState(false)

    const openModalFish =  (index) => {
      setIsModalVisible(true);
        setName(fishItems[index].name === null ? "" : fishItems[index].name)
        setTitle(fishItems[index].title === null ? "" : fishItems[index].title)
        setQuantity(fishItems[index].quantity === null ? "1" : fishItems[index].quantity.toString())
        setIcon(fishItems[index].ico === null ? "FishClown" : fishItems[index].ico.toString())
        setIsModalFish(true)
        setModalIndex(index)
    }

    const openDeleteAlert = (index) => {
        Alert.alert(
            "Вы действительно хотите удалить рыбку?", "",
            [
                {text: 'да', onPress: () => completeFish(index)},
                {text: 'нет'}
            ]
        )
    }
    if( !isLoading ) {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: "white"}}>
              <ActivityIndicator size="large"/>
               <LottieView source={require('../components/6729-fish.json')} autoPlay loop/>
            </View>
        );
    }
    return (
            <View style={[styles.container, {backgroundColor: colors.background}]}>
                <StatusBar backgroundColor={colors.background}/>
                {
                    !isLoading ? null : <View style={{ paddingTop: 55, paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row"}}>
                        <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                        </TouchableOpacity>
                        <Text style={[styles.sectionTitle, {color: colors.text}]}>Список рыбок</Text>
                    </View>
                }
                {
                    !isLoading ? null : <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                        <View style={styles.tasksWrapper}>
                            <View style={styles.items}>
                                {
                                    fishItems.map((item, index) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => openModalFish(index)} key={index}
                                            style={[styles.item, {backgroundColor: colors.background2}]}>
                                                <View style={[styles.itemLeft, {width: '75%'}]}>
                                                    <View style={[styles.square]}>
                                                        {
                                                            item.ico === "FishClown" ? <FishClown />
                                                            :  item.ico === "FishBlue" ? <FishBlue/>
                                                            :  item.ico === "FishOrange" ? <FishOrange/>
                                                            :  item.ico === "FishOrange2" ? <FishOrange2/>
                                                            :  item.ico === "ClownLoach" ? <ClownLoach/>
                                                            :  item.ico === "NanoFish" ? <NanoFish/>
                                                            :  item.ico === "SwordBill" ? <SwordBill/>
                                                            :  item.ico === "Petuh" ? <Petuh/>
                                                            :  item.ico === "Scalaria" ? <Scalaria/>
                                                            :  item.ico === "BigTail" ? <BigTail/>
                                                            :  item.ico === "Barbus" ? <Barbus/>
                                                            :  item.ico === "Ternetsia" ? <Ternetsia/>
                                                            :  item.ico === "Danio" ? <Ternetsia/>
                                                            :  item.ico === "Petsilia" ? <Petsilia/>
                                                            :  item.ico === "Antsistrus" ? <Antsistrus/>
                                                            :  item.ico === "Molinezia" ? <Molinezia/>
                                                            :  item.ico === "Koridoras" ? <Koridoras/>
                                                            :  item.ico === "Gurami" ? <Gurami/>
                                                            :  item.ico === "Cumeta" ? <Cumeta/>
                                                            :  item.ico === "Labeo" ? <Labeo/>
                                                            :  item.ico === "Teleskop" ? <Teleskop/>
                                                            : null
                                                    }
                                                    </View>
                                                    <View>
                                                    {
                                                        item.name === '' || item.name === null ? null :
                                                        <Paragraph style={[styles.paragraph, styles.caption, {color: colors.text, marginLeft: 10}]}>
                                                        {item.name}</Paragraph>
                                                    }
                                                    {
                                                        item.title === '' || item.title === null ? null :
                                                        <Caption style={[styles.caption, {color: theme.dark ?  "rgba(255,255,255, 0.5)"
                                                        : "rgba(0,0,0, 0.5)", marginLeft: 10}]}>{item.title}</Caption>
                                                    }
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={() => openDeleteAlert(index)}>
                                                    <MaterialCommunityIcons name="close" size={26} color={colors.text}/>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                }
                {
                    !isLoading ? null: <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeTaskWrapper}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => openModal()}>
                            <View style={[styles.addWrapper, {backgroundColor: theme.dark ? '#004943' : '#009387', marginRight: 20}]}>
                                <Text style={[styles.addText, {color: "white"}]}>+</Text>
                            </View>
                        </TouchableOpacity>
                     </KeyboardAvoidingView>
                }
                {
                    isModalVisible ? <Animatable.View animation="lightSpeedIn"
                    style={[styles.modelContentWrapper, {backgroundColor: colors.background}]}>
                    <View style={{flexDirection: 'row', margin: 15, marginBottom: 0}}>
                        <TouchableOpacity style={[{paddingLeft: 5}, styles.closeBtnWrapper]} onPress={() => closeModal()} >
                            <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                        </TouchableOpacity>
                        {
                            isModalFish ? 
                              <View style={{  width: screenWidth - 70, alignItems: 'flex-end'}}>
                              <TouchableOpacity style={[styles.closeBtnWrapper, {width: 50}]} onPress={() => changeFish(modalIndex)}>
                                <MaterialCommunityIcons style={styles.closeModal} name="check" size={35} color={colors.text}/>
                            </TouchableOpacity>
                             </View>
                            :<View style={{  width: screenWidth - 70, alignItems: 'flex-end'}}>
                            <TouchableOpacity style={[styles.closeBtnWrapper, {width: 50}]} onPress={() => handleAddFish()}>
                                <MaterialCommunityIcons style={styles.closeModal} name="check" size={35} color={colors.text}/>
                            </TouchableOpacity>
                               </View>
                        }

                    </View>
                     <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'  showsVerticalScrollIndicator={false} style={{padding: 15}}>
                    <Text style={{fontSize: 20, marginLeft: 10, color: "#009387"}}>Имя рыбки</Text>
                    <View style={[styles.inputWrapper]}>
                        <TextInput style={[styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}
                         onChangeText={text => setName(text)} value={name} placeholderTextColor={'#666'}/>
                    </View>
                    <Text style={{fontSize: 20, marginLeft: 10, color: "#009387", marginTop: 10}}>Научное название рыбки</Text>
                { 
                    isTabVisible ? <View>
                        <View style={[styles.inputWrapper, styles.textInput, {backgroundColor: colors.background2, color: colors.text}]}>
                            <TouchableOpacity  activeOpacity={0.8} style={{padding: 10, backgroundColor: colors.background, borderRadius: 20}}
                            onPress={() => {Keyboard.dismiss(); setIsTabVisible(vis => !vis)}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: colors.text, width: '90%', fontSize: 18}}>  {title}</Text>  
                                    <Text style={{color: colors.text, fontSize: 18}}> ↓</Text>  
                                </View>
                            </TouchableOpacity>
                            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                            {
                                fishList.sort(function (a, b) {
            if (a.title > b.title) return 1
            if (a.title < b.title) return -1
            return 0;
            }).map((item, index) => {
                                    return(
                                        <TouchableOpacity style={{paddingVertical: 10}} key={index}
                                        onPress={() => {setTitle( item.title); setIsTabVisible(false); Keyboard.dismiss()}}>
                                            <Text style={{color: colors.text, fontSize: 18}}>  {item.title}</Text>  
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </ScrollView>
                        </View>
                    </View>
                    : <View style={[styles.textInput, styles.inputWrapper, {backgroundColor: colors.background2, padding: 0}]}>
                        <TouchableOpacity 
                            onPress={() => setIsTabVisible(vis => !vis)}>
                            <Text style={{color: colors.text, fontSize: 18, padding: 15}}>{title}</Text>  
                        </TouchableOpacity>
                    </View>
                }
                        <View style={{alignItems: 'center'}}>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("Teleskop"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Teleskop" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Teleskop/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("FishOrange"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "FishOrange" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0, margin: 5}]}>
                                    <FishOrange/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("FishBlue"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "FishBlue" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <FishBlue/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("FishOrange2"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "FishOrange2" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <FishOrange2/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("ClownLoach"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "ClownLoach" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <ClownLoach/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("NanoFish");Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "NanoFish" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <NanoFish/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("SwordBill"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "SwordBill" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <SwordBill/>
                                </TouchableOpacity>
                                 <TouchableOpacity onPress={() => {setIcon("Petuh"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Petuh" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Petuh/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("Scalaria"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Scalaria" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Scalaria/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("BigTail"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "BigTail" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <BigTail/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Barbus"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Barbus" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Barbus/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Ternetsia"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Ternetsia" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Ternetsia/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("Danio"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Danio" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Danio/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Petsilia"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Petsilia" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Petsilia/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Antsistrus"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Antsistrus" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Antsistrus/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Molinezia"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Molinezia" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Molinezia/>
                                </TouchableOpacity>
                            </View>
                             <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("Koridoras"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Koridoras" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Koridoras/>
                                </TouchableOpacity>
                               <TouchableOpacity onPress={() => {setIcon("Gurami"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Gurami" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Gurami/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Cumeta"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Cumeta" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Cumeta/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setIcon("Labeo"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "Labeo" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0,  margin: 5}]}>
                                    <Labeo/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {setIcon("FishClown"); Keyboard.dismiss()}} 
                                    style={[styles.textInput, {backgroundColor: icon === "FishClown" ? '#25B0F3': colors.background2, color: colors.text, width: 60, height: 60, padding: 10, paddingTop: -10, paddingLeft: 0, margin: 5}]}>
                                    <FishClown/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{height: 20}}></View> 
                        </ScrollView>
                    </Animatable.View> : null
                }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 60
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 20,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        left: 10
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
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
    },
    addText: {
        fontSize: 26,
    },
    item: {
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 60,
        height: 60,
        margin: -10,
    },
    modelContentWrapper: {
        height: '100%',
        width: '100%',
        marginTop: 'auto',
        
        position: 'absolute'
    },
    closeModal: {
        width: 40,
        height: 40,
    },
    closeBtnWrapper: {
        marginTop: 45,
        marginRight: 10
    },
    inputWrapper: {
        marginTop: 15
    },
    textInput: {
        padding: 15,
        fontSize: 18,
        borderRadius: 20
    },
    btnWrapper: {
        marginTop: 30,
        padding: 15,
        borderRadius: 20
    }
});
