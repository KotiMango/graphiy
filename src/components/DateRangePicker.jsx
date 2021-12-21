import React, { useState } from 'react';
import { simpleStrToISO } from '../services/dateService.js';

export default function DateRangePicker({
  setSpan,
  setIsDatePicking,
}) {
  const dateSimpleStr = new Date().toISOString().substr(0, 10);
  const [datePickStart, setDatePickStart] = useState(dateSimpleStr);
  const [datePickEnd, setDatePickEnd] = useState(dateSimpleStr);

  const sendCustomSpan = (ev) => {
    setDatePickEnd(ev.target.value);
    const span = `from=${simpleStrToISO(
      datePickStart
    )}&to=${simpleStrToISO(ev.target.value)}`;
    setSpan(span);
    setIsDatePicking(false);
  };

  return (
    <div>
      <input
        type='date'
        value={datePickStart}
        onChange={(ev) => setDatePickStart(ev.target.value)}
      />
      <input
        type='date'
        value={datePickEnd}
        onChange={sendCustomSpan}
      />
    </div>
  );
}
