import { useEffect, useState } from 'react'
import Header from './component/Header'
import Logo from './component/Logo'
import Menu from './component/Menu'
import Account from './component/Acccount'
import NewsView from './component/NewsView'

function App() {
  return (
    <>
      <Header >
        <Logo />
        <Menu />
        <Account />
      </Header>
      <NewsView />
    </>
  )
}

export default App
