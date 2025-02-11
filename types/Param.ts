import { StackScreenProps } from '@react-navigation/stack';
import { Meetup } from './Meetup';


export type AllmeetupParams = {
    AllMeetups : undefined; 
    MeetupDetails : Meetup; 
}

export type AboutStackParams = {
    About: undefined;
};
  
export type AuthStackParams = {
    Login: undefined;
  Register: undefined;
}

export type TabNavParams = {
    AllMeetups: undefined;
    About: undefined;
}

export type MainStackParams= {
    AllmeetupStack : undefined; 
    AboutStack : undefined; 
    AuthStack : undefined; 
}

export type MeetupSrackParams= {
    MeeetupsScreen : undefined
}

export type TabScreenProps<T extends keyof TabNavParams> =
  StackScreenProps<TabNavParams, T>;

  export type AuthStackScreenProps<T extends keyof AuthStackParams> =
  StackScreenProps<AuthStackParams, T>;

  export type AllMeetupStackScreenProps<T extends keyof AllmeetupParams> =
  StackScreenProps<AllmeetupParams, T>;

  export type AboutStackScreenProps<T extends keyof AboutStackParams> =
  StackScreenProps<AboutStackParams, T>;

  export type MeetupStackScreenProps<T extends keyof MeetupSrackParams> =
  StackScreenProps<MeetupSrackParams, T>;