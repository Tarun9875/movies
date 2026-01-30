//backend/src/controllers/booking/booking.controller.ts
import { Request, Response } from "express";
import {
  lockSeats,
  unlockSeats,
  getLockedSeats
} from "../../services/booking/seatLock.service";

export const lockSeatController = async (req: any, res: Response) => {
  const { showId, seats } = req.body;
  const userId = req.user.id;

  await lockSeats(showId as string, seats as string[], userId);

  res.json({
    success: true,
    message: "Seats locked successfully"
  });
};

export const unlockSeatController = async (req: any, res: Response) => {
  const { showId, seats } = req.body;
  const userId = req.user.id;

  await unlockSeats(showId as string, seats as string[], userId);

  res.json({
    success: true,
    message: "Seats unlocked successfully"
  });
};

export const lockedSeatsController = async (req: Request, res: Response) => {
  const showId = req.params.showId as string;

  const lockedSeats = await getLockedSeats(showId);

  res.json({
    success: true,
    lockedSeats
  });
};
