import prisma from '../../src/config/database';
import { faker } from '@faker-js/faker';
import jsonwebtoken from 'jsonwebtoken';
import { env } from "process";

export async function createUser() {
    return await prisma.users.create({
        data:{
            username:"teste",
            password:"teste123",
            email:"teste@teste.com",
            pictureUrl:"https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ"
        }
    })   
}
export async function createRealUser() {
    return await prisma.users.create({
        data:{
            username: faker.lorem.word(),
            password: faker.internet.password(6),
            email: faker.internet.email(),
            pictureUrl: faker.image.url()
        }
    })   
}

export async function generateToken() {
    const { sign, decode, verify } = jsonwebtoken;

    const user = await createRealUser()
    const payload = {email:user.email,password:user.password}
    const token = sign(payload,process.env.JWT_SECRET)
    return token
    
}