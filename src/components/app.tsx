import { useTheme, useToast, useToastOptions } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import StreamrClient from 'streamr-client'
import truncateMiddle from 'truncate-middle'
import Home from './home'
import { FillBox } from './layout'
import Loading from './loading'
import Room from './room'

interface IChunderContext {
  notify: (
    title: string,
    status?: 'info' | 'error' | 'success' | 'warning',
    props?: useToastOptions
  ) => void
}
export let ChunderContext: React.Context<IChunderContext>

const App = () => {
  const toast = useToast()
  const theme = useTheme()
  const notify = (
    title: string,
    status: 'info' | 'error' | 'success' | 'warning' = 'info',
    props?: useToastOptions
  ) => {
    toast({ ...props, title, status, position: 'bottom-right' })
  }

  const context: IChunderContext = {
    notify,
  }
  ChunderContext = React.createContext(context)
  return (
    <ChunderContext.Provider value={context}>
      <FillBox
        props={{
          backgroundColor: theme.colors.gray[700],
          color: theme.colors.gray[400],
        }}
      >
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/:streamId">
            <Room />
          </Route>
        </Switch>
      </FillBox>
    </ChunderContext.Provider>
  )
}

export default hot(App)
