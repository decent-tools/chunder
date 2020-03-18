import {
  Box,
  BoxProps,
  ButtonProps,
  PseudoBox,
  Text,
  useTheme,
} from '@chakra-ui/core'
import React, { FunctionComponent } from 'react'
import { IconType } from 'react-icons'
interface ICenteredBox {
  props?: Partial<BoxProps>
}
interface IFillBox {
  props?: Partial<BoxProps>
}
interface IToolbarButtonProps {
  props?: Partial<BoxProps> & Partial<ButtonProps>
  onClick?: () => void
  Icon: IconType
  text?: string
}
export const CenteredBox: FunctionComponent<ICenteredBox> = ({
  children,
  ...props
}) => {
  return (
    <Box
      flexDirection="column"
      {...props.props}
      display="flex"
      flex="1"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  )
}

export const FillBox: FunctionComponent<IFillBox> = ({
  children,
  ...props
}) => {
  return (
    <Box {...props.props} display="flex" flexDirection="column" flex="1">
      {children}
    </Box>
  )
}

export const ToolbarButton: FunctionComponent<IToolbarButtonProps> = ({
  onClick,
  Icon,
  text,
  ...props
}) => {
  const theme = useTheme()
  return (
    <PseudoBox
      color={theme.colors.gray[100]}
      backgroundColor={theme.colors.transparent}
      borderRadius={6}
      {...props.props}
      display="flex"
      flexDirection="row"
      alignItems="center"
      as="button"
      transition="ease-in-out all 0.3s"
      padding={2}
      _hover={{
        backgroundColor: theme.colors.blackAlpha[800],
        color: theme.colors.gray[200],
      }}
      onClick={onClick}
    >
      <CenteredBox props={{ flexDirection: 'row' }}>
        <Icon size={text ? 24 : 32} />
        {text && (
          <Text fontSize="s" whiteSpace="nowrap" marginLeft={1}>
            {text}
          </Text>
        )}
      </CenteredBox>
    </PseudoBox>
  )
}
