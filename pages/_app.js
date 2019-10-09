import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    @font-face {
      font-family: 'Game';
      src: url('../static/fonts/Game-Of-Thrones.ttf');
    }
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  body {
    min-height: 90vh;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Game, Arial, Helvetica, sans-serif;
    background-image: linear-gradient(to top, #00c9c8, #49d3d1, #6bdcda, #87e6e3, #a0efec, #a0e9e6, #a0e2df, #a0dcd9, #89c4c2, #73adab, #5d9795, #47817f);
  }
`;

const theme = {
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
