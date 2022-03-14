import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Box, cssClass, themeGet } from '@adminjs/design-system'

import { BrandingOptions } from 'src/adminjs-options.interface'
import { ResourceJSON, PageJSON } from 'src/frontend/interfaces'
import SidebarBranding from './sidebar-branding'
import SidebarPages from './sidebar-pages'
import { ReduxState } from '../../../store/store'
import SidebarFooter from './sidebar-footer'
import { useBranding } from '../../../utils/branding-provider'

import SidebarResourceSection from './sidebar-resource-section'
import allowOverride from '../../../hoc/allow-override'
import BrandingSelector from '../branding-selector'

type Props = {
  isVisible: boolean;
};

const StyledSidebar = styled(Box)`
  transition: left 0.3s;
  top: 0;
  bottom: 0;
  flex-shrink: 0;
  overflow-y: auto;
  border-color: ${themeGet('colors', 'border')};
  background: ${({ theme }): string => theme.colors.sidebar};

  &.hidden {
    left: -${themeGet('sizes', 'sidebarWidth')};
  }
  &.visible {
    left: 0;
  }
`

StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit'],
  width: 'sidebarWidth',
  borderRight: 'default',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 50,
  bg: 'white',
}

const SidebarOriginal: React.FC<Props> = (props) => {
  const { isVisible } = props
  const [resources, pages]: [
    ResourceJSON[],
    PageJSON[]
  ] = useSelector((state: ReduxState) => [
    state.resources,
    state.pages,
  ])

  const [branding] = useBranding()

  return (
    <StyledSidebar className={isVisible ? 'visible' : 'hidden'}>
      <SidebarBranding branding={branding} />
      <Box flexGrow={1} className={cssClass('Resources')}>
        <SidebarResourceSection resources={resources} />
      </Box>
      <SidebarPages pages={pages} />
      <BrandingSelector />
      {branding?.softwareBrothers && <SidebarFooter />}
    </StyledSidebar>
  )
}

const Sidebar = allowOverride(SidebarOriginal, 'Sidebar')

export { Sidebar }
export default Sidebar
