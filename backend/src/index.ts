import express from 'express';
import cors from 'cors';
import { generateCode } from './routes/generate';
import { validateFlow } from './routes/validate';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/generate', generateCode);
app.post('/api/validate', validateFlow);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🔥 MCPForge Backend running on port ${PORT}`);
});
