import { Meeting } from '../types';

const STORAGE_KEY = 'meeting-calendar-data';

export const saveMeetings = (meetings: Meeting[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  } catch (error) {
    console.error('Error saving meetings to localStorage:', error);
  }
};

export const loadMeetings = (): Meeting[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading meetings from localStorage:', error);
    return [];
  }
};