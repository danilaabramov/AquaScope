import React, { Component, useEffect } from 'react';
import {Text,View} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";

const fishfood = 14399 //время в секундах отсчёта для кормления рыбы
//(пока константа, далее будет рассчитываться исходя из данных об аквариуме)
const fishclear =604799//время между чистками аквариума(аналогично кормлению)
const rewater = 1209599//2 неделю(фиксировано)

class ClockOfClear extends Component {//таймер чистки аквариума
  
  constructor(props){
    super(props);
    this.state={date: fishclear};
  }
componentDidMount(){//вызывается после рендера компонента
  const getPushData = async(message)=>{
console.log('message:',message);
  }
  useEffect(()=>{
    const unsub=messaging().onMessage(getPushData);
    return unsub
  },[])
this.timerID = setInterval(
  ()=> this.tick(),1000
)
}
componentWillUnmount(){//вызывается в случае удаления компонента
clearInterval(this.timerID);
}

tick(){//фукнция одного такта
  if(this.state.date===0){
      this.setState({date:fishclear})//устанавливаем таймер на начальное время отсчёта
    /*Формируем уведомление пользователю*/
    }
  else{
  this.setState({
    date: this.state.date-1
  })
}
}

render(){//рендер элемента в случае если понадобится где-то отобразить таймер
  const sec = this.state.date;
  const day = Math.floor(sec/86400)
  const hour = Math.floor((sec%86400)/3600)
  return(
    <Text>{day} д : {hour} ч</Text>
  )
}
}


class ClockOfreWater extends Component {//таймер замены части воды
    constructor(props){
      super(props);
      this.state={date: rewater};
    }
  componentDidMount(){//вызывается после рендера компонента
  this.timerID = setInterval(
    ()=> this.tick(),1000
  )
  }
  componentWillUnmount(){//вызывается в случае удаления компонента
  clearInterval(this.timerID);
  }
  
  tick(){//фукнция одного такта
    if(this.state.date===0){
        
        this.setState({date:rewater})//устанавливаем таймер на начальное время отсчёта
        /*Формируем уведомление пользователю*/
    }
    else{
    this.setState({
      date: this.state.date-1
    })
  }
  }
  
    render(){//рендер элемента на случай если понадобится отобразить таймер
      const sec = this.state.date;
      const day = Math.floor(sec/86400)
      const hour = Math.floor((sec%86400)/3600)
      return(
        <Text>{day} д : {hour} ч</Text>
      )
    }
  }
  

  class ClockOfFood extends Component {//таймер кормления рыбок
    constructor(props){
      super(props);
      this.state={date: this.props.date,
      date2:  this.props.date2};
    }

  componentDidMount(){//вызывается после рендера компонента
  
  this.timerID = setInterval(
    ()=> this.tick(),1000
  )
  }
  componentWillUnmount(){//вызывается в случае удаления компонента
  clearInterval(this.timerID);
  }
  
  tick = async() => {//фукнция одного такта

   
   
  if(this.state.date2[this.props.index].active){
    if(this.state.date[this.props.index] === 0){
        let d = this.state.date
        d[this.props.index] = fishfood
        this.setState({date: d})//устанавливаем таймер на начальное время отсчёта
        /*Формируем уведомление пользователю*/
        try {
          
      await AsyncStorage.setItem('dateClock',  JSON.stringify([...d]));
    } catch (e) {
      console.log(e)
    }
    }
    else{
      let d = this.state.date
      d[this.props.index] = d[this.props.index] - 1
      this.setState({
        
        date: d
      })

      try {
       await AsyncStorage.setItem('dateClock',  JSON.stringify([...d]));
    } catch (e) {
      console.log(e)
    }
    }
  }
  else{
     let d = this.state.date
      d[this.props.index] = 0
      this.setState({
        date: d
      })
    
    try { await AsyncStorage.setItem('dateClock',  JSON.stringify([...d]));
    } catch (e) {
      console.log(e)
    }
      
  }
  

  }
  
  render(){ //рендер элемента
    const sec = this.state.date[this.props.index];
    const hour = Math.floor(sec / 3600)
    const min = Math.floor((sec % 3600) /60)
    const secs =this.state.date[this.props.index] % 60;
    return(
      <Text style = {{color: this.props.color}}>{hour} ч : {min} м: {secs} с</Text>
    )
  }
  }

  export {ClockOfClear,ClockOfFood,ClockOfreWater}
