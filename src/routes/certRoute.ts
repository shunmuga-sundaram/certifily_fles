// src/routes/certRoute.ts
import { Router, Request, Response } from 'express';
import { dirname, join, resolve } from 'path';
import fs from 'fs';
import getDataSource from '../db/data-source';

const router = Router();

// GET /:vertifiId
router.get('/:vertifiId', async (req: Request, res: Response) => {
  const vertifiId = (req.params.vertifiId);

  try {
    const dataSource = await getDataSource();

    // Raw SQL query without entity
    const result: { certificate_file_path: string }[] = await dataSource.query(
      'SELECT certificate_file_path FROM certificate WHERE cid = ?',
      [vertifiId]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const filePath = result[0].certificate_file_path;
    const absolutePath = resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    return res.sendFile(absolutePath);
  } catch (err) {
    console.error('Error fetching certificate:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/thumbnail/:vertifiId', async (req: Request, res: Response) => {
  const vertifiId = (req.params.vertifiId);

  try {
    const dataSource = await getDataSource();

    // Raw SQL query without entity
    const result: { thumbnail_path: string }[] = await dataSource.query(
      'SELECT thumbnail_path FROM certificate WHERE cid = ?',
      [vertifiId]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const filePath = result[0].thumbnail_path;
    const absolutePath = resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    return res.sendFile(absolutePath);
  } catch (err) {
    console.error('Error fetching certificate:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
