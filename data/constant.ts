let isPrd = process.env.NODE_ENV === 'production' 
isPrd = true

export const URL = isPrd ? 'https://myadministration.xh777blog.xyz/api' : 'http://localhost:3004/api';
export const PORT = 3004;
export const REVALIDATE_TIME = 60 * 60;
export const PREFIX = isPrd ? 'https://myadministration.xh777blog.xyz' : `http://localhost:${PORT}`