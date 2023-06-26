import { ApplicationError } from "protocols";

export function coinsInsufficientError(): ApplicationError {
  return {
    name: 'CoinsNnsufficientError',
    message: 'You dont have coins enough for this bet',
  };
}