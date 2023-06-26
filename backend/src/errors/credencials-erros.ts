import { ApplicationError } from '@/protocols';

export function credencialsError(): ApplicationError {
  return {
    name: 'CredencialsError ',
    message: 'Email or Password wrong!',
  };
}
