/**
*В данной папке находится код окон приложения
*Основное окно приложения
*/

//Импорт элементов из библиотек
import React, {useState, useCallback, useRef} from 'react';
import {Animated, View, Text, StyleSheet,TouchableOpacity, Image, ScrollView , Switch, Dimensions} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SvgAquarium from "../components/svgAquarium";
import {StatusBar} from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import {Caption, Paragraph} from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {FishClown} from "../components/FishClown";
import {Petuh} from "../components/Petuh";
import {Scalaria} from "../components/Scalaria";
import {FishOrange} from "../components/FishOrange";
import {FishOrange2} from "../components/FishOrange2";
import {BigTail} from "../components/BigTail";
import {Cumeta} from "../components/Cumeta";
import {Teleskop} from "../components/Teleskop";
import {Ternetsia} from "../components/Ternetsia";
import {Barbus} from "../components/Barbus";
import {Labeo} from "../components/Labeo";
import {FishBlue} from "../components/FishBlue";
import {Molinezia} from "../components/Molinezia";
import {Gurami} from "../components/Gurami";
import {Koridoras} from "../components/Koridoras";
import {Petsilia} from "../components/Petsilia";
import {Antsistrus} from "../components/Antsistrus";
import {Danio} from "../components/Danio";
import {ClownLoach} from "../components/ClownLoach";
import {NanoFish} from "../components/NanoFish";
import {SwordBill} from "../components/SwordBill";
import {AnimatedFish} from "../components/AnimatedFish";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons";

export const HomeScreen = ({navigation, useIsFocused}) => {

    //размеры окна
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    //цветовая схема окна
    const { colors } = useTheme();
    const theme = useTheme();


    const [fishItems, setFishItems] = useState([]);//массив рыбок
    const [isLoading, setIsLoading] = useState(false)//логическая переменная определяет, что страница загружена
    const [isAquarium, setIsAquarium] = useState(true)//логическая переменная определяет то, что аквариум успешно загружен
    const [aquarium, setAquarium] = useState([{//пустой аквариум по умолчанию
                isAquarium: false,
                name: '',
                type: '',
                capacity: '',
                date: ''
            }])

    let animate_state = {
        start: 0,
        end: 100
    }

    const value = useRef(new Animated.Value(animate_state.start)).current

    const startAnimate = () => {//анимация окна
        if (animate_state.end) {
            Animated.timing(value, {toValue: animate_state.end, useNativeDriver: false, duration: 500}).start()
            animate_state.start = 100
            animate_state.end = 0
        } else {
            Animated.timing(value, {toValue: animate_state.end, useNativeDriver: false, duration: 500}).start()
            animate_state.start = 0
            animate_state.end = 100
        }
    }

    const inputRange = Object.values(animate_state)
    const height = value.interpolate({ inputRange, outputRange: ['20%', '0%'] })

    const razmer = (screenWidth < (screenHeight - 154) / 5 * 3) ? screenWidth :  (screenHeight - 154) / 5 * 3;

    const raznica = (screenWidth < (screenHeight - 154) / 5 * 3) ? ((screenHeight - 154) / 5 * 3) - screenWidth :  0;

    useFocusEffect(useCallback (() => {
        setIsLoading(false)

      

        setFishItems([])
        animate_state.start = 100
        animate_state.end = 0
        startAnimate()
        setTimeout(async() => {
            try {//получаем информацию об аквариуме из локального хранилища
                setAquarium([...JSON.parse(await AsyncStorage.getItem('Aquarium'))]);
                  setIsAquarium(true)
        } catch (e) { 
           setIsAquarium(false)
            console.log(e) }

            try {  
                //получаем информацию о массиве рыбок из локального хранилища
                setFishItems([...JSON.parse(await AsyncStorage.getItem('fishItems'))]);
            } catch (e) { console.log(e) }
        }, 0)
        setIsLoading(true)
    }, [useIsFocused]))
    
    return (
        <View  style={styles.container}>
            <StatusBar style={ theme.dark ? "light" : "dark"}/>
            <Image blurRadius={.7} style={{position: 'absolute', width: '100%', height: '100%', flex: 0}}
            //в зависимости от выбранной цветовой схемы устанавливаем стандартный или тёмный фон 
            source={theme.dark ? require('../components/fonHome20.jpg') : require('../components/fonHome.jpg')}/>

            <View style={{width: '100%', height: 100, backgroundColor: theme.dark ? '#00544D' : '#009387'}}>
                <View style={{paddingHorizontal: 20, flexDirection: "row", marginTop: 55, marginLeft: 10}}>
                <TouchableOpacity onPress={() => {navigation.openDrawer()}} style={{height: '100%', width: 50}}>
                    <Icon name="ios-menu" size={35}  color={'#EEEEEE'}/>
                </TouchableOpacity>
                    
                    <Text style={[styles.sectionTitle, {color: '#EEEEEE', marginTop: -1}]}>{aquarium[0].name}</Text>
                </View>
            </View>

{isLoading ? <View style={{height: screenHeight - 154, width: '100%'}}>
{ !isAquarium ?
//если аквариум не создан, предлагаем пользователю создать
      <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate("CreateAquarium")}}>
<View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}} >
            <View style={{height: '20%', width: screenWidth - 20, backgroundColor: theme.dark ? '#00544D' : '#009387', borderRadius: 20, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 40, color: '#fff', fontWeight: 'bold'}}>Создать аквариум</Text>
            </View>
            </View>
              </TouchableOpacity>
             :
             
 <Animated.View  style={ {color: colors.text, textAlign: 'center', height: height}}/> }
        { isAquarium ?    <SvgAquarium/> : null }
    
         <View>
                { 
                     isAquarium ?   fishItems.map((item, index) => {
                        return (//если аквариум уже существует-инициализируем всех рыбок из списка и активыруем анимацию каждой рыбки
                            (item.ico === "FishClown") ?
                            <AnimatedFish key={index} height={razmer} raznica={raznica}><FishClown /></AnimatedFish>
                            :  (item.ico === "FishBlue") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><FishBlue/></AnimatedFish>
                            :  (item.ico === "FishOrange") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><FishOrange/></AnimatedFish>
                            :  (item.ico === "FishOrange2") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><FishOrange2/></AnimatedFish>
                            :  (item.ico === "ClownLoach") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><ClownLoach/></AnimatedFish>
                            :  (item.ico === "NanoFish") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><NanoFish/></AnimatedFish>
                            :  (item.ico === "SwordBill") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><SwordBill/></AnimatedFish>
                            :  (item.ico === "Petuh") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Petuh/></AnimatedFish>
                            :  (item.ico === "Scalaria") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Scalaria/></AnimatedFish>
                            :  (item.ico === "BigTail") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><BigTail/></AnimatedFish>
                            :  (item.ico === "Barbus") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Barbus/></AnimatedFish>
                            :  (item.ico === "Ternetsia") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Ternetsia/></AnimatedFish>
                            :  (item.ico === "Danio") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Danio/></AnimatedFish>
                             :  (item.ico === "Petsilia") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Petsilia/></AnimatedFish>
                             :  (item.ico === "Antsistrus") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Antsistrus/></AnimatedFish>
                             :  (item.ico === "Molinezia") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Molinezia/></AnimatedFish>
                            :  (item.ico === "Koridoras") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Koridoras/></AnimatedFish>
                            :  (item.ico === "Gurami") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Gurami/></AnimatedFish>
                            :  (item.ico === "Cumeta") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Cumeta/></AnimatedFish>
                            :  (item.ico === "Labeo") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Labeo/></AnimatedFish>
                            :  (item.ico === "Teleskop") ?
                            <AnimatedFish key={index}  height={razmer} raznica={raznica}><Teleskop/></AnimatedFish>
                             : null
                    )} ) : null
                }
            </View>
            {/*Элементы меню главного окна приложения */}
             { isAquarium ?   <View style={{alignItems: "center"}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("FishScreen"); setFishItems([])}}
                                  style={{ position: "absolute",  bottom: screenHeight/30 + 45, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: theme.dark ? '#00544D' : '#009387', lineHeight: 37}}>
                        <FontAwesome5 name="fish" size={20}/></Text>
                </TouchableOpacity>
            </View> : null }
            { isAquarium ? <View style={{alignItems: "center"}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {startAnimate()}}
                                  style={{ position: "absolute", bottom: screenHeight/30, left: '85%'}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 20, width: 40, height: 40,
                        borderRadius: 20, backgroundColor: theme.dark ? '#00544D' : '#009387', lineHeight: 37}}>
                        <FontAwesome5 name="info" size={20}/></Text>
                </TouchableOpacity>
            </View> : null }
            <Animated.View  style={ {color: colors.text, height: height}}/>
            
            {/*Окно информации об аквариуме */}
               { isAquarium ?   <Animatable.View animation="fadeInUpBig" style={[styles.footer, {
                    backgroundColor: colors.backgroundOpacity   }]} >
                    <Text style={ {color: "white", borderBottomColor: colors.text,
                        borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, textAlign: 'center', fontSize: 15}}
                         onPress={() => {navigation.navigate("CreateAquarium")}}  >Информация об аквариуме <FontAwesome5 name="pencil-alt" size={15}/></Text>
                    <ScrollView>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Название</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>{aquarium[0].name/*Мой аквариум*/}</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Тип</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>{aquarium[0].type/*Пресноводный аквариум*/}</Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Вместимость</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>{aquarium[0].capacity/*100*/}{ aquarium[0].capacity === '' ? null : 'литров'} </Paragraph>
                        </View>
                        <View style={styles.section}>
                            <Caption style={[styles.caption, {color: "#9B9B9B", width: 110, marginRight: 10}]}>Дата запуска</Caption>
                            <Paragraph style={[styles.paragraph, styles.caption, {color: "white"}]}>{aquarium[0].date/*02-03-2021*/}</Paragraph>
                        </View>
                    </ScrollView>
                </Animatable.View> : null }
                </View>: null }
        </View>
    )
}

const styles = StyleSheet.create({//константа, в которой содержится определение стилей контейнеров и их свойства
    container: {
        flex: 1,
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgba(233,234,236, 0.8)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
