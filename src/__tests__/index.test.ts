import { server } from "../index";
import mongoose from "mongoose";
import supertest from "supertest";
import dotenv from "dotenv";

// process.env.TS_NODE_DEV && require("dotenv").config();
dotenv.config();

const request = supertest(server);

describe("this test is for checking the process", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });
});

describe("Testing accommodation endpoints", () => {
  beforeAll((done) => {
    console.log("this is to open connect to the DB");

    mongoose.connect(process.env.MONGO_URL_TEST!).then(() => {
      console.log("mongo test DB is now connected");
      done();
    });
  });

  const data = {
    name: "hello",
    description: "no description",
    maxGuests: 5,
    city: "london",
  };

  it("should check that the POST /accommodations endpoint creates a new", async () => {
    const response = await request.post("/accommodations").send(data);
    expect(response.status).toBe(201);
  });

  afterAll((done) => {
    mongoose.connection
      .dropDatabase()
      .then(() => {
        return mongoose.connection.close();
      })
      .then(() => {
        done();
      });
  });
});
