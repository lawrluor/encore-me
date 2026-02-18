import { type Act } from '../../types/act';

import { sql } from './client';

type ActMember = {
  id: string;
  email: string;
  name: string;
  role: string;
  joined_at: string;
};

type UserAct = {
  user_id: string;
  act_id: string;
  role: string;
};

const createAct = async (name: string, description = ''): Promise<Act> => {
  const result = await sql`
    INSERT INTO acts (name, description)
    VALUES (${name}, ${description})
    RETURNING *
  `;

  return result.rows[0] as Act;
};

const getActById = async (id: string | null): Promise<Act | null> => {
  if (!id) return null;
  const result = await sql`
    SELECT * FROM acts 
    WHERE id = ${id}
  `;
  return (result.rows[0] as Act) ?? null;
};

const getAllActs = async (): Promise<Act[]> => {
  const result = await sql`
    SELECT * FROM acts 
    ORDER BY created_at DESC
  `;
  return result.rows as Act[];
};

const getActsByUserId = async (userId: string): Promise<Act[]> => {
  const result = await sql`
    SELECT a.*, ua.role, ua.joined_at
    FROM acts a
    INNER JOIN user_acts ua ON a.id = ua.act_id
    WHERE ua.user_id = ${userId}
    ORDER BY a.created_at DESC
  `;
  return result.rows as Act[];
};

const getActMembers = async (actId: string): Promise<ActMember[]> => {
  const result = await sql`
    SELECT u.id, u.email, u.name, ua.role, ua.joined_at
    FROM users u
    INNER JOIN user_acts ua ON u.id = ua.user_id
    WHERE ua.act_id = ${actId}
    ORDER BY ua.joined_at ASC
  `;
  return result.rows as ActMember[];
};

const updateAct = async (id: string, updates: { name?: string; description?: string }): Promise<Act | null> => {
  const { name, description } = updates;
  const result = await sql`
    UPDATE acts 
    SET 
      name = COALESCE(${name ?? null}, name),
      description = COALESCE(${description ?? null}, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return (result.rows[0] as Act) ?? null;
};

const deleteAct = async (id: string): Promise<Act | null> => {
  const result = await sql`
    DELETE FROM acts 
    WHERE id = ${id}
    RETURNING *
  `;
  return (result.rows[0] as Act) ?? null;
};

const addUserToAct = async (userId: string, actId: string, role = ''): Promise<UserAct> => {
  const result = await sql`
    INSERT INTO user_acts (user_id, act_id, role)
    VALUES (${userId}, ${actId}, ${role})
    ON CONFLICT (user_id, act_id) 
    DO UPDATE SET role = ${role}
    RETURNING *
  `;
  return result.rows[0] as UserAct;
};

const removeUserFromAct = async (userId: string, actId: string): Promise<UserAct | null> => {
  const result = await sql`
    DELETE FROM user_acts 
    WHERE user_id = ${userId} AND act_id = ${actId}
    RETURNING *
  `;
  return (result.rows[0] as UserAct) ?? null;
};

const deleteAllActs = async (): Promise<Act[]> => {
  const result = await sql`
    DELETE FROM acts
    RETURNING *
  `;
  return result.rows as Act[];
};

const isUserMemberOfAct = async (userId: string, actId: string): Promise<boolean> => {
  const result = await sql`
    SELECT 1 FROM user_acts
    WHERE user_id = ${userId} AND act_id = ${actId}
  `;
  return result.rows.length > 0;
};

export {
  createAct,
  getActById,
  getAllActs,
  getActsByUserId,
  getActMembers,
  updateAct,
  deleteAct,
  addUserToAct,
  removeUserFromAct,
  deleteAllActs,
  isUserMemberOfAct
};
