import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/app'
ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById('root')
)
