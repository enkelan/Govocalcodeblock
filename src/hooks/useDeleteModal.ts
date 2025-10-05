import { useState } from 'react';

export function useDeleteModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);

  const openModal = (id: string) => {
    setMeetingToDelete(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setMeetingToDelete(null);
    setModalOpen(false);
  };

  return {
    modalOpen,
    meetingToDelete,
    openModal,
    closeModal,
    setMeetingToDelete,
    setModalOpen,
  };
}

