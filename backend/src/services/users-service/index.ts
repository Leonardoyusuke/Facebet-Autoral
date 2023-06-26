import bcrypt from 'bcrypt';
import userRepository from '@/repositories/users-repositories';
import { duplicatedEmailError, invalidCupomError, needWait1DayError } from './errors';
import jsonwebtoken from 'jsonwebtoken';
import { credencialsError } from '@/errors/credencials-erros';

const { sign, decode, verify } = jsonwebtoken;


async function createUser(username: string, email: string, password: string, pictureUrl: string) {
  const checkEmail = await userRepository.findEmail(email)
  if (checkEmail) throw duplicatedEmailError()
  const hashedPassword = await bcrypt.hash(password, 12);

  const create = await userRepository.createUSer(username, email, hashedPassword, pictureUrl)

  const token = sign({ id: create.id }, process.env.JWT_SECRET, { expiresIn: 86000 });
  return token

}

async function login(email: string, password: string) {
  const checkEmail = await userRepository.findEmail(email)
  if (!checkEmail) throw credencialsError()

  const checkPassword = await bcrypt.compare(password, checkEmail.password)
  console.log(checkPassword)
  if (!checkPassword) throw credencialsError()

  const token = sign({ id: checkEmail.id }, process.env.JWT_SECRET, { expiresIn: 86000 });
  return { token, checkEmail }
}

async function getCoins(userId: number) {
  const coins = await userRepository.getCoins(userId)
  return coins

}
async function SearchUsers(text: string) {
  const results = await userRepository.searchUsers(text)
  return results

}

async function freeCoins(userId: number) {
  const check = await userRepository.checkTimeForFreeCoins(userId)
  const lastTime = check.dailyCoins
  const dataAtual = new Date();
  const diferencaMilissegundos = dataAtual.getTime() - lastTime.getTime();
  if (diferencaMilissegundos > 86400000) {
    const increment = await userRepository.freeCoins(userId, dataAtual)
    return increment
  } else {
    throw needWait1DayError()
  }
}

async function cupom(userId: number, codigo: string) {
  if (codigo === "motherlode") {
    const increment = await userRepository.cupom(userId)
    return increment
  } else {
    throw invalidCupomError()
  }
}

async function getUserProfile(profileId:number) {
  const profile = await userRepository.getUserProfile(profileId)
  return profile
  
}


const usersService = {
  createUser,
  login,
  getCoins,
  SearchUsers,
  freeCoins,
  cupom,
  getUserProfile
}

export default usersService