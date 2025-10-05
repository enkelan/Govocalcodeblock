import React from "react";
import { Meeting } from '../types';
import ConfirmModal from './ConfirmModal';
import { useDeleteModal } from '../hooks/useDeleteModal';

interface MeetingListProps {
  meetings: Meeting[];
  onEditMeeting: (meeting: Meeting) => void;
  onDeleteMeeting: (id: string) => void;
}

const MeetingList: React.FC<MeetingListProps> = ({ 
  meetings, 
  onEditMeeting, 
  onDeleteMeeting 
}) => {
  const {
    modalOpen,
    meetingToDelete,
    openModal,
    closeModal
  } = useDeleteModal();

  const handleConfirmDelete = () => {
    if (meetingToDelete) {
      onDeleteMeeting(meetingToDelete);
      closeModal();
    }
  };

  if (meetings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-5 transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Meetings for the Day</h2>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 font-medium">No meetings scheduled for this day.</p>
          <p className="text-gray-500 text-sm mt-1">Select a date and use the form to schedule a new meeting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Meetings for the Day</h2>
      <div className="space-y-4">
        {meetings.map(meeting => (
          <div 
            key={meeting.id} 
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 bg-white transition-colors duration-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800 text-lg">{meeting.title}</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={() => onEditMeeting(meeting)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Edit
                </button>
                <button 
                  onClick={() => openModal(meeting.id)}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="text-sm font-medium text-blue-600 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {meeting.startTime} - {meeting.endTime}
            </div>

            {meeting.description && (
              <div className="text-sm text-gray-700 mt-3 bg-gray-50 p-2 rounded-md">
                {meeting.description}
              </div>
            )}

            <div className="text-sm text-gray-700 mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {meeting.attendee}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {meeting.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        open={modalOpen}
        title="Delete Meeting"
        message="Are you sure you want to delete this meeting? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
};

export default MeetingList;
