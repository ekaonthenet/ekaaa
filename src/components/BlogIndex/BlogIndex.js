import styled, { css } from 'styled-components'
import theme from '../../../data/theme'
import { mq } from '../../../data/mq'
import { OuterWrapper } from '../Wrapper'
import { fontSize, borders, space } from 'styled-system'


export const BlogIndexWrapper = styled(OuterWrapper)`

  ${mq.sm(
    css`
      display: grid;
      grid-template-columns: 
        [left-edge] 3fr 
        [left-gap] 1fr 
        [main] 8fr 
        [right-gap] 1fr 
        [right-edge] minmax(12rem, 3fr)
        [end];
    `
  )};
`

////

export const BlogTitleWrapper = styled.header`
  order: -1;
  grid-column: left-edge / end;
  margin-left: -0.25rem;
`

////

// to extend by Side + Main below
const PostContentBlock = styled.div`
  ${space}
  ${borders}

  border-top: solid ${theme.colors.fg};
`
PostContentBlock.defaultProps = {
  pt: [3,3,4],
  mb: [2,2,4],
  borderTop: 2,
}

////

export const BlogIndexSide = styled(PostContentBlock)`
  grid-column: right-edge;
`

////

export const BlogIndexMain = styled(PostContentBlock)`
  order: -1;
  grid-column: left-edge / right-gap;
`

////

export const PostGroup = styled.section`
  ${space}

  border-bottom: 1px solid ${theme.colors.fg};

  ${mq.xsOnly(
    css`
      border-bottom-width: ${theme.borders[0]};

      &:first-of-type {
        padding-top: 1rem; // add space above title, like sections after this
      }
    `
  )};

  ${mq.md(
    css`
      display: grid;
      grid-template-columns:
        [inner-left-edge] minmax(10em, 3fr)
        [inner-left-gap] 1fr 
        [inner-main] minmax(20rem, 8fr);
    `
  )};

  >*:not(.PostGroup__title) {
    grid-column: inner-main;
  }
`
PostGroup.defaultProps = {
  mb: 4,
}

////

export const PostGroupTitle = styled.h3.attrs({
  className: 'PostGroup__title',
})`
  ${space}
  ${fontSize}

  text-transform: lowercase;
  letter-spacing: -0.01em;
  color: ${theme.colors.fgMuted[0]};

  &:before {
    content: " ";
    display: inline-block;
    background: ${theme.colors.accentBg};
    width: .6em;
    height: .5em;
    margin-left: -1em;
    margin-right: .4em;
  }

  >*:first-child {
    display: inline;
  }

  ${mq.sm(
    css`
      color: ${theme.colors.fg};

      &:before {
        display: none;
      }

      >*:first-child {
        display: block;
        position: sticky;
        top: 2rem;
      }
    `
  )};
`
PostGroupTitle.defaultProps = {
  mb: [4,4,5],
  fontSize: [2,2,'3rem','calc(2rem + 1.5vw)','calc(2rem + 1.25vw)',7],
}

////