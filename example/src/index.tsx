import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import { globalStyle } from './styles'
const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`

declare global {
  // tslint:disable-next-line
  interface Window {
    blockies: any
    web3: any
    ethereum: any
    Web3Connect: any,
    trustProvider: any
  }
}

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
