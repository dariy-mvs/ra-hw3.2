import React, { useState } from 'react';


export default function Table() {
  let [ valuesItems, setValue ] = useState({
    values: [],
    km: '',
    date: '',
  });

  const changeState = (name, value) => {
    setValue(prevForm => {
      console.log(prevForm);
      prevForm[name] = value;
     });
  }
  
  function onChangeField (e) {
    const value = e.target.value;
    const name = e.target.name;
    changeState(name, value);
    console.log(valuesItems);
  }

  return (
    <div>
      <form className="form">
        <label htmlFor="date">
          <input type="text" name="date" onChange={onChangeField} />
        </label>
        <label htmlFor="km">
          <input type="text" name="km" onChange={onChangeField}/>
        </label>
        <button className="formBtn">ok</button>
      </form>
    </div>
  )
}
