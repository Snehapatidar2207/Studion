import React from 'react';
import { FlexibleStudyTimerModal } from '../timer/FlexibleStudyTimerModal';

/**
 * Backward compatibility wrapper for PomodoroModal
 * Directs to the upgraded FlexibleStudyTimerModal
 */
export const PomodoroModal = () => {
  return <FlexibleStudyTimerModal />;
};

export default PomodoroModal;
