import type { NextPage } from 'next';
import { RefObject, useRef } from 'react';
import StageLightingWaveAnimation from '../../../canvas/stage-lighting-wave-animation/stage-lighting-wave-animation';
import { useClientWidthHeight } from '../../../lib/hooks/useClientWidthHeight';

const Example: NextPage = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientRect = useClientWidthHeight(mainRef);
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;

  return (
    <main ref={mainRef} style={{ width: '100vw', height: '100vh' }}>
      <StageLightingWaveAnimation
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
    </main>
  );
};

export default Example;
