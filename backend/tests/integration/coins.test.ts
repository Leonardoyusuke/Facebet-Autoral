import supertest from "supertest"
import server from "../../src/index"
import httpStatus from 'http-status';
import { createRealUser, generateToken } from "../factories/users-factory";
import prisma, { connectDb, disconnectDB } from "../../src/config/database";
import { cleanDb } from "../helpers";


const api = supertest(server);

beforeAll(async () => {
    await cleanDb();
    await connectDb()
  });
  afterEach((done) => {
    server.close(() => {
      server.unref();
      done();
    });
  });
describe('get /users/coins', () =>{
    it('should respond with status 401 when the user already taked the coins', async()=>{
        const token = await generateToken()
        const enviar = { headers: { Authorization: token } }

        const response = await api.get('/users/freecoins').send(enviar)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)

    })
})