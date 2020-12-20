import buildClient from "../api/build-client";

export default function LandingPage({ currentUser }) {
  return <h1>{`You are${!currentUser ? " not" : ""} signed in`}</h1>;
}

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};
