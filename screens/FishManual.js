import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Easing, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, Animated} from 'react-native';
import { useTheme } from "@react-navigation/native";
import Manual from '../model/Manual';
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import ImageZoom from 'react-native-image-pan-zoom';
import ZoomImage from 'react-native-zoom-image'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useIsFocused, useFocusEffect} from '@react-navigation/native'

const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
export const FishManual = ({ navigation, route }) => {
    const {colors} = useTheme();
    const theme = useTheme();



    const [listData, setListData] = useState(
        Manual.sort(function (a, b) {
            if (a.title > b.title) return 1
            if (a.title < b.title) return -1
            return 0;
            }).map((ManualItem, index) => ({
                key: `${index}`,
                title: ManualItem.title,
                details: ManualItem.details,
                patch: ManualItem.patch
            })),
    );

    return (
             <Animatable.View //animation="lightSpeedIn"
             style={[styles.modelContentWrapper, {backgroundColor: colors.background}]}>
           

               <View style={{marginTop: 5,  paddingHorizontal: 20, paddingBottom: 10, flexDirection: "row"}}>
                 <TouchableOpacity style={{height: '100%', width: 50}} onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
                   </TouchableOpacity>
                    <Text style={[styles.sectionTitle, {color: colors.text}]}>{listData[route.params.id].title}</Text></View>

{
    useIsFocused ?

  <ScrollView showsVerticalScrollIndicator={false} contentOffset={{x: 0, y: 0}}>

  <Image style={{width: screenWidth,  height: 300}}
                   source={listData[route.params.id].patch}/>


                    <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                     <Text style={{color: colors.text, fontSize: 20}}>{listData[route.params.id].details}</Text>
            
                     </View>
                      </View>
                          </ScrollView> : null
                          }
                           </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       /* alignItems: 'center',
        justifyContent: 'center',*/
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
        justifyContent: 'flex-end',//'space-around',
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
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        //  borderWidth: 1,

    },
    addText: {
        fontSize: 26,
    },
    item: {
        //padding: 5,
        borderRadius: 20,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        /* backgroundColor: '#55BCF6',
       * opacity: 0.4,
         borderRadius: 5,*/
        marginRight: 15,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    modelContentWrapper: {
        height: '100%',
        width: screenWidth,
        marginTop: 'auto',
        position: 'absolute',
        zIndex: 1000,
        marginTop: 50
    },
    closeModal: {
        width: 40,
        height: 40,
    },
    closeBtnWrapper: {
        alignItems: 'flex-end',
        marginTop: 45,
        marginRight: 10
    },
    inputWrapper: {
        marginTop: 30
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
