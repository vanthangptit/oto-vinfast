import * as fs from 'fs';
export const appError = (message: string, statusCode?: number) => {
  let error: any = new Error(message);
  error.statusCode = statusCode ? statusCode : 500;
  return error;
};

export function getEntity(filename: any) {
  let entity = JSON.parse(fs.readFileSync(`${__dirname}/../contents/${filename}.json`,'utf-8'));

  if (!entity) {
    throw Error('FileName is empty!');
  }

  return entity;
}
