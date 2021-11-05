import React from 'react'

export default function TableItem(props) {
  const { time, km, id, changeValues } = props;
  const deleteValue = () => {
    changeValues(prev => {
      let newState = [];
      prev.forEach(el => {
        if (el.id === id) {
          return
        } else {
          newState.push(el);
        }
      });
      newState = newState.sort((a, b) => a.date.dateObj < b.date.dateObj ? 1 : -1);
      return newState;
      });
    }
  return (
    <li>
      <div className="info">
      <span className="firstSpan">date: <span className="info__date">{time}</span></span>
      <span>distance: <span className="info__km">{km}</span></span>
      </div>
      <div className="btn_box">
        <button className="del" onClick={deleteValue}>x</button>
      </div>
    </li>
  )
}
