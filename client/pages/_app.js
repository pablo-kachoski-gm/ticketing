import { createGlobalStyle, ThemeProvider } from "styled-components";
import buildClient from "../api/build-client";
import Header from "../components/header";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    color: red
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App({ Component, pageProps, currentUser }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div>
          <Header currentUser={currentUser} />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(ctx);
  }
  return { pageProps, ...data };
};
export default App;
