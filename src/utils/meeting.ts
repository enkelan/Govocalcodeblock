// Utility functions for meeting filtering
import { Meeting } from '../types';

export const filterMeetingsBySearch = (meetings: Meeting[], searchTerm: string): Meeting[] => {
  if (!searchTerm.trim()) return meetings;
  const searchTermLower = searchTerm.toLowerCase();
  return meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTermLower) ||
    meeting.attendee.toLowerCase().includes(searchTermLower) ||
    meeting.description.toLowerCase().includes(searchTermLower) ||
    meeting.email.toLowerCase().includes(searchTermLower)
  );
};

export const filterMeetingsByDate = (meetings: Meeting[], date: Date): Meeting[] => {
  return meetings.filter(m => {
    const meetingDate = new Date(m.date);
    return meetingDate.toDateString() === date.toDateString();
  });
};

