import { main$ } from '@shopgate/pwa-common/streams/main';

export const dummyActionReceived$ = main$
  .filter(({ action }) => action.type === 'RECEIVED_DUMMY_ACTION');
