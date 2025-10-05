import { useState, useCallback } from 'react';
import { Meeting } from '../types';
import { loadMeetings, saveMeetings } from '../utils/storage';

export const useMeetings = () => {
  // Initialize state with meetings from localStorage
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    return loadMeetings();
  });

  // Add or update a meeting
  const addOrUpdateMeeting = useCallback((meeting: Meeting) => {
    setMeetings(prevMeetings => {
      const isExisting = prevMeetings.some(m => m.id === meeting.id);
      let newMeetings;

      if (isExisting) {
        // Update existing meeting
        newMeetings = prevMeetings.map(m => m.id === meeting.id ? meeting : m);
      } else {
                // Add a new meeting with generated ID using crypto.randomUUID() for uniqueness
        newMeetings = [...prevMeetings, { ...meeting, id: crypto.randomUUID() }];
      }
      saveMeetings(newMeetings);
      return newMeetings;
    });
  }, []);

  // Delete a meeting
  const deleteMeeting = useCallback((id: string) => {
    setMeetings(prevMeetings => {
      const newMeetings = prevMeetings.filter(meeting => meeting.id !== id);
      saveMeetings(newMeetings);
      return newMeetings;
    });
  }, []);

  const refreshMeetings = useCallback(() => {
    const loadedMeetings = loadMeetings();
    setMeetings(loadedMeetings);
    return loadedMeetings;
  }, []);

  return {
    meetings,
    addOrUpdateMeeting,
    deleteMeeting,
    refreshMeetings
  };
};
