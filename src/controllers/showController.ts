import { Request, Response } from 'express';
import Show, { IShow } from '../models/Show';
import { isAdmin } from '../utils/adminUtils';

export async function saveShow(req: Request, res: Response) {
  const { adminUserId, showName, showDescription, showCategory, showLocation, showPrice, showImage, showDateTime, seats } = req.body;

  try {
    // 관리자 권한 확인
    const isAdminUser = await isAdmin(adminUserId); // adminUserId를 통해 어드민 여부를 확인합니다.
    if (!isAdminUser) {
      return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
    }

    // 새로운 공연 생성
    const newShow: IShow = new Show({
      showName,
      showDescription,
      showCategory,
      showLocation,
      showPrice,
      showImage,
      showDateTime,
      seats,
    });

    // 데이터베이스에 저장
    const savedShow = await newShow.save();

    res.status(201).json(savedShow);
  } catch (err) {
    console.error('Error saving show:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getShows(req: Request, res: Response) {
  try {
    const shows: IShow[] = await Show.find();

    res.status(200).json(shows);
  } catch (err) {
    console.error('Error fetching shows:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function searchShows(req: Request, res: Response) {
  const { q } = req.query;

  try {
    const shows: IShow[] = await Show.find({ showName: { $regex: q, $options: 'i' } });

    res.status(200).json(shows);
  } catch (err) {
    console.error('Error searching shows:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getShowById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const show: IShow | null = await Show.findById(id);

    if (!show) {
      return res.status(404).json({ error: '공연을 찾을 수 없습니다.' });
    }

    res.status(200).json(show);
  } catch (err) {
    console.error('Error fetching show by id:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
