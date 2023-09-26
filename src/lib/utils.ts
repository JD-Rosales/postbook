import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwtId(): number | undefined {
  const token = localStorage.getItem('token') || '';

  if (token) {
    // Split the token and taken the second
    const base64Url = token.split('.')[1];

    // Replace "-" with "+"; "_" with "/"
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    const user = JSON.parse(window.atob(base64));

    if (typeof parseInt(user.id) === 'number') {
      return user.id;
    }
  }

  return undefined;
}

export function getErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
}
