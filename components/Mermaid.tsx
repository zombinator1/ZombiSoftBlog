'use client'
import { useEffect, useRef } from 'react'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    import('mermaid').then((mod) => {
      const mermaid = mod.default
      mermaid.initialize({ startOnLoad: false })
      const id = 'mermaid-' + Math.random().toString(36).slice(2, 9)
      mermaid.render(id, chart.trim()).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      })
    })
  }, [chart])

  return <div ref={ref} className="my-4 flex justify-center" />
}
