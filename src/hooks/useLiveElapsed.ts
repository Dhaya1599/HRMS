import { useState, useEffect } from 'react';

/**
 * Returns elapsed time in HH:MM:SS from a given time string (HH:mm or HH:mm:ss).
 * Updates every second. Used for live attendance timer after punch in.
 */
export function useLiveElapsed(startTime: string | undefined | null, isRunning: boolean): string {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    if (!startTime || !isRunning) {
      setElapsed('00:00:00');
      return;
    }

    const update = () => {
      const [h, m] = startTime.split(':').map(Number);
      const start = new Date();
      start.setHours(h ?? 0, m ?? 0, 0, 0);
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());
      const totalSec = Math.floor(diffMs / 1000);
      const hrs = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      setElapsed(
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      );
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startTime, isRunning]);

  return elapsed;
}
