/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCallback, useState, type ReactNode} from 'react';

import {
  COMING_SOON_GATE_ENABLED,
  COMING_SOON_TRIPLE_CLICK_BYPASS_ENABLED,
} from './comingSoonConfig';
import {ComingSoonOverlay} from './ComingSoonOverlay';

export type ComingSoonRootGateProps = {
  children: ReactNode;
};

export function ComingSoonRootGate({children}: ComingSoonRootGateProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleBypass = useCallback(() => setDismissed(true), []);

  if (COMING_SOON_GATE_ENABLED && !dismissed) {
    return (
      <ComingSoonOverlay
        tripleClickBypassEnabled={COMING_SOON_TRIPLE_CLICK_BYPASS_ENABLED}
        onBypass={handleBypass}
      />
    );
  }

  return children;
}
