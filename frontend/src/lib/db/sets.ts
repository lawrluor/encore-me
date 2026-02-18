import { type Set } from '../../types/set';

import { sql } from './client';

const createSet = async (actId: string, title: string, description = ''): Promise<Set> => {
  const result = await sql`
    INSERT INTO sets (act_id, title, description)
    VALUES (${actId}, ${title}, ${description})
    RETURNING *
  `;
  return result.rows[0] as Set;
};

const getSetById = async (id: string): Promise<Set | null> => {
  const result = await sql`
    SELECT * FROM sets 
    WHERE id = ${id}
  `;
  return (result.rows[0] as Set) ?? null;
};

const getSetsByActId = async (actId: string): Promise<Set[]> => {
  const result = await sql`
    SELECT * FROM sets 
    WHERE act_id = ${actId}
    ORDER BY created_at DESC
  `;
  return result.rows as Set[];
};

const getAllSets = async (): Promise<Set[]> => {
  const result = await sql`
    SELECT s.*, a.name as act_name
    FROM sets s
    INNER JOIN acts a ON s.act_id = a.id
    ORDER BY s.created_at DESC
  `;
  return result.rows as Set[];
};

const checkUserSetAccess = async (userId: string, setId: string): Promise<boolean> => {
  const result = await sql`
    SELECT 1 
    FROM user_acts ua
    INNER JOIN sets s ON s.act_id = ua.act_id
    WHERE ua.user_id = ${userId} AND s.id = ${setId}
  `;
  return result.rows.length > 0;
};

const updateSet = async (id: string, updates: { title?: string; description?: string }): Promise<Set | null> => {
  const { title, description } = updates;
  const result = await sql`
    UPDATE sets 
    SET 
      title = COALESCE(${title ?? null}, title),
      description = COALESCE(${description ?? null}, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return (result.rows[0] as Set) ?? null;
};

const deleteSet = async (id: string): Promise<Set | null> => {
  const result = await sql`
    DELETE FROM sets 
    WHERE id = ${id}
    RETURNING *
  `;
  return (result.rows[0] as Set) ?? null;
};

const deleteAllSets = async (): Promise<{ id: string }[]> => {
  const result = await sql`
    DELETE FROM sets
    RETURNING id
  `;
  return result.rows as { id: string }[];
};

export {
  createSet,
  getSetById,
  getSetsByActId,
  getAllSets,
  checkUserSetAccess,
  updateSet,
  deleteSet,
  deleteAllSets,
};
