import { useState } from "react";
import * as util from "../../utilities/utilityFunctions";

function DurationPicker(
  { 
    initialTotalSeconds,
    setDurationInSeconds,
  }
  : 
  { 
    initialTotalSeconds: number,
    setDurationInSeconds: (seconds: number) => void,
  }) {

  const { hours, minutes } = util.secondsToDuration(initialTotalSeconds);

  const [h, setH] = useState<number | string>(hours);
  const [m, setM] = useState<number | string>(minutes);

  const [tempH, setTempH] = useState(h);
  const [tempM, setTempM] = useState(m);

  function handleHoursUpdate(hours: number) {
    if ( isNaN(hours) ) {
      setTempH(0);
      setH("");
    } else if (hours >= 0 && hours <= 23 ) {
      setTempH(hours);
      setH(hours);
    }
    if (typeof m !== "string") {
      setDurationInSeconds(util.durationToSeconds({hours, minutes: m}));
    } 
  }

  function handleMinutesUpdate(minutes: number) {
    if ( isNaN(minutes) ) {
      setTempM(0);
      setM("");
    } else if (minutes >= 0 && minutes <= 59 ) {
      setTempM(minutes);
      setM(minutes);
    }
    if (typeof h !== "string") {
      setDurationInSeconds(util.durationToSeconds({hours: h, minutes}));
    } 
  } 

  return (
    <div
      className="text-lg "
    >
      <label>
        <input
          value={h.toString()}
          className="w-10 text-center rounded-md border border-black/50"
          type="number"
          onChange={ (e) => handleHoursUpdate(e.target.valueAsNumber) }
          onFocus={ () => {
            setH("")
          }}
          onBlur={ () => {
            setH(tempH);
          }}
        />
        <span className="m-1 text-sm">h</span>
      </label>
      <label>
        <input 
          value={m.toString()}
          className="w-10 text-center rounded-md border border-black/50"
          type="number"
          onChange={ (e) => handleMinutesUpdate(e.target.valueAsNumber) }
          onFocus={ () => {
            setM("")
          }}
          onBlur={ () => {
            setM(tempM);
          }}
        />
        <span className="m-1 text-sm">m</span>
      </label>
    </div>
  )
}

export default DurationPicker;