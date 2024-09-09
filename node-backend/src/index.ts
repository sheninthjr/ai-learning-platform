import express, { Request, Response } from 'express';
import { getSubtitles } from 'youtube-caption-extractor';

const app = express();
const port = 3001;

app.use(express.json());

interface QueryParams {
  videoID?: string;
  lang?: string;
}

app.get('/api/subtitles', async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  const { videoID, lang = 'en' } = req.query;
  if (typeof videoID !== 'string') {
    return res.status(400).json({ error: 'Invalid videoID parameter' });
  }
  try {
    const subtitles = await getSubtitles({ videoID, lang });
    const subtitleText = subtitles.map((subtitle) => subtitle.text).join(' ');
    res.status(200).json(subtitleText);
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    res.status(500).json({ error: 'Failed to fetch subtitles' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});