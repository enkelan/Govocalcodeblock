import { useState, useMemo, useEffect } from 'react';
import { Meeting } from '../types';
import { generateTimeOptions } from '../utils/time';
import { isValidEmail } from '../utils/validation';
import { formatDateForInput } from '../utils/date';

interface FormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  attendee: string;
  email: string;
}

export function useMeetingForm(
  selectedDate: Date,
  selectedMeeting: Meeting | null,
  onAddMeeting: (meeting: Meeting) => void
) {
  const timeOptions = useMemo(() => generateTimeOptions(8, 17), []);

  const getInitialFormData = () => {
    if (selectedMeeting) {
      return {
        title: selectedMeeting.title,
        date: selectedMeeting.date,
        startTime: selectedMeeting.startTime,
        endTime: selectedMeeting.endTime,
        description: selectedMeeting.description,
        attendee: selectedMeeting.attendee,
        email: selectedMeeting.email,
      };
    } else {
      return {
        title: '',
        date: formatDateForInput(selectedDate),
        startTime: timeOptions[0]?.value || '',
        endTime: timeOptions[1]?.value || '',
        description: '',
        attendee: '',
        email: '',
      };
    }
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  // Reset formData when selectedDate or selectedMeeting changes
  useEffect(() => {
    setFormData(getInitialFormData());
  }, [selectedDate, selectedMeeting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.attendee || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const meeting: Meeting = {
      id: selectedMeeting ? selectedMeeting.id : Date.now().toString(),
      ...formData,
    };
    onAddMeeting(meeting);
    if (!selectedMeeting) {
      setFormData({
        title: '',
        date: formatDateForInput(selectedDate),
        startTime: timeOptions[0]?.value || '',
        endTime: timeOptions[1]?.value || '',
        description: '',
        attendee: '',
        email: '',
      });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    timeOptions,
  };
}
