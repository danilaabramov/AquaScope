import React, {useState, useEffect, useRef} from 'react';
import {Easing, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, Animated, Pressable} from 'react-native';
import { useTheme } from "@react-navigation/native";
import Manual from '../model/Manual';
import {Caption, Paragraph} from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import {useIsFocused, useFocusEffect} from '@react-navigation/native'
import ImageZoom from 'react-native-image-pan-zoom';
import ZoomImage from 'react-native-zoom-image'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedHeader from 'react-native-animated-header';



const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
export const ManualScreen = ({navigation, useFocusEffect}) => {
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


    
const offset = useRef(new Animated.Value(250)).current;
    



    return (

<AnimatedHeader 
        style={{flex: 1, marginTop: 20, paddingHorizontal: 10}}
        title='Мануал'
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


                    <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' >
        {
            listData.map((item, index) => {
                  return (
                      
                       <View key={index}
                       style={[styles.item, {backgroundColor: colors.background2, width: screenWidth - 20, height: 200, borderRadius: 10}]}>
                        <TouchableOpacity  activeOpacity={0.9} onPress ={() =>  navigation.navigate('FishManual', { id: index })} style={[styles.itemLef, {twidth: screenWidth - 20, height: 200, borderRadius: 10}]}>
                         
       
                          <Image resizeMode="stretch" style={{ /*marginLeft: 5, marginRight: 10, */flex: 1, width: screenWidth - 20, height: 200, borderRadius: 10}}
                   source={item.patch}/>
        

                        
                             <View style={{width:  screenWidth - 60, position: 'absolute', bottom: 0, left: 20}}>
                              {
                                  item.title === '' || item.title === null ? null :
                                  <Paragraph style={[
                                   {color: /*'#899FFE'*/"white", fontWeight: 'bold', fontSize: 30, paddingTop: 10, textShadowColor: '#000',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5}]}>{item.title}</Paragraph>
                                     }
                                       {
                                             item.details === '' || item.details === null ? null :
                                               <Caption style={[ {height: 50, color: "#FFDB70", maxHeight: 40,
                                               textShadowColor: '#000',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5
}]}>
                                                       {item.details}</Caption>
                                                }
                                                 </View>
                                                      
                                      </TouchableOpacity></View> 
                                     )
                                })
         }
                            
</ScrollView>




         </AnimatedHeader>    

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
        zIndex: 1000
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
