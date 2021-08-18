import { Subjects } from './subjects';

// Bind a subject with its event data
export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
}
