import { atomWithStorage } from 'jotai/utils';

export const csrfToken = atomWithStorage<string|null>('auth',
                                                      null,
                                                      undefined,
                                                      {
                                                        getOnInit: true
                                                      });

csrfToken.debugLabel = 'csrfToken';
