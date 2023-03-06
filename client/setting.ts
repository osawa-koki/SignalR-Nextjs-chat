import Env from '';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '🐱 SignalR-Nextjs-chat 🐱',
};

export default setting;
