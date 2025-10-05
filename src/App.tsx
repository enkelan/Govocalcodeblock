import { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import Calendar from './components/Calendar';
import MeetingForm from './components/MeetingForm';
import MeetingList from './components/MeetingList';
import SearchBar from './components/SearchBar';
import { Meeting } from './types';
import { useMeetings } from './hooks/useMeetings';
import { filterMeetingsBySearch, filterMeetingsByDate } from './utils/meeting';
import { handleAddMeeting, handleEditMeeting, handleDeleteMeeting } from './utils/meetingHandlers';

function App() {
  const { meetings, addOrUpdateMeeting, deleteMeeting, refreshMeetings } = useMeetings();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
    const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter meetings based on search term
  const filteredMeetings = useMemo(() => filterMeetingsBySearch(meetings, searchTerm), [meetings, searchTerm]);

  return (
    <main className="min-h-screen bg-zinc-800 text-gray-800">
      <Toaster position="top-right" />
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </header>

        {searchTerm.trim() && (
                     <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Search Results</h2>
            <MeetingList
              meetings={filteredMeetings}
              onEditMeeting={meeting => handleEditMeeting({ meeting, setSelectedMeeting, setSelectedDate })}
              onDeleteMeeting={id => handleDeleteMeeting({ id, deleteMeeting, refreshMeetings, setIsRefreshing, selectedMeeting, setSelectedMeeting })}
            />
                     </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              meetings={meetings}
            />
            <MeetingForm
              selectedDate={selectedDate}
              onAddMeeting={meeting => handleAddMeeting({ meeting, addOrUpdateMeeting, selectedMeeting, setSelectedMeeting })}
              selectedMeeting={selectedMeeting}
            />
            {!searchTerm.trim() && (
              <>
                <MeetingList
                  meetings={filterMeetingsByDate(meetings, selectedDate)}
                  onEditMeeting={meeting => handleEditMeeting({ meeting, setSelectedMeeting, setSelectedDate })}
                  onDeleteMeeting={id => handleDeleteMeeting({ id, deleteMeeting, refreshMeetings, setIsRefreshing, selectedMeeting, setSelectedMeeting })}
                />
              </>
            )}
        </section>
      </div>
    </main>
  );
}

export default App;
