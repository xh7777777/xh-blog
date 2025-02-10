let isPrd = process.env.NODE_ENV === 'production' 
isPrd = true

export const URL = isPrd ? 'https://background.imxh777.com/api' : 'http://localhost:1337/api';
export const PORT = 1337;
export const REVALIDATE_TIME = 60;
export const PREFIX = isPrd ? 'https:////background.imxh777.com' : `http://localhost:${PORT}`