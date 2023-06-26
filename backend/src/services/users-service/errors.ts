import { ApplicationError } from "protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}
export function needWait1DayError(): ApplicationError {
  return {
    name: 'needWait1DayError',
    message: 'Need to Wait 1 day since last pickup',
  };
}
export function invalidCupomError(): ApplicationError {
  return {
    name: 'InvalidCupomError',
    message: 'Cupom is expired or Invalid',
  };
}
