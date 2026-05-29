import type { IMessContact } from 'Common/types/domain.types';

export interface IMessInfoFormValues {
  mealPrice: number;
  messOwner: string;
  contractInfo: string;
  tenureStarts: string;
  tenureEnds: string;
}

export type IContactFormValues = IMessContact;
