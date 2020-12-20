import jwt from "jsonwebtoken";
export const signin = () => {
  const email = "test@test.com";
  const id = "user1";
  const payload = {
    email,
    id,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`express:sess=${base64}`];
};
