import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../models/user';

export async function createUser(req: Request, res: Response) {
  try {
    const user: User = req.body;
    const userId = await userService.createUser(user);
    res.status(201).json({ id: userId, ...user });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const userData: Partial<User> = req.body;
    const success = await userService.updateUser(id, userData);
    if (success) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const success = await userService.deleteUser(id);
    if (success) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
}