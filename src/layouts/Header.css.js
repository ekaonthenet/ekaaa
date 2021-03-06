import styled, { css } from 'styled-components'
import { OuterWrapper } from '../components/Wrapper'
import { lineHeight, fontSize, space } from 'styled-system'
import theme from '../../data/theme'
import { mq } from '../../data/mq'
import { Link } from 'gatsby'
import { unbutton, roundedFocus } from '../mixins'
import { darken } from 'polished'


export const HeaderWrapper = styled(OuterWrapper)`
  ${space}

  display: flex;
  justify-content: space-between;

  ${mq.xsOnly(
    css`
      flex-direction: column;
      background-color: ${darken(0.05, theme.colors.bg)};
      z-index: 3; // above totoplink
    `
  )};
`
HeaderWrapper.defaultProps = {
  py: [1,2],
  px: [2,'auto'], // sm-up is `auto` (invalid) so it uses default OuterWrapper padding
}

export const PrimaryNav = styled.nav.attrs({
  role: 'navigation',
})``

export const SecondaryNav = styled.div``

export const HeaderLink = styled(Link)`
  ${fontSize}
  ${space}

  text-decoration: none;
  text-transform: lowercase;
  display: inline-block;
  letter-spacing: -0.01em;

  &.is-active {
    text-decoration: underline;
    text-decoration-color: ${theme.colors.accentMain};
  }

  &:focus,
  &:hover {
    color: ${theme.colors.accentMain};
    text-decoration: underline;
  }
`
HeaderLink.defaultProps = {
  fontSize: [2,2,3],
  px: [2,1],
  py: ['.75rem','.75rem',2],
  mr: [1,3],
  mt: -1,
}

export const HomeLink = styled(HeaderLink)`
  color: ${theme.colors.accentMain};
  margin-top: 0;

  > * {
    font-size: 1.125em;
  }
`

////

const xsHomeLinkStyle = css`
  width: 100%;

  +li>a {
    padding-left: 0;
  }
`
export const HeaderListItem = styled.li`
  display: inline-block;

  &.primary-nav__home-link {
    >a {
      padding-left: 0;
    }

    ${'' /* ${mq.xsOnly(xsHomeLinkStyle)}; */}
  }
`

////

export const SettingsIconLink = styled.button`
  ${unbutton};
  ${roundedFocus};

  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: absolute;
  right: .5rem;
  z-index: 1;

  ${mq.md(css`
    right: 1rem;
  `)};

  svg {
    width: 100%;
    height: 100%;
    padding: .125em;
  }

  &:focus,
  &:hover {
    background-color: ${theme.colors.fgMuted[3]};
    color: ${theme.colors.accentFg};
  }

  &:hover {
    cursor: pointer;
  }
`
