import { useEffect, useState, type ReactNode } from 'react'

type ContentOverrides = Record<string, string>

type DiscoveredField = {
  key: string
  label: string
  value: string
}

type DiscoveredLink = {
  label: string
  href: string
}

type DiscoveredSection = {
  id: string
  title: string
  fields: DiscoveredField[]
  links: DiscoveredLink[]
}

const CONTENT_PAGES = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'events', title: 'Events', path: '/events' },
  { id: 'vignite', title: 'VIgnite', path: '/vignite' },
] as const

const originalText = new WeakMap<Text, string>()

function textNodes(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent || parent.closest('svg, script, style, textarea, input, select, option')) return NodeFilter.FILTER_REJECT
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })
  const nodes: Text[] = []
  let node = walker.nextNode()
  while (node) {
    nodes.push(node as Text)
    node = walker.nextNode()
  }
  return nodes
}

function replaceText(node: Text, value: string) {
  const source = originalText.get(node) ?? node.textContent ?? ''
  const leading = source.match(/^\s*/)?.[0] ?? ''
  const trailing = source.match(/\s*$/)?.[0] ?? ''
  const next = `${leading}${value}${trailing}`
  if (node.textContent !== next) node.textContent = next
}

function discoverAndApply(pageId: string, overrides: ContentOverrides): DiscoveredSection[] {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-admin-section]'))
  return sections.map((section, sectionIndex) => {
    const id = section.dataset.adminSection || `section-${sectionIndex + 1}`
    const title = section.dataset.adminTitle || id
    let rootFieldIndex = 0
    const itemFieldIndexes = new Map<string, number>()
    const fields = textNodes(section).map(node => {
      if (!originalText.has(node)) originalText.set(node, node.textContent ?? '')
      const initial = (originalText.get(node) ?? '').trim()
      const item = node.parentElement?.closest<HTMLElement>('[data-admin-item]')
      const itemId = item && section.contains(item) ? item.dataset.adminItem : undefined
      const fieldIndex = itemId ? (itemFieldIndexes.get(itemId) ?? 0) : rootFieldIndex
      if (itemId) itemFieldIndexes.set(itemId, fieldIndex + 1)
      else rootFieldIndex += 1
      const key = `${pageId}.${id}.${itemId || 'root'}.${fieldIndex}`
      const value = overrides[key] ?? initial
      replaceText(node, value)
      return { key, label: initial.slice(0, 80), value }
    })
    const links = Array.from(section.querySelectorAll<HTMLAnchorElement>('a[href]')).map(link => ({
      label: link.textContent?.trim() || '(unlabelled link)',
      href: link.getAttribute('href') || '',
    }))
    return { id, title, fields, links }
  })
}

export function EditablePage({ pageId, children }: { pageId: string; children: ReactNode }) {
  useEffect(() => {
    let overrides: ContentOverrides = {}
    let stopped = false
    let timer = 0

    const update = () => {
      if (stopped) return
      const sections = discoverAndApply(pageId, overrides)
      if (new URLSearchParams(window.location.search).has('admin-preview')) {
        window.parent.postMessage({ type: 'qisb-content-discovery', pageId, sections }, window.location.origin)
      }
    }

    const scheduleUpdate = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(update, 0)
    }

    fetch('/api/content')
      .then(response => response.ok ? response.json() : {})
      .then(data => { overrides = data; update() })
      .catch(update)

    const observer = new MutationObserver(scheduleUpdate)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    scheduleUpdate()
    return () => {
      stopped = true
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [pageId])

  return children
}

function FieldEditor({ field, onChange }: { field: DiscoveredField; onChange: (value: string) => void }) {
  return <label className="admin-field">
    <span>{field.label || 'Text'}</span>
    <textarea value={field.value} onChange={event => onChange(event.target.value)} rows={field.value.length > 120 ? 4 : 2}/>
  </label>
}

export function AdminPage() {
  const [selectedPage, setSelectedPage] = useState<string>(CONTENT_PAGES[0].id)
  const [discoveries, setDiscoveries] = useState<Record<string, DiscoveredSection[]>>({})
  const [draft, setDraft] = useState<ContentOverrides>({})
  const [status, setStatus] = useState('Loading page content…')
  const page = CONTENT_PAGES.find(item => item.id === selectedPage) ?? CONTENT_PAGES[0]
  const sections = discoveries[selectedPage] ?? []

  useEffect(() => {
    fetch('/api/content').then(response => response.json()).then(setDraft).catch(() => setStatus('Could not load saved content.'))
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'qisb-content-discovery') return
      const incoming = event.data.sections as DiscoveredSection[]
      setDiscoveries(current => ({ ...current, [event.data.pageId]: incoming }))
      setDraft(current => {
        const next = { ...current }
        incoming.forEach(section => section.fields.forEach(field => {
          if (!(field.key in next)) next[field.key] = field.value
        }))
        return next
      })
      setStatus('All text fields loaded.')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const setField = (key: string, value: string) => {
    setDraft(current => ({ ...current, [key]: value }))
    setDiscoveries(current => ({
      ...current,
      [selectedPage]: (current[selectedPage] ?? []).map(section => ({
        ...section,
        fields: section.fields.map(field => field.key === key ? { ...field, value } : field),
      })),
    }))
    setStatus('Unsaved changes')
  }

  const save = async () => {
    setStatus('Saving…')
    const response = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
    if (!response.ok) {
      setStatus('Save failed. Please try again.')
      return
    }
    setStatus('Saved. The live pages now use this text.')
  }

  return <div className="admin-page">
    <header className="admin-header"><div><p>QISB CONTENT</p><h1>Page text editor</h1><span>Edit text only. Images and link destinations remain unchanged.</span></div><a href={page.path} target="_blank" rel="noreferrer">Open live page ↗</a></header>
    <div className="admin-layout">
      <aside className="admin-pages"><h2>Pages</h2>{CONTENT_PAGES.map(item => <button type="button" className={selectedPage === item.id ? 'active' : ''} onClick={() => setSelectedPage(item.id)} disabled={item.id === 'events'} title={item.id === 'events' ? 'Events editing is disabled' : undefined} key={item.id}><strong>{item.title}</strong><span>{item.path}</span></button>)}</aside>
      <main className="admin-editor">
        <div className="admin-toolbar"><div><p>Editing page</p><h2>{page.title}</h2><span>{sections.length ? `${sections.length} sections` : status}</span></div><button type="button" onClick={save} disabled={!sections.length}>Save page</button></div>
        {sections.map(section => <section className="admin-section" data-testid={`admin-section-${selectedPage}-${section.id}`} key={section.id}>
          <div className="admin-section-heading"><h3>{section.title}</h3><span>{section.fields.length} text fields</span></div>
          <div className="admin-fields">{section.fields.map(field => <FieldEditor field={{ ...field, value: draft[field.key] ?? field.value }} onChange={value => setField(field.key, value)} key={field.key}/>)}</div>
          {section.links.length > 0 && <details className="admin-links"><summary>Hard-coded links ({section.links.length})</summary>{section.links.map((link, index) => <div key={`${link.href}-${index}`}><span>{link.label}</span><code>{link.href}</code></div>)}</details>}
        </section>)}
        <p className="admin-status" role="status">{status}</p>
      </main>
    </div>
    {CONTENT_PAGES.map(item => <iframe className="admin-discovery-frame" title={`Content discovery for ${item.title}`} src={`${item.path}?admin-preview=1`} key={item.id}/>)}
  </div>
}
