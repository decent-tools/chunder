import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import StreamrClient from 'streamr-client'
import { ChunderContext } from './app'
import { FillBox } from './layout'
import Loading from './loading'

const Room = () => {
  const { streamId } = useRouteMatch().params as { streamId: string }
  const { token } = qs.parse(useLocation().search.replace('?', ''))
  const [roomName, setRoomName] = useState()
  const [messages, setMessages] = useState<any[]>([])
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    const client = new StreamrClient({
      auth: {
        apiKey: token,
      },
    })
    client.connect()
    client.on('connected', () => {
      client.getStream(streamId).then(stream => {
        setRoomName(stream.name)
      })
      const subscription = client.subscribe(
        {
          stream: streamId,
          resend: {
            from: {
              timestamp: 0,
            },
          },
        },
        (message: any) => {
          console.log(message)
        }
      )
      subscription.on('subscribed', async () => {
        await client.publish(streamId, {
          message: 'Hello World',
        })
        setConnected(true)
      })
    })
    return () => {
      client.unsubscribeAll(streamId)
    }
  }, [])
  return (
    <FillBox>
      {!connected && !roomName && <Loading />}
      {!connected && roomName && (
        <Loading message={`Connecting to ${roomName}...`} />
      )}
      {connected && <h1>Connected</h1>}
    </FillBox>
  )
}

export default Room
