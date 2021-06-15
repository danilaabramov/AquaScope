/**
*В данной папке находится код окон приложения
*Основное нижнее меню приложения
*/

//Импорт элементов из библиотек
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet, View, Text} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeScreen} from "./HomeScreen";
import {NotificationsScreen} from "./NotificationsScreen";
import {CalculatorScreen} from "./CalculatorScreen";
import { useTheme } from '@react-navigation/native';
import {ManualScreen} from "./ManualScreen";

//создание элементов навигации при перемещении между окнами приложения
const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export const MainTabScreen = () => {

    //цветовая схема устройства
    const theme = useTheme();
    const { colors } = useTheme();
    
    return  (//рендер элемента
        <Tab.Navigator labeled={false} initialRouteName="Home" activeColor="#fff" barStyle={{backgroundColor: 'tomato'}} inactiveColor={theme.dark ? "rgba(255, 255, 255, .5)" : "rgba(0, 0, 0, .5)"}>
            {/*Далее следует описание всех пунктов нижнего меню приложения, которое включает в себя указание названия пункта меню 
            *иконку пункта меню и некоторые стилевые качества пунктов меню
            */ }
            <Tab.Screen name="Home"  component={HomeScreen} options={{
                tabBarLabel: 'Аквариум',
                tabBarColor: theme.dark ? '#00544D' : '#009387',
                tabBarIcon: ({focused, color}) => (
                    focused ?
                    <View style={{backgroundColor: theme.dark ? '#002A26' : '#004943', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 20, height: 29, width: 55, marginTop: -2}}>
                        <MaterialCommunityIcons name="fishbowl" color={color} size={25}/>
                      </View>
                      : <MaterialCommunityIcons name="fishbowl" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen} options={{
                tabBarLabel: 'Оповещения',
                tabBarColor: colors.background,//theme.dark ? '#6777BF' : '#899FFE',
                tabBarIcon: ({focused, color}) => (
                       focused ?
                    <View style={{backgroundColor: /*theme.dark ? '#6777BF' : */'#899FFE', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 20, height: 29, width: 55, marginTop: -2}}>
                    <Icon name="ios-notifications" color={color} size={25}/>
                                          </View>
                                          :<Icon name="ios-notifications" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name="Calculator" component={CalculatorScreen} options={{
                tabBarLabel: 'Калькулятор',
                tabBarColor: colors.background,// theme.dark ? '#509668' : '#72D695',
                tabBarIcon: ({focused, color}) => (
                        focused ?
                    <View style={{backgroundColor: /*theme.dark ? '#509668' : */'#72D695', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 20, height: 29, width: 55, marginTop: -2}}>
                    <MaterialCommunityIcons name="calculator-variant" color={color} size={25}/>
                    </View>
                                          : <MaterialCommunityIcons name="calculator-variant" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name="Manual"  component={ManualScreen} options={{
                tabBarLabel: 'Мануал',
                tabBarColor: colors.background,//theme.dark ? '#BFA454' : '#FFDB70',
                tabBarIcon: ({focused, color}) => (
                     focused ?
                    <View style={{backgroundColor: /*theme.dark ? '#BFA454' : */'#FFDB70', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 20, height: 29, width: 55, marginTop: -2}}>
                    <MaterialCommunityIcons name="book-open-page-variant" color={color} size={25}/>
                     </View>
                                          :   <MaterialCommunityIcons name="book-open-page-variant" color={color} size={25}/>
                ),
            }}/>
        </Tab.Navigator>
    )
}

//аналогично первому элементу инициализированы следующие 2 элемента
const HomeStackScreen = ({navigation}) => {

    const theme = useTheme();


    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: theme.dark ? '#00544D' : '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            animationEnabled: false,
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                title: 'Аквариум',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={theme.dark ? '#00544D' : '#009387'} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
        </HomeStack.Navigator>
    )
}

const NotificationsStackScreen = ({navigation}) => {
    const theme = useTheme();
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor:'#1f65ff',// theme.dark ? '#0F327F' : '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            animationEnabled: false,
        }}>
            <DetailsStack.Screen name="Details" component={NotificationsScreen} options={{
                title: 'Оповещения',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor={'#1f65ff'/*theme.dark ? '#0F327F' : '#1f65ff'*/} onPress={() => {
                        navigation.openDrawer()}}
                    />)
            }}/>
        </DetailsStack.Navigator>
    )
}



const styles = StyleSheet.create({//константа, в которой содержится определение стилей контейнеров и их свойства
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})