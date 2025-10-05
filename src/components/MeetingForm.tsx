import React from 'react';
import { Meeting } from '../types';
import { useMeetingForm } from '../hooks/useMeetingForm';

interface MeetingFormProps {
  selectedDate: Date;
  onAddMeeting: (meeting: Meeting) => void;
  selectedMeeting: Meeting | null;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ 
  selectedDate, 
  onAddMeeting, 
  selectedMeeting 
}) => {
  const { formData, handleChange, handleSubmit, timeOptions } = useMeetingForm(selectedDate, selectedMeeting, onAddMeeting);

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        {selectedMeeting ? 'Edit Meeting' : 'Schedule a Meeting'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
            required
          />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time<span className="text-red-500">*</span>
            </label>
            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
              required
            >
              {timeOptions.map((opt: { value: string; label: string }) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time<span className="text-red-500">*</span>
            </label>
            <select
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
              required
            >
              {timeOptions.map((opt: { value: string; label: string }) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attendee<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="attendee"
            value={formData.attendee}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {selectedMeeting ? 'Update Meeting' : 'Add Meeting'}
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
