import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateSpecificity, validateCssColor, isValidCssLength } from './validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets from src directory (or dist in production)
const staticDir = path.resolve(__dirname, '..', 'src');
app.use(express.static(staticDir));

app.post('/api/specificity', (req: Request, res: Response) => {
  const { selector } = req.body;
  if (typeof selector !== 'string') {
    return res.status(400).json({ error: 'Selector must be a string' });
  }
  const specificity = calculateSpecificity(selector);
  return res.json({ selector, specificity });
});

app.post('/api/validate-color', (req: Request, res: Response) => {
  const { color } = req.body;
  if (typeof color !== 'string') {
    return res.status(400).json({ error: 'Color must be a string' });
  }
  const result = validateCssColor(color);
  return res.json(result);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`learn-css showcase server running on http://localhost:${PORT}`);
  });
}

export { app };
