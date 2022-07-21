import React, { useState } from 'react';
import './App.css';

import ProgressBar from '@ramonak/react-progress-bar';
import { DateTime } from "luxon"
import {delta} from "./libs/DateTimeDelta"

const completedDays = (start: string): number => {
  let newCompletedDays = delta(start, DateTime.now().toFormat('yyyy-MM-dd'))

  if (newCompletedDays < 0) {
    return 0
  }

  return newCompletedDays
}

function App() {
  const [start, setStart] = useState<string>(DateTime.local(2022,7,21).toFormat('yyyy-MM-dd'))
  const [end, setEnd] = useState<string>(DateTime.local(2022,8,20).toFormat('yyyy-MM-dd'))
  const [completedPer, setCompletedPer] = useState<number>(completedDays(start)/delta(start, end))

  const handleOnChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value
    setStart(newStart)
    handleOnChangeCompleted({start: newStart, end: end})
  }

  const handleOnChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value
    setEnd(newEnd)
    handleOnChangeCompleted({start: start, end: newEnd})
  }

  const handleOnChangeCompleted = ({start: start, end: end}: {start: string, end: string}) => {
    const newCompletedDays = completedDays(start)
    
    const newCompletedPer = newCompletedDays/delta(start, end)
    setCompletedPer(newCompletedPer)
  }

  return (

    <div className="App">
      <form>
        夏休み開始日
        <input
          type="date"
          value={start}
          onChange={e => {
            handleOnChangeStart(e)
          }}
        />

        <br />

        夏休み終わり
        <input 
          type="date"
          value={end}
          onChange={e => {
            handleOnChangeEnd(e)
          }}
        />

      </form>

      <ProgressBar 
        completed={Math.trunc(completedPer*100)} // %なので100かける
        // className="wrapper"
        // barContainerClassName='container'
        // completedClassName='barCompleted'
        // labelClassName='label'
        maxCompleted={100}
      />

    </div>
  );
}

export default App;
