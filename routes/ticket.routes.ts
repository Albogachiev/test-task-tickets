import { Router } from 'express';
import {
  createTicket,
  takeTicketInProgress,
  completeTicket,
  cancelTicket,
  getTickets,
  cancelAllInProgress,
} from '../controllers/ticket.controller';

export const ticketRouter = Router();

ticketRouter.post('/', createTicket);
ticketRouter
  .patch('/:id/in-progress', takeTicketInProgress)
  .patch('/:id/complete', completeTicket)
  .patch('/:id/cancel', cancelTicket)
  .patch('/cancel-all', cancelAllInProgress);
ticketRouter.get('/', getTickets);
