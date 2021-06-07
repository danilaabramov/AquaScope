import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, useColorScheme, Appearance } from 'react-native'
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';
import{ MainTabScreen }from './screens/MainTabScreen';
import {NoteScreen} from './screens/NoteScreen';
import {FishScreen} from './screens/FishScreen';
import {HomeScreen} from './screens/HomeScreen';
import { AuthContext } from './components/context';

import { CreateAquarium }from './screens/CreateAquarium';
import { FishManual }from './screens/FishManual';

import { CaCO3 }from './calculators/CaCO3';
import { ConvertLength }from './calculators/ConvertLength';
import { ConvertTemperature }from './calculators/ConvertTemperature';
import { ConvertWeight }from './calculators/ConvertWeight';
import { K2CO3 }from './calculators/K2CO3';
import { K2SO4 }from './calculators/K2SO4';
import { KHCO3 }from './calculators/KHCO3';

import { AquariumVolume }from './calculators/AquariumVolume';
import { CO2Level }from './calculators/CO2Level';
import { AquariumWater }from './calculators/AquariumWater';
import {WaterBalance }from './calculators/WaterBalance';
import {ConvertWaterVolume }from './calculators/ConvertWaterVolume';
import {MixerRO}from './calculators/MixerRO';
import {KNO3}from './calculators/KNO3';

import AsyncStorage from '@react-native-community/async-storage';
import Users from "./model/users";
import { useTheme } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native'
import PushNotification from "react-native-push-notification";
const Drawer = createDrawerNavigator();

const App = () => {
  const { colors } = useTheme();
    const [isDarkTheme, setIsDarkTheme] = React.useState(Appearance.getColorScheme() === "dark")

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#F2F2F2',
            background2: '#FCFCFC',
            backgroundOpacity: 'rgba(0,73,67, 0.5)',
            text: '#333333'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#0B0B0B',
            background2: '#171717',
            backgroundOpacity: 'rgba(0,36,33, 0.5)',
            text: '#EEEEEE'
        }
    }

    let theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 
    const authContext = React.useMemo(() => ({
        toggleTheme: () => {
            setIsDarkTheme(Appearance.getColorScheme() === "dark")
        }
    }), []);

    useEffect(() => {
        setInterval(() =>{authContext.toggleTheme()}, 1)
    }, [])

    return (
        <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                              <Drawer.Screen name="FishScreen" component={FishScreen} />
                                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                                <Drawer.Screen name="NoteScreen" component={NoteScreen} />


                                <Drawer.Screen name="AquariumVolume" component={AquariumVolume} />
                                <Drawer.Screen name="CO2Level" component={CO2Level} />
                                <Drawer.Screen name="AquariumWater" component={AquariumWater} />
                                <Drawer.Screen name="WaterBalance" component={WaterBalance} />
                                <Drawer.Screen name="ConvertWaterVolume" component={ConvertWaterVolume} />
                                <Drawer.Screen name="KNO3" component={KNO3} />
                                <Drawer.Screen name="MixerRO" component={MixerRO} />

                                <Drawer.Screen name="CaCO3" component={CaCO3} />
                                <Drawer.Screen name="ConvertLength" component={ConvertLength} />
                                <Drawer.Screen name="ConvertTemperature" component={ConvertTemperature} />
                                <Drawer.Screen name="ConvertWeight" component={ConvertWeight} />
                                <Drawer.Screen name="K2CO3" component={K2CO3} />
                                <Drawer.Screen name="K2SO4" component={K2SO4} />
                                <Drawer.Screen name="KHCO3" component={KHCO3} />

                                <Drawer.Screen name="FishManual" component={FishManual}/>
                                 <Drawer.Screen name="CreateAquarium" component={CreateAquarium}/>
                            </Drawer.Navigator>
                </NavigationContainer>
        </PaperProvider>
    )
}

export default App

const styles = StyleSheet.create({ })
