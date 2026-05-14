export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fideId?: string;
  lichessHandle?: string;
  rating?: number;
  message?: string;
  status: ApplicationStatus;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
}
