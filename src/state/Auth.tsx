import { atomWithStorage } from 'jotai/utils';

export const csrfToken = atomWithStorage<string|null>('CSRF-Token',
                                                      null,
                                                      undefined,
                                                      {
                                                        getOnInit: true
                                                      });

csrfToken.debugLabel = 'csrfToken';


// email, profile details in user details

export type UserDetails = {
  email: string;
  username: string;
  profilePicture: string;
  details: any; // Additional user details
}

export const userDetails = atomWithStorage<UserDetails|null>('User-Details',
                                                      null,
                                                      undefined,
                                                      {
                                                        getOnInit: true
                                                      });

userDetails.debugLabel = 'userDetails';
