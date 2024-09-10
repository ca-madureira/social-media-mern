import { Request } from 'express';

export const converteBase64 = (avatar: any) => {
  if (!avatar) return undefined;

  const buffer = avatar.buffer;
  const base64 = buffer.toString('base64');

  return `data:${avatar.mimetype};base64,${base64}`;
};
