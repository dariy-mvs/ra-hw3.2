import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import TableItem from './TableItem';
import './Table.css';



export default function Table() {
  var [ valuesItems, setValue ] = useState([]);
  let [date, setDate] = useState({});
  let [km, setKm] = useState('');
  let items;
  if (valuesItems.length) {
    items = valuesItems.map(el => {
      return <TableItem km={el.km} key={el.id} time={el.date.string} changeValues={setValue} id={el.id} />
    });
  } else {
    items = 'Вы пока не добавили тренировок';
  }

  const toDate = (input) => {
    const parts = input.split('.')
    const date = new Date(
      parseInt(parts[2], 10), 
      parseInt(parts[1], 10) - 1, 
      parseInt(parts[0], 10)
    );
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return {
      dateObj: date,
      string: `${day}.${(month).toString()}.${date.getFullYear()}`
    }
  };
  
  
  function onChangeField (e) {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'km') {
      setKm(value)
    } else {
      let datePars = toDate(value);
      setDate(datePars);
    }
  }

  function getStateValue (e) {
    e.preventDefault();
    let activeValue = valuesItems.find(el => el.date.string === date.string);
    if (activeValue) {
     setValue(prev => {
    let newState = [];
    prev.forEach(el => {
      if (el.date.string === date.string) {
        const newDistance = +el.km + +km;
        const newItem = {
          date: date,
          km: newDistance,
          id: nanoid(5)
        }
        newState.push(newItem);
      } else {
        newState.push(el);
      }
    });
    newState = newState.sort((a, b) => a.date.dateObj < b.date.dateObj ? 1 : -1);
    return newState;
    });
    } else {
      let sportObj = {
        date: date,
        km: km,
        id: nanoid(5),
      };
      setValue(prevState => ([
        ...prevState, sportObj
      ]));
    } 
  }

  return (
    <div className="container">
      <form className="form">
        <label htmlFor="date">
          <input type="text" name="date" onChange={onChangeField} placeholder="введите дату" />
        </label>
        <label htmlFor="km">
          <input type="text" name="km" onChange={onChangeField} placeholder="введите дистанцию"/>
        </label>
        <button className="formBtn" onClick={getStateValue}>ok</button>
      </form>
      <ul className="table">{items}</ul>
    </div>
  )
}
