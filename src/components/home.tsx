import { Button, Flex, Input, useTheme } from '@chakra-ui/core'
import axios, { AxiosInstance } from 'axios'
import { ethers } from 'ethers'
import hri from 'human-readable-ids'
import React, { useEffect, useState } from 'react'
import { FiCommand } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'
import Web3Modal from 'web3modal'
import { CenteredBox } from './layout'
import Loading from './loading'
const streamrUrl = 'https://www.streamr.com/api/v1'
const Home = () => {
  const theme = useTheme()
  const [roomName, setRoomName] = useState<string>(hri.hri.random())
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const createRoom = async () => {
    const web3modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {},
    })
    const tempProvider: any = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(tempProvider)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const challenge = await axios
      .post(`${streamrUrl}/login/challenge/${address}`)
      .then(resp => resp.data)
    const signature = await signer.signMessage(challenge.challenge)
    const sessionToken = await axios
      .post(`${streamrUrl}/login/response`, {
        challenge: {
          id: challenge.id,
          challenge: challenge.challenge,
        },
        signature,
        address,
      })
      .then(resp => resp.data.token)
    const api = axios.create({
      baseURL: streamrUrl,
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    const stream = await api
      .post('/streams', {
        name: roomName,
      })
      .then(resp => resp.data)
    const apiKey = await api
      .post(`/streams/${stream.id}/keys`, {
        name: 'temporary-access',
        permission: 'write',
      })
      .then(resp => resp.data)
    return { streamId: stream.id, token: apiKey.id }
  }
  return (
    <CenteredBox
      props={{
        backgroundColor: theme.colors.gray[700],
        color: theme.colors.gray[400],
      }}
    >
      {loading && <Loading message={`Creating room ${roomName}...`} />}
      {!loading && (
        <Flex
          flexDirection="row"
          justify="space-between"
          backgroundColor={theme.colors.blackAlpha[700]}
          padding={8}
          borderRadius={6}
        >
          <Input
            placeholder="Room Name"
            width="400px"
            value={roomName}
            borderRadius={2}
            color={theme.colors.gray[800]}
            onChange={(e: any) => {
              const value = e.target.value.replace(/ /g, '-')
              setRoomName(slugify(value, { lower: true }))
            }}
          />
          <Button
            variantColor="green"
            marginLeft={2}
            leftIcon={FiCommand}
            onClick={async () => {
              setLoading(true)
              const room = await createRoom()
              history.push(`/${room.streamId}?token=${room.token}`)
            }}
          >
            Start Room
          </Button>
        </Flex>
      )}
    </CenteredBox>
  )
}

export default Home
