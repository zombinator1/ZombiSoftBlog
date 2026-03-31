import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import React from 'react'
import dynamic from 'next/dynamic'

const Mermaid = dynamic(() => import('./Mermaid'), { ssr: true })

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (React.isValidElement(node))
    return getTextContent((node.props as { children?: React.ReactNode }).children)
  return ''
}

function CustomPre(props: React.ComponentProps<'pre'>) {
  const mermaidChild = React.Children.toArray(props.children).find(
    (c): c is React.ReactElement =>
      React.isValidElement(c) &&
      String((c.props as { className?: string }).className ?? '').includes('language-mermaid')
  )
  if (mermaidChild) {
    return (
      <Mermaid
        chart={getTextContent((mermaidChild.props as { children?: React.ReactNode }).children)}
      />
    )
  }
  return <Pre>{props.children}</Pre>
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CustomPre,
  table: TableWrapper,
  BlogNewsletterForm,
}
