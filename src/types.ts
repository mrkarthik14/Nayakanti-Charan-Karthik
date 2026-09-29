export type ValentineDayId = 
  | 'rose' 
  | 'propose' 
  | 'chocolate' 
  | 'teddy' 
  | 'promise' 
  | 'hug' 
  | 'valentine';

export interface DayMeta {
  id: ValentineDayId;
  dayNumber: number;
  date: string;
  title: string;
  tamilTitle: string;
  tamilEndearment: string;
  tamilMeaning: string;
  icon: string;
  tagline: string;
  romanticMessage: (partnerName: string) => string;
  poeticVerseTamil: string;
  poeticVerseEnglish: string;
}

export interface UserPersonalization {
  partnerName: string;
  senderName: string;
  relationshipStatus: string;
  preferredTamilEndearment: string;
}

export interface AppInteractions {
  // Day 1: Rose
  rose: {
    selectedColor: 'crimson' | 'blush' | 'gold' | 'white';
    petalsGathered: number;
    bouquetSent: boolean;
    sentAt?: string;
  };
  // Day 2: Propose
  propose: {
    accepted: boolean;
    loveLevel: number; // 100 - 1000%
    secretNote: string;
    acceptedAt?: string;
  };
  // Day 3: Chocolate
  chocolate: {
    unwrappedIds: string[];
    favoriteFlavour?: string;
  };
  // Day 4: Teddy
  teddy: {
    squeezes: number;
    accessory: 'bowtie' | 'heart' | 'rose' | 'scarf';
    furTone: 'classic' | 'caramel' | 'honey' | 'mocha';
  };
  // Day 5: Promise
  promise: {
    sealedVows: string[];
    customVow: string;
  };
  // Day 6: Hug
  hug: {
    completedHug: boolean;
    totalHugsGiven: number;
    warmthEnergy: number;
  };
  // Completed status flags
  completed: Record<ValentineDayId, boolean>;
}

export interface AppStorageState {
  personalization: UserPersonalization;
  interactions: AppInteractions;
  activeDay: ValentineDayId;
}
