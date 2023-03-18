import mixpanel, { Dict } from 'mixpanel-browser';
import { useEffect } from 'react';

export function useMixpanelTrack(event_name: string, properties?: Dict): void {
  useEffect(() => {
    mixpanel.track(event_name, properties);
  }, []);
}
