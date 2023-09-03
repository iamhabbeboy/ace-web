import React, { useState, useEffect } from 'react';
import { convertTimeToTimestamp, convertTimestampToHumanReadable } from '../util/common';

export function CountdownTimer({ timestamp, setCountdown }: { timestamp: number, setCountdown: (value: number) => void }) {
  const timer = convertTimestampToHumanReadable(timestamp);
  const { hours, minutes, seconds  } = timer;
  const [remainingTime, setRemainingTime] = useState({ hours, minutes, seconds });
  // setCountdown(convertTimeToTimestamp(timer));

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        clearInterval(interval);
        return;
      }

      if (remainingTime.seconds > 0) {
        setRemainingTime((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (remainingTime.minutes > 0) {
        setRemainingTime((prev) => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }));
      } else if (remainingTime.hours > 0) {
        setRemainingTime((prev) => ({ ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    <div >
      <h2 style={{letterSpacing: "4px"}}>
        {String(remainingTime.hours).padStart(2, '0')}:{String(remainingTime.minutes).padStart(2, '0')}:
        {String(remainingTime.seconds).padStart(2, '0')}
      </h2>
    </div>
  );
}
