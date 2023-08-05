import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwtId(): number {
  const token = localStorage.getItem('token') || '';

  // Split the token and taken the second
  const base64Url = token.split('.')[1];

  // Replace "-" with "+"; "_" with "/"
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  const user = JSON.parse(window.atob(base64));

  if (typeof parseInt(user.id) === 'number') {
    return user.id;
  }

  return 0;
}
