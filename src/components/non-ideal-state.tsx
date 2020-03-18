import { Icon, IconProps, Text, useTheme } from '@chakra-ui/core'
import React, { FunctionComponent } from 'react'
import { CenteredBox } from './layout'

interface INonIdealState {
  title: string
  icon: Partial<IconProps>
}
const NonIdealState: FunctionComponent<INonIdealState> = ({ icon, title }) => {
  const theme = useTheme()
  return (
    <CenteredBox>
      <Icon color={theme.colors.gray[400]} {...icon} size="72px" />
      <Text fontSize="3xl" marginTop={8} color={theme.colors.gray[500]}>
        {title}
      </Text>
    </CenteredBox>
  )
}

export default NonIdealState
