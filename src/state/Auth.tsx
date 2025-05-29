import { atomWithStorage } from 'jotai/utils';

export const csrfToken = atomWithStorage<string|null>('CSRF-Token',
                                                      null,
                                                      undefined,
                                                      {
                                                        getOnInit: true
                                                      });

csrfToken.debugLabel = 'csrfToken';
