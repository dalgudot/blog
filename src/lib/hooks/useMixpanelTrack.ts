import mixpanel, { Dict } from 'mixpanel-browser';
import { useEffect } from 'react';

// page view 이벤트일 때 사용하는 hook - useEffect
// click event는 mixpanel.track()을 그대로 사용.
export function useMixpanelTrack(event_name: string, properties?: Dict): void {
  useEffect(() => {
    mixpanel.track(event_name, properties);
  }, []);
}
