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
      this.state={
        date: this.props.date,
        date2:  this.props.date2,
        notifDate: this.props.notif,
        sec: 0
      
      };
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

 let d = this.props.notif;
    let a = new Date(Date.now())
    let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
    let utc2 = Date.UTC(d[this.props.index].year, d[this.props.index].month, d[this.props.index].day, d[this.props.index].hour, d[this.props.index].min, d[this.props.index].sec);

    let seconds = Math.floor((utc2 - utc1) )/ 1000

    seconds += (Math.floor(seconds / 14400) + 2) * 60 * 60 * 4
  //console.warn(seconds)

   this.setState({
      sec: seconds
    })
    
    
     
    
  }
  else
  this.setState({
      sec: 0
    })
 
  

  }
  
  render(){ //рендер элемента
    const sec = this.state.sec
    const hour = Math.floor(sec / 3600)
    const min = Math.floor((sec % 3600) /60)
    const secs =this.state.sec % 60;
    return(
      <Text style = {{color: this.props.color}}>{hour} ч : {min} м: {secs} с</Text>
    )
  }
  }

  export {ClockOfClear,ClockOfFood,ClockOfreWater}
