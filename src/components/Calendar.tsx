import React, { useState, useEffect } from 'react';
import { Meeting } from '../types';
import { formatMonthYear, formatDayOfMonth, parseMeetingDate, getDaysInMonth } from '../utils/date';
import { isSameDay, isToday, addMonths, subMonths } from 'date-fns';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  meetings: Meeting[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, meetings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    setCalendarDays(getDaysInMonth(currentMonth));
  }, [currentMonth]);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const hasMeetings = (date: Date) => {
    return meetings.some(meeting => {
      const meetingDate = parseMeetingDate(meeting.date);
      return isSameDay(meetingDate, date);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-lg w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 w-9 h-9 flex items-center justify-center shadow-sm transition-colors duration-200"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {formatMonthYear(currentMonth)}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 w-9 h-9 flex items-center justify-center shadow-sm transition-colors duration-200"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center font-medium text-gray-600 pb-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, i) => {
          const isSelected = isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const hasEvents = hasMeetings(day);

          return (
            <div
              key={i}
              onClick={() => onSelectDate(day)}
              className={`
                h-14 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-800 hover:bg-gray-100'}
                ${isTodayDate && !isSelected ? 'border-2 border-blue-500' : ''}
              `}
            >
              <span className="text-lg">{formatDayOfMonth(day)}</span>
              {hasEvents && (
                <div className={`w-2.5 h-2.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
