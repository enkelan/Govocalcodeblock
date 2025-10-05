import { Meeting } from '../types';
import { toast } from 'react-hot-toast';

export function handleAddMeeting({
  meeting,
  addOrUpdateMeeting,
  selectedMeeting,
  setSelectedMeeting
}: {
  meeting: Meeting;
  addOrUpdateMeeting: (meeting: Meeting) => void;
  selectedMeeting: Meeting | null;
  setSelectedMeeting: (meeting: Meeting | null) => void;
}) {
  addOrUpdateMeeting(meeting);
  toast.success(selectedMeeting ? 'Meeting updated successfully!' : 'Meeting created successfully!');
  if (selectedMeeting) {
    setSelectedMeeting(null);
  }
}

export function handleEditMeeting({
  meeting,
  setSelectedMeeting,
  setSelectedDate
}: {
  meeting: Meeting;
  setSelectedMeeting: (meeting: Meeting | null) => void;
  setSelectedDate: (date: Date) => void;
}) {
  setSelectedMeeting(meeting);
  setSelectedDate(new Date(meeting.date));
}

export function handleDeleteMeeting({
  id,
  deleteMeeting,
  refreshMeetings,
  selectedMeeting,
  setSelectedMeeting
}: {
  id: string;
  deleteMeeting: (id: string) => void;
  refreshMeetings: () => void;
  selectedMeeting: Meeting | null;
  setSelectedMeeting: (meeting: Meeting | null) => void;
}) {
  deleteMeeting(id);
  toast.success('Meeting deleted successfully!');
  refreshMeetings();
  if (selectedMeeting?.id === id) {
    setSelectedMeeting(null);
  }
}
