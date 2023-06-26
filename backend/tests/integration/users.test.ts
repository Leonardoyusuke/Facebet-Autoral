import supertest from "supertest"
import server from "index";
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { createRealUser, createUser } from "../factories/users-factory";
import { cleanDb } from "../helpers";
import prisma, { disconnectDB } from "@/config/database";

const api = supertest(server);

beforeAll(async () => {
  await cleanDb();
});
afterEach((done) => {
  server.close(() => {
    server.unref();
    done();
  });
});

describe('Post /users', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await api.post('/users/signup').send({})
    expect(response.status).toBe(httpStatus.BAD_REQUEST);

  });
  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await api.post('/users/signup').send(invalidBody)

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it('should respond with status 401 if there is no user for given email', async () => {
      const body = generateValidBody();

      const response = await api.post('/users/signin').send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should respond with status 409 when the email is already in use", async () => {
      await createUser()
      const createNewUser = {
        username: faker.lorem.word(),
        password: faker.internet.password(6),
        email: "teste@teste.com",
        pictureUrl: faker.image.url()
      }
      const response = await api.post('/users/signup').send(createNewUser);

      expect(response.status).toBe(httpStatus.CONFLICT);

    })
    it("should respond with status 201 when created ", async ()=>{
      const newUser =  {username: faker.lorem.word(),
        password: faker.internet.password(6),
        email: faker.internet.email(),
        pictureUrl: faker.image.url()}

      const response = await api.post('/users/signup').send(newUser);
      expect(response.status).toBe(httpStatus.CREATED);
    })
  })
})