import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../database';
import { User } from '../models/user';

export async function createUser(user: User): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
    [user.email, user.password, user.username]
  );
  return result.insertId;
}

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0] as User || null;
}

export async function updateUser(id: number, user: Partial<User>): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE users SET ? WHERE id = ?',
    [user, id]
  );
  return result.affectedRows > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}
