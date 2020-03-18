import React, { FunctionComponent } from 'react'
import { CenteredBox } from './layout'
import { Spinner, SpinnerProps, Text, useTheme, BoxProps } from '@chakra-ui/core'
interface ILoading {
  spinner?: Partial<SpinnerProps>
  message?: string
  messageProps?: BoxProps
}
const Loading: FunctionComponent<ILoading> = ({ spinner, message, messageProps }) => {
  const theme = useTheme()
  return (
    <CenteredBox>
      <Spinner size="xl" {...spinner} />
      <Text fontSize="lg" marginTop={4} width="auto" height="auto" {...messageProps}>
        {message || 'Loading...'}
      </Text>
    </CenteredBox>
  )
}

export default Loading
