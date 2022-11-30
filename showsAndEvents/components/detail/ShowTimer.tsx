import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TimeWatch from 'public/icons/assets/clock.svg';
import React, { useEffect, useState } from 'react';

interface ShowTimerProps {
  availableTimeText: string;
}

const ShowTimer: React.FC<ShowTimerProps> = ({ availableTimeText }) => {
  return (
    <div
      className={
        '"gap-1 inline-flex items-center text-left font-normal font-[\'Lato\'] text-primary-1000"'
      }
    >
      <TimeWatch className="text-primary-1000 h-4 w-4" />
      <p className="text-xs px-2 leading-tight capitalize text-primary-1000">
        This ticket is only available for {availableTimeText}
      </p>
    </div>
  );
};

export default ShowTimer;
