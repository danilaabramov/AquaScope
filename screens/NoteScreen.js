import React, {useState, useMemo} from 'react';
import { View, Text, StyleSheet, Keyboard, ScrollView, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from 'lottie-react-native'

export const NoteScreen = ({navigation}) => {
    const {colors} = useTheme();
    const theme = useTheme();
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);//элемент заметки пользователя
    const [active, setActive] = useState([]);//массив заметок пользователя

    const handleAddTask = async () => {//добавление заметки в локальную память
        Keyboard.dismiss();
        await AsyncStorage.setItem('Tasks', JSON.stringify([...taskItems, task]))
        setTaskItems([...taskItems, task])
        setTask(null);

        await AsyncStorage.setItem('activeTasks', JSON.stringify([...active, false]))
        setActive([...active, false])
    }

    const canselTask = async (index) => {//удаление заметки
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);//выполняем копирование в массив заметок всех заметок кроме данной
        setTaskItems(itemsCopy)
        await AsyncStorage.setItem('Tasks', JSON.stringify(itemsCopy))//загружаем массив заметок в локальную память

        itemsCopy = [...active];
        itemsCopy.splice(index, 1);
        setActive(itemsCopy)
        await AsyncStorage.setItem('activeTasks', JSON.stringify(itemsCopy))
    }

    const completeTask = async (index) => {
        let itemsCopy = [...active];
        itemsCopy[index] = !itemsCopy[index]
        setActive([...itemsCopy])
        await AsyncStorage.setItem('activeTasks', JSON.stringify(itemsCopy))
    }

    useMemo(async () => {
        try {
            const myArray = await AsyncStorage.getItem('Tasks');//получаем массив заметок из локальной памяти
            setTaskItems([...JSON.parse(myArray)]);
        } catch (e) {
            console.log(e)
        }

        try {
            const myArray = await AsyncStorage.getItem('activeTasks');
            setActive([...JSON.parse(myArray)]);
        } catch (e) {
            console.log(e)
        }
    }, []).then(r => null)

    return (//рендер компонентов
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row"}}>
            <TouchableOpacity style={{height: '100%', width: 50, }} onPress={() => navigation.goBack()} >
                <MaterialCommunityIcons name="arrow-left" size={35} color={colors.text}/>
            </TouchableOpacity>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>Заметки</Text></View>
            <ScrollView showsVerticalScrollIndicator={false} 
                contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {
                            taskItems.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index}  onPress={() => {completeTask(index)}}>
                                            <View style={[styles.item, {backgroundColor: colors.background2}]}>
                                                <View style={styles.itemLeft}>

                                            <View style={[styles.square, {backgroundColor: theme.dark ? '#305970' : '#B9E3F8'}]}>
                                {         active[index]  ?
                                             <MaterialCommunityIcons name="check-bold" size={30} color={colors.text} style={{position: 'absolute', bottom: 1, left: 2, opacity: 1}}/>
                                          : null
                                }           
                                             </View>           
                                                   
                                                    <Text style={[styles.itemText, {color: colors.text, textDecorationLine: active[index] ? 'line-through' : 'none'}]}>{item}</Text>
                                                </View>
                                                {/*При нажатии на кнопку заметка удалится*/}
                                                <TouchableOpacity onPress={() => canselTask(index)}>
                                                    <MaterialCommunityIcons name="close" size={26} color={colors.text}/>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                        }
                    </View>
                </View>
                 <View style={{height: 100, width: '100%'}}/>
            </ScrollView>
             {/*Создание новой заметки */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
                <TextInput style={[styles.input, {backgroundColor: colors.background2, color: colors.text}]} placeholder={'Напишите заметку'}
                           value={task} onChangeText={text => setTask(text)} placeholderTextColor={'#666'}/>
                           <TouchableOpacity onPress={() => handleAddTask()}>
                               <View style={[styles.addWrapper, {backgroundColor: colors.background2}]}>
                                   <Text style={[styles.addText, {color: colors.text}]}>+</Text>
                               </View>
                           </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
};

const styles = StyleSheet.create({//константа, в которой содержится определение стилей контейнеров и их свойства
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
        borderWidth: 1,
    },
    addText: {},
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
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
        width: 24,
        height: 24,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 18
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});
