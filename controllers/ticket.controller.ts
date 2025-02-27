import { Request, Response } from 'express';
import { Ticket, TicketStatus } from '../models/Ticket';
import { Op } from 'sequelize';

export const createTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { topic, description } = req.body;
    const ticket = await Ticket.create({ topic, description });
    res.status(201).json(ticket);
  } catch (er) {
    console.error(er);
  }
};

export const takeTicketInProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Тикет не найден' });
    ticket.status = TicketStatus.IN_PROGRESS;
    await ticket.save();
    res.json(ticket);
  } catch (er) {
    console.error(er);
  }
};

export const completeTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { resolution } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Тикет не найден' });
    ticket.status = TicketStatus.COMPLETED;
    ticket.resolution = resolution;
    await ticket.save();
    res.json(ticket);
  } catch (er) {
    console.error(er);
  }
};

export const cancelTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { cancellationReason } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Тикет не найден' });
    ticket.status = TicketStatus.CANCELED;
    ticket.cancellationReason = cancellationReason;
    await ticket.save();
    res.json(ticket);
  } catch (er) {
    console.error(er);
  }
};

export const getTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { date, startDate, endDate } = req.query;
    const where: any = {};
    if (date) where.createdAt = new Date(date as string);
    if (startDate && endDate)
      where.createdAt = {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
      };
    const tickets = await Ticket.findAll({ where });
    res.json(tickets);
  } catch (er) {
    console.error(er);
  }
};

export const cancelAllInProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    await Ticket.update(
      { status: TicketStatus.CANCELED },
      { where: { status: TicketStatus.IN_PROGRESS } },
    );
    res.json({ message: 'Все билеты отменены' });
  } catch (er) {
    console.error(er);
  }
};
