import { useState } from "react";
import * as util from "../../utilities/utilityFunctions";

function DurationPicker(
  { 
    label,
    initialTotalSeconds,
    setDurationInSeconds,
  }
  : 
  { 
    label: string,
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
    <div className='flex flex-col mb-5 w-full text-textsIcons'>
      <label className="capitalize font-semibold mb-1">{label}</label>
      <div
        className="text-lg text-textsIcons"
      >
        <label>
          <input
            value={h.toString()}
            className="w-12 bg-lightBackgrounds border border-white/30 rounded-md py-1 pl-2 pr-0"
            type="number"
            onChange={ (e) => handleHoursUpdate(e.target.valueAsNumber) }
            onFocus={ () => {
              setH("")
            }}
            onBlur={ () => {
              setH(tempH);
            }}
          />
          <span className="m-1 text-md">h</span>
        </label>
        <label>
          <input 
            value={m.toString()}
            className="w-12 bg-lightBackgrounds border border-white/30 rounded-md py-1 pl-2 pr-0"
            type="number"
            onChange={ (e) => handleMinutesUpdate(e.target.valueAsNumber) }
            onFocus={ () => {
              setM("")
            }}
            onBlur={ () => {
              setM(tempM);
            }}
          />
          <span className="m-1 text-md">m</span>
        </label>
      </div>
    </div>
  )
}

export default DurationPicker;