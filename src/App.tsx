import { useEffect, useState, type ReactNode } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Calendar } from './components/ui/calendar'
import { AdminPage, EditablePage } from './content-admin'
import './App.css'
import './theme.css'

const QISB_ASSETS = '/assets/qisb'

function ArrowRight({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function SearchIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
}

const programmes = [
  {
    title: 'Undergraduate',
    links: [
      { label: 'QISB', href: 'https://www.villacollege.edu.mv/programmes?institution=4&programme=4&faculty=8' },
      { label: 'UWE', href: 'https://www.villacollege.edu.mv/programmes?programme=4&institution=1&faculty=8' },
    ],
  },
  {
    title: 'Post Graduate',
    links: [
      { label: 'QISB', href: 'https://www.villacollege.edu.mv/programmes?programme=1&institution=1&faculty=8' },
      { label: 'UWE', href: 'https://www.villacollege.edu.mv/programmes?programme=1&institution=4&faculty=8' },
    ],
  },
]

const professionalProgrammes = [
  { label: 'CIMA Certificate Level', href: 'https://www.villacollege.edu.mv/programmes/chartered-institute-of-management-accountants-cima-certificate-level/125?contentType=local' },
  { label: 'CIMA Operational Level', href: 'https://www.villacollege.edu.mv/programmes/chartered-institute-of-management-accountants-cima-operational-level/126?contentType=local' },
  { label: 'CIMA Management Level', href: 'https://www.villacollege.edu.mv/programmes/chartered-institute-of-management-accountants-cima-the-management-level/127?contentType=local' },
  { label: 'CIMA Strategic Level', href: 'https://www.villacollege.edu.mv/programmes/chartered-institute-of-management-accountants-cima-the-strategic-level/128?contentType=local' },
  { label: 'ACCA Strategic Professional Level', href: 'https://www.villacollege.edu.mv/programmes/association-of-chartered-certified-accountants-acca-strategic-professional-level/136?contentType=local' },
  { label: 'ACCA Applied Skills Level', href: 'https://www.villacollege.edu.mv/programmes/association-of-chartered-certified-accountants-acca-applied-skills-level/135?contentType=local' },
  { label: 'ACCA Applied Knowledge Level', href: 'https://www.villacollege.edu.mv/programmes/association-of-chartered-certified-accountants-acca-applied-knowledge-level/137?contentType=local' },
]

const features = [
  { title: 'World Class Education', description: 'International partnerships and recognised programmes give students a genuinely global perspective.' },
  { title: 'A Hub for Innovation', description: 'VIgnite mentorship, workshops and industry connections help promising business ideas come to life.' },
  { title: 'Accredited Excellence', description: 'SAQS accreditation and ACCA Gold approval reflect an enduring commitment to quality.' },
]

const testimonials = [
  { name: 'Aishath Shifana', programme: 'Bachelor of Business and Hospitality Management', quote: 'The focus on relevant case studies gave me more than theory. I graduated with practical skills, professional confidence and a clear sense of how to solve real business problems.' },
  { name: 'Mariyam Anoosha', programme: 'Master of Business Administration (MBA)', quote: 'The lecturers brought deep industry experience and treated us as future colleagues. Their mentorship and the supportive class community encouraged me to challenge myself and grow.' },
  { name: 'Mohamed Adam', programme: 'Bachelor of Science in Marketing', quote: 'Guest lectures, networking events and internship opportunities connected my studies to the Maldivian business landscape and helped me build a professional network before graduating.' },
]

const communities = [
  {
    title: 'VSBS',
    subtitle: 'Student community',
    description: 'VSBS brings business students together beyond the classroom through events, skills-building activities and opportunities to connect with peers and industry. It is a place to share ideas, build confidence and take an active role in student life.',
    href: 'https://villacollege.edu.mv/communities/villa-college-business-society-vcbs/1',
  },
  {
    title: 'Alumni',
    subtitle: 'Graduate community',
    description: 'Our alumni community keeps QISB graduates connected to one another and to the school. Through networking, mentoring and knowledge-sharing, alumni can continue to grow professionally while helping inspire the next generation of business leaders.',
    href: 'https://villacollege.edu.mv/communities/villa-college-alumni-association-vcaa/4',
  },
]

const facultyMembers = [
  { name: 'Dr. Byju Koreth Puthanveettil Madhavan', role: 'Assistant Professor', focus: 'Strategic management, business simulation and people management' },
  { name: 'Dr. Shahnawaz Ali', role: 'Assistant Professor', focus: 'Finance and business management' },
  { name: 'Dr. Mir Hasan Naqvi', role: 'Assistant Professor', focus: 'Economics, international trade and Islamic finance' },
  { name: 'Dr. Syed Muhammad Noaman Ahmed Shah', role: 'Assistant Professor', focus: 'Accounting, finance, economics and applied econometrics' },
  { name: 'Aishath Thashkeel', role: 'Senior Lecturer', focus: 'Human resource management and knowledge management' },
  { name: 'Mr. Shajeer Sainudeen Shahida', role: 'Senior Lecturer', focus: 'Marketing, international business and entrepreneurship' },
  { name: 'Nuzha Nizam', role: 'Senior Lecturer', focus: 'Business and management' },
  { name: 'Muhammed Shahzeb Khan', role: 'Senior Lecturer', focus: 'Operations, supply chain and project quality management' },
  { name: 'Nikhil Vimala Muraleedharan', role: 'Head of Cluster — Business Management', focus: 'Business management and academic leadership' },
  { name: 'Rincy Sebastian', role: 'Lecturer', focus: 'Commerce and business studies' },
  { name: 'Nishan Mohamed', role: 'Lecturer', focus: 'Taxation, financial accounting and management accounting' },
  { name: 'Rushani Dilsha Kumari Lewpe Bandarage', role: 'Lecturer & Programme Manager — ACCA', focus: 'Professional accounting education and programme management' },
  { name: 'Aminath Farha Shareef', role: 'Contract Lecturer', focus: 'Business administration and management' },
]

function Initials({ name }: { name: string }) {
  const initials = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/,'').split(' ').slice(0,2).map(part=>part[0]).join('')
  return <span className="person-initials" aria-hidden="true">{initials}</span>
}

const news = [
  {
    title: 'Global Entrepreneurship Week Maldives 2025 commences at Villa College',
    date: '19th Nov 2025',
    image: 'https://vc-website-s3.s3.ap-southeast-1.amazonaws.com/226/01KADR84MAD9D5HN71W9S3YVAZ.png',
    href: 'https://www.villacollege.edu.mv/global-entrepreneurship-week-maldives-2025-commences-at-villa-college/877',
  },
  {
    title: 'Villa College hosts MOEDT Policy Forum during Global Entrepreneurship Week 2025',
    date: '23rd Nov 2025',
    image: 'https://vc-website-s3.s3.ap-southeast-1.amazonaws.com/232/01KAQK5N8948V3HQNKQFTDJTS0.jpg',
    href: 'https://www.villacollege.edu.mv/villa-college-hosts-moedt-policy-forum-during-global-entrepreneurship-week-2025/880',
  },
  {
    title: 'Villa College makes history: first Maldivian institution in global QS online MBA rankings',
    date: '15th Dec 2025',
    image: 'https://vc-website-s3.s3.ap-southeast-1.amazonaws.com/257/01KCN8Z0K5VYTJR152614TN6VP.png',
    href: 'https://www.villacollege.edu.mv/villa-college-makes-history-first-maldivian-institution-in-global-qs-online-mba-rankings/887',
  },
  {
    title: "Villa College's BAHSM students begin international internship at Dr. D.Y. Patil Medical College, Pune",
    date: '6th Jul 2026',
    image: 'https://vc-website-s3.s3.ap-southeast-1.amazonaws.com/381/01KWTX8SSEB33PM15HVZJMKGRM.png',
    href: 'https://www.villacollege.edu.mv/villa-colleges-bahsm-students-begin-international-internship-at-dr-dy-patil-medical-college-pune/946',
  },
]

const newsAndEvents = [
  { title: 'Guest Speaker Series', number: '01' },
  { title: 'Business Festival', number: '02' },
  { title: 'Business Beyond Walls', number: '03' },
]

const eventEntries = [
  { day: 3, month: 'September', monthNumber: 9, year: 2026, weekday: 'Thu', category: 'Guest Speaker Series', title: 'Guest Speaker Session: Event Title to Be Announced', time: '10:00 am – 11:30 am', location: 'QISB Auditorium, Villa College QI Campus', speaker: 'Guest speaker details will be announced soon' },
  { day: 8, month: 'September', monthNumber: 9, year: 2026, weekday: 'Tue', category: 'Business Beyond Walls', title: 'Business Beyond Walls: Industry Visit', time: '9:00 am – 1:00 pm', location: 'Location to be announced', speaker: 'Hosted by the QISB academic team' },
  { day: 15, month: 'September', monthNumber: 9, year: 2026, weekday: 'Tue', category: 'Guest Speaker Series', title: 'Guest Speaker Session: Contemporary Business Topics', time: '1:30 pm – 3:00 pm', location: 'QISB Seminar Room, Villa College QI Campus', speaker: 'Guest speaker details will be announced soon' },
  { day: 21, month: 'October', monthNumber: 10, year: 2026, weekday: 'Wed', category: 'Business Festival', title: 'QISB Business Festival: Ideas, Enterprise and Impact', time: '9:00 am – 5:00 pm', location: 'Villa College QI Campus, Rah Dhebai Hingun', speaker: 'Open to students, alumni and invited industry partners' },
  { day: 5, month: 'November', monthNumber: 11, year: 2026, weekday: 'Thu', category: 'Business Beyond Walls', title: 'Business Beyond Walls: Learning in Practice', time: '4:00 pm – 5:30 pm', location: 'Location to be announced', speaker: 'Programme details will be announced soon' },
  { day: 17, month: 'November', monthNumber: 11, year: 2026, weekday: 'Tue', category: 'Guest Speaker Series', title: 'Guest Speaker Session: Future-Focused Leadership', time: '11:00 am – 12:30 pm', location: 'QISB Seminar Room, Villa College QI Campus', speaker: 'Guest speaker details will be announced soon' },
]

function MetaIcon({ type }: { type: 'calendar' | 'clock' | 'location' | 'person' }) {
  const paths = {
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
  }
  return <svg className="event-meta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function Header({ dark, onToggleTheme }: { dark: boolean; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const onHomePage = window.location.pathname === '/'
  const homeLink = (hash = '') => onHomePage ? (hash || '#') : `/${hash}`
  const nav = [
    { label: 'Home', href: homeLink() },
    { label: 'About QISB', href: homeLink('#about') },
    { label: 'Our Team', href: homeLink('#leadership') },
    { label: 'Programs', href: homeLink('#programmes') },
    { label: 'Research', href: homeLink('#research') },
    { label: 'Community', href: homeLink('#community') },
    { label: 'Events', href: onHomePage ? '#news-and-events' : '/events' },
    { label: 'Career', href: homeLink('#career') },
    { label: 'Contact', href: homeLink('#contact') },
  ]
  return <header className="site-header" data-admin-section="header" data-admin-title="Header and navigation">
    <div className="header-top shell"><div className="brand-lockup"><span className="villa-mark"><img src={`${QISB_ASSETS}/villa-college-white.svg`} alt="Villa College"/></span><span className="brand-rule"/><strong>Qasim Ibrahim<br/>School of Business</strong></div><div className="quick-links">{['Students','Staff','Alumni','MyVC Portal','Apply Now','Contact us'].map(x=><a href="#footer" key={x}>{x}</a>)}</div><div className="header-controls"><Button className="theme-toggle" variant="default" onClick={onToggleTheme} aria-label={`Switch to ${dark?'light':'dark'} theme`} title={`Switch to ${dark?'light':'dark'} theme`}>{dark?'☀':'◐'}</Button><button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?'×':'☰'}</button></div></div>
    <nav className={`main-nav ${open?'open':''}`} aria-label="Main navigation"><div className="shell nav-inner">{nav.map((item,index)=><a className={index===0?'active':''} href={item.href} onClick={()=>setOpen(false)} key={item.label}>{item.label}</a>)}<button aria-label="Search"><SearchIcon/></button></div></nav>
  </header>
}

function LinkButton({ children, href }: { children: ReactNode; href: string }) { return <a href={href} target="_blank" rel="noreferrer" className="arrow-link">{children}<ArrowRight/></a> }

function ProgrammeCard({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  return <Card className="programme-card academic-programme-card">
    <img className="programme-photo" src={`${QISB_ASSETS}/hero.webp`} alt="" style={{objectPosition:`${index*30}% center`}}/>
    <div className="programme-overlay"/>
    <CardContent><span className="programme-label">ACADEMIC PROGRAMMES</span><h3>{title}</h3>{children}</CardContent>
  </Card>
}

function ProfessionalProgrammesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return <div className="programme-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="programme-modal" role="dialog" aria-modal="true" aria-labelledby="professional-programmes-title">
      <button className="programme-modal-close" type="button" onClick={onClose} aria-label="Close professional programmes">×</button>
      <p className="eyebrow orange">PROFESSIONAL PROGRAMMES</p>
      <h2 id="professional-programmes-title">Select your programme</h2>
      <p className="programme-modal-intro">Choose a CIMA or ACCA pathway to view the full programme details.</p>
      <div className="professional-programme-list">
        {professionalProgrammes.map(programme => <a href={programme.href} target="_blank" rel="noreferrer" key={programme.label}><span>{programme.label}</span><ArrowRight size={22}/></a>)}
      </div>
    </section>
  </div>
}

function EventsPage() {
  const [dark, setDark] = useState(false)
  const [year, setYear] = useState('upcoming')
  const [month, setMonth] = useState('all')
  const [category, setCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 7, 30))
  const [calendarViewMonth, setCalendarViewMonth] = useState(new Date(2026, 7, 1))
  const filteredEvents = eventEntries.filter(event =>
    (year === 'upcoming' || event.year === Number(year)) &&
    (month === 'all' || event.monthNumber === Number(month)) &&
    (category === 'all' || event.category === category)
  )

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Events — Qasim Ibrahim School of Business'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  return <div className={`page events-page ${dark?'dark':''}`}><Header dark={dark} onToggleTheme={()=>setDark(value=>!value)}/><main>
    <div className="events-breadcrumb" data-admin-section="breadcrumb" data-admin-title="Breadcrumb"><div className="shell"><span aria-hidden="true">●</span><a href="/">Home</a><i>/</i><strong>Events</strong></div></div>
    <section className="events-page-intro" data-admin-section="introduction" data-admin-title="Page introduction"><div className="shell"><p className="eyebrow light">WHAT&apos;S HAPPENING AT QISB</p><h1>Events</h1><p>Explore upcoming talks, festivals and learning experiences from the Qasim Ibrahim School of Business.</p></div></section>
    <section className="events-directory shell" data-admin-section="event-directory" data-admin-title="Event directory and filters">
      <aside className="events-sidebar" aria-label="Filter events">
        <p className="events-sidebar-title">SELECT DATE</p>
        <Calendar mode="single" selected={selectedDate} onSelect={date=>{ setSelectedDate(date); if(date){ setMonth(String(date.getMonth()+1)); setCalendarViewMonth(date) } }} month={calendarViewMonth} onMonthChange={setCalendarViewMonth} className="events-shadcn-calendar"/>
        <div className="event-filter"><label htmlFor="event-year">YEAR</label><select id="event-year" value={year} onChange={event=>setYear(event.target.value)}><option value="upcoming">Upcoming Events</option><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option></select></div>
        <div className="event-filter"><label htmlFor="event-month">MONTH</label><select id="event-month" value={month} onChange={event=>setMonth(event.target.value)}><option value="all">All Months</option>{['January','February','March','April','May','June','July','August','September','October','November','December'].map((name,index)=><option value={index+1} key={name}>{name}</option>)}</select></div>
        <div className="event-filter"><label htmlFor="event-category">EVENT TYPE</label><select id="event-category" value={category} onChange={event=>setCategory(event.target.value)}><option value="all">All Event Types</option>{newsAndEvents.map(item=><option value={item.title} key={item.title}>{item.title}</option>)}</select></div>
        <button className="search-events-button" type="button">Apply Filters</button>
      </aside>
      <div className="events-results">
        {filteredEvents.length ? <div className="event-list-grid">{filteredEvents.map(event=><article className="event-list-card" data-admin-item={`event-${event.year}-${event.monthNumber}-${event.day}`} key={`${event.title}-${event.day}`}>
          <span className="event-category">{event.category}</span>
          <div className="event-date"><strong>{event.day}</strong><span>{event.month} {event.year}</span></div>
          <h2>{event.title}</h2>
          <div className="event-metadata"><p><MetaIcon type="calendar"/><span>{event.day} {event.month} {event.year} ({event.weekday})</span></p><p><MetaIcon type="clock"/><span>{event.time}</span></p><p><MetaIcon type="location"/><span>{event.location}</span></p><p className="event-speaker"><MetaIcon type="person"/><span>{event.speaker}</span></p></div>
          <a className="event-detail-button" href="#" onClick={event=>event.preventDefault()}>View Details</a>
        </article>)}</div> : <div className="no-events"><h2>No events found</h2><p>Try selecting a different month or department.</p></div>}
        <nav className="events-pagination" aria-label="Events pagination"><button type="button">First</button><button type="button">Prev</button><button className="current" type="button">1</button><button type="button">Next</button><button type="button">Last</button></nav>
      </div>
    </section>
  </main><Footer/></div>
}

function VignitePage() {
  const [dark, setDark] = useState(false)
  const benefits = [
    ['Practical workshops', 'focused sessions that help you strengthen your business model, market strategy and founder skills'],
    ['Professional advice', 'one-to-one support across sales, intellectual property, legal planning, finance and marketing'],
    ['Dedicated mentorship', 'regular feedback and accountability as your startup moves from idea to action'],
    ['Funding and investment readiness', 'guidance on pitching, financial planning and introductions to potential funders'],
    ['Founder network', 'connections with students, alumni, entrepreneurs and industry partners'],
    ['Workspace and facilities', 'access to a collaborative university environment, meeting rooms and spaces for developing your venture'],
    ['Student talent', 'opportunities to connect with interns and student collaborators who can support defined startup projects'],
  ]
  const alumni = ['Atoll Analytics', 'Coral Commerce', 'Dhivehi Digital', 'Island Harvest', 'Lagoon Labs', 'Malé Mobility', 'Reef Renewables', 'Savaa Studio', 'Thakuru Tech']

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'VIgnite Incubator Programme — QISB'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  return <div className={`page vignite-page ${dark?'dark':''}`}><Header dark={dark} onToggleTheme={()=>setDark(value=>!value)}/><main id="main-content">
    <nav className="vignite-faculty-nav" data-admin-section="section-navigation" data-admin-title="Section navigation" aria-label="QISB section navigation"><div className="shell"><strong>Entrepreneurship</strong><div><a href="/#programmes">Programmes</a><a className="current" href="/vignite">VIgnite</a><a href="/#community">Community</a><a href="/#news-and-events">Events</a></div></div></nav>
    <div className="vignite-page-layout shell">
      <aside className="vignite-side-nav" data-admin-section="page-navigation" data-admin-title="Page navigation" aria-label="VIgnite page navigation"><strong>VIgnite incubator</strong><a href="#about-vignite">About the programme</a><a href="#vignite-benefits">Programme benefits</a><a href="#vignite-dates">Key dates</a><a href="#vignite-eligibility">Eligibility</a><a href="#vignite-apply">How to apply</a><a href="#vignite-alumni">Startup community</a></aside>
      <article className="vignite-article">
        <nav className="vignite-breadcrumb" data-admin-section="breadcrumb" data-admin-title="Breadcrumb" aria-label="Breadcrumb"><a href="/">QISB</a><span>›</span><a href="/#community">Entrepreneurship</a><span>›</span><span>VIgnite incubator programme</span></nav>
        <header className="vignite-intro" data-admin-section="introduction" data-admin-title="Page introduction"><h1>Grow your startup with the VIgnite incubator programme</h1><p>VIgnite is QISB&apos;s university incubator, providing guidance, resources and a supportive community to help promising startups move forward.</p></header>
        <section id="about-vignite" data-admin-section="about" data-admin-title="About the programme"><h2>About the VIgnite programme</h2><p>VIgnite is a two-year, equity-free incubator for Villa College students and recent graduates who are ready to develop an innovative idea into a viable venture.</p><p>New founder cohorts are expected to join twice a year. Membership begins with an eight-week induction, followed by tailored support, mentoring and access to the wider QISB entrepreneurship community.</p><p>If you have a solution that you want to move towards commercial reality, VIgnite provides the environment, connections and momentum to take the next step.</p></section>
        <section data-admin-section="induction" data-admin-title="Induction programme"><h2>Induction programme</h2><p>During the first eight weeks, founders take part in workshops and induction sessions covering customer discovery, business models, market validation, finance, pitching and responsible growth.</p><p>The proposed schedule includes two in-person sessions each week alongside selected online clinics. These sessions help founders build essential entrepreneurial skills while connecting with their cohort, mentors and other startup teams.</p><p>At least one member of each startup team must attend all compulsory induction sessions.</p></section>
        <section id="vignite-benefits" data-admin-section="benefits" data-admin-title="VIgnite benefits"><h2>VIgnite benefits</h2><p>Throughout the programme, support is shaped around the needs of your startup, including:</p><ul className="vignite-benefits">{benefits.map(([title,description])=><li key={title}><strong>{title}:</strong> {description}</li>)}</ul></section>
        <blockquote className="vignite-quote" data-admin-section="founder-quote" data-admin-title="Founder experience quote"><span aria-hidden="true">“</span><p>Build alongside an ambitious community of founders, learn from experienced mentors and turn your ideas into action.</p><cite>The VIgnite founder experience</cite></blockquote>
        <section id="vignite-dates" data-admin-section="dates" data-admin-title="Key dates"><h2>Key dates</h2><p className="vignite-indicative-note">Indicative dates for the next intake — final dates will be confirmed by QISB.</p><dl className="vignite-dates"><div><dt>Applications close</dt><dd>Wednesday, 30 September 2026</dd></div><div><dt>Founder interviews</dt><dd>Wednesday–Thursday, 7–8 October 2026</dd></div><div><dt>Programme launch day</dt><dd>Sunday, 18 October 2026</dd></div><div><dt>Induction final day</dt><dd>Sunday, 6 December 2026</dd></div></dl></section>
        <section id="vignite-eligibility" data-admin-section="eligibility" data-admin-title="Eligibility"><h2>Eligibility</h2><p>You can apply if you are a current Villa College student or graduated from Villa College within the past two years.</p><p>Your startup should have a clearly defined problem and proposed solution. Teams selected for full incubation will be expected to register an appropriate legal entity before accessing funding or formal commercial support.</p><p>At least one team member must commit to all induction sessions and participate actively in mentoring, progress reviews and founder-community activities.</p></section>
        <section id="vignite-apply" data-admin-section="application" data-admin-title="How to apply"><h2>How to apply</h2><p>There are three steps to the application process:</p><h3>Step 1: Attend an information session</h3><p>Join an online group session to learn how VIgnite works, meet the programme team and decide whether your startup is at the right stage to benefit.</p><p><a className="vignite-text-link" href="mailto:qisb@villacollege.edu.mv?subject=VIgnite%20information%20session">Request the next information-session date</a>.</p><h3>Step 2: Complete the application</h3><p>Submit a short application describing your startup&apos;s problem, solution, target customer, founding team, evidence of demand and goals for the programme.</p><p>Applicants should also include a simple pitch deck or one-page venture summary. A downloadable question guide will be published when applications open.</p><h3>Step 3: Attend an interview</h3><p>Shortlisted teams will be invited to a 30-minute, in-person interview with the VIgnite selection panel.</p><p>You&apos;ll deliver a five-minute presentation covering:</p><ol className="vignite-pitch-list"><li><strong>Problem</strong> — What meaningful problem are you solving?</li><li><strong>Solution</strong> — How does your product or service address it?</li><li><strong>Team</strong> — Why is your team well placed to build this venture?</li><li><strong>Motivation</strong> — Why do you want to join VIgnite, and what support would make the greatest difference?</li></ol><a className="vignite-apply-button" href="mailto:qisb@villacollege.edu.mv?subject=VIgnite%20incubator%20application">Register your interest <ArrowRight size={21}/></a></section>
        <blockquote className="vignite-quote" data-admin-section="community-quote" data-admin-title="Programme principle quote"><span aria-hidden="true">“</span><p>A strong founder community gives you people to challenge your assumptions, share useful connections and keep you moving when building gets difficult.</p><cite>VIgnite programme principle</cite></blockquote>
        <section id="vignite-alumni" data-admin-section="startup-community" data-admin-title="Startup community"><h2>Startup community</h2><p>The names below are illustrative placeholders showing how future VIgnite ventures and alumni can be presented. They should be replaced with verified participating startups as the programme grows.</p><div className="vignite-alumni-grid">{alumni.map(name=><span key={name}><i aria-hidden="true">→</i>{name}</span>)}</div></section>
      </article>
    </div>
    <section className="vignite-highlights" data-admin-section="highlights" data-admin-title="Explore QISB"><div className="shell"><h2>Explore QISB</h2><div>{[
      ['FIND YOUR PATH','Academic programmes','Explore undergraduate, postgraduate and professional study options.','/#programmes'],
      ['JOIN THE COMMUNITY','Student and alumni networks','Connect with peers, graduates and the wider QISB community.','/#community'],
      ['START A CONVERSATION','Contact QISB','Speak with our team about VIgnite, programmes or partnerships.','/#contact'],
    ].map(([label,title,copy,href])=><a href={href} key={title}><small>{label}</small><h3>{title}</h3><p>{copy}</p><span>Explore <ArrowRight size={19}/></span></a>)}</div></div></section>
  </main><Footer/></div>
}

function HomePage() {
  const [dark, setDark] = useState(false)
  const [professionalModalOpen, setProfessionalModalOpen] = useState(false)
  return <div className={`page ${dark?'dark':''}`}><Header dark={dark} onToggleTheme={()=>setDark(value=>!value)}/><main>
    <section className="hero-section qisb-hero" data-admin-section="hero" data-admin-title="Hero"><div className="hero-shade"/><div className="hero-copy shell"><p>A premier business school developing ethical leaders and innovative entrepreneurs.</p></div><div className="scroll-cue"><span>SCROLL</span><i/></div></section>
    <section id="about" className="intro shell section-pad" data-admin-section="about" data-admin-title="About QISB"><p className="eyebrow">QASIM IBRAHIM SCHOOL OF BUSINESS</p><h1>Leading business education in the Maldives</h1><p className="lede">The Qasim Ibrahim School of Business, formerly the Faculty of Business Management, is a leading institution for business and management education in the Maldives.</p></section>
    <section className="purpose-section section-pad" data-admin-section="purpose" data-admin-title="Vision, mission and values"><div className="shell"><div className="purpose-heading"><p className="eyebrow orange">VISION, MISSION &amp; VALUES</p><h2>This is what guides us.</h2><p>Our purpose shapes the education we provide, the leaders we develop and the contribution we make to the Maldives and beyond.</p></div><div className="purpose-layout"><div className="purpose-list">
      <article><span>1.</span><div><h3>Vision</h3><p>To be the leading business school in the Maldives, recognized for excellence in business education and innovation.</p></div></article>
      <article><span>2.</span><div><h3>Mission</h3><p>To provide world-class business education that develops ethical leaders and entrepreneurs who contribute to sustainable economic growth.</p></div></article>
      <article><span>3.</span><div><h3>Values</h3><p>Excellence, Innovation, Integrity, Collaboration, and Social Responsibility guide everything we do.</p></div></article>
    </div><figure className="purpose-image"><img src={`${QISB_ASSETS}/hero.webp`} alt="QISB students working together"/><figcaption>Purpose-led education for tomorrow&apos;s business leaders.</figcaption></figure></div></div></section>
    <section className="dean-message section-pad" data-admin-section="dean-message" data-admin-title="Message from the Dean"><div className="shell dean-message-grid"><div className="dean-message-portrait"><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz, Dean of QISB"/><div><strong>Abdulla Nafiz</strong><span>Dean — Qasim Ibrahim School of Business</span></div></div><div className="dean-message-copy"><p className="eyebrow orange">MESSAGE FROM THE DEAN</p><h2>Welcome to QISB</h2><p>Dear Students, Colleagues, Partners, and Friends,</p><p>It is my great pleasure to welcome you to the Qasim Ibrahim School of Business — a business school proudly accredited by the South Asian Quality Assurance System (SAQS) and recognized as an ACCA Gold Approved Learning Partner.</p><p>We are committed to developing ethical, innovative, and future-ready business leaders who can thrive in a dynamic global economy. Our SAQS accreditation reflects our adherence to the highest standards of quality in business education across South Asia, while our ACCA Gold approval underscores our excellence in professional accounting and finance education.</p><p>Whether you are a prospective student, current learner, alumnus, or industry partner, you will find a vibrant academic community dedicated to excellence in teaching, research, and industry engagement. We combine rigorous academic programmes with practical learning experiences to equip our graduates with the knowledge, skills, and values needed to make a meaningful impact.</p><p>I invite you to explore our programmes, connect with our exceptional faculty, and discover how QISB can help you achieve your academic and professional aspirations.</p><p className="message-signoff">Warm regards,<strong>Abdulla Nafiz</strong><span>SAQS Accredited · ACCA Gold Approved Learning Partner</span></p></div></div></section>
    <section id="leadership" className="team-section section-pad" data-admin-section="leadership" data-admin-title="Leadership"><div className="shell"><div className="about-heading team-heading"><p className="eyebrow orange">OUR PEOPLE</p><h2>Leadership</h2><p>Experienced academic leaders guide QISB&apos;s teaching, research, industry engagement and continued development.</p></div><div className="leadership-grid">
      <article><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz"/><div><p>DEAN</p><h3>Abdulla Nafiz</h3><span>Leading QISB&apos;s academic strategy, growth and professional engagement.</span></div></article>
      <article className="leadership-text-card"><Initials name="Dr. Ahsan Ahmed Jaleel"/><div><p>ASSOCIATE DEAN · ASSISTANT PROFESSOR</p><h3>Dr. Ahsan Ahmed Jaleel</h3><span>Supporting academic leadership, evidence-based research and student success.</span></div></article>
    </div></div></section>
    <section className="faculty-section section-pad" data-admin-section="faculty" data-admin-title="Faculty profile"><div className="shell"><div className="about-heading faculty-heading"><p className="eyebrow">FACULTY PROFILE</p><h2>Meet our academic team</h2><p>QISB brings together educators and researchers across management, accounting, finance, marketing, economics, human resources and operations.</p></div><div className="faculty-grid">{facultyMembers.map(member=><article key={member.name}><Initials name={member.name}/><div><h3>{member.name}</h3><p>{member.role}</p><span>{member.focus}</span></div></article>)}</div></div></section>
    <section className="governance-section section-pad" data-admin-section="governance" data-admin-title="Administration and governance"><div className="shell governance-grid">
      <article id="admin-staff"><p className="eyebrow orange">ADMIN STAFF</p><h2>Administrative Office</h2><p>QISB&apos;s administrative team supports students, classes, lecturers and the day-to-day operation of the school. The office provides programme information, manages faculty correspondence and helps direct student enquiries.</p><a href="mailto:qisb@villacollege.edu.mv">Contact the administrative team <ArrowRight size={20}/></a></article>
      <article id="advisory-committee"><p className="eyebrow orange">FACULTY ADVISORY COMMITTEE</p><h2>Industry-informed guidance</h2><p>The Faculty Advisory Committee brings practitioners, educators and stakeholders into QISB&apos;s academic administration. It advises the school on curriculum relevance, strategic planning and quality assurance so programmes remain aligned with changing educational and industry needs.</p><a href="mailto:qisb@villacollege.edu.mv?subject=Faculty%20Advisory%20Committee%20enquiry">Enquire about the committee <ArrowRight size={20}/></a></article>
    </div></section>
    <section id="programmes" className="programmes-section section-pad" data-admin-section="programmes" data-admin-title="Academic programmes"><div className="shell section-heading"><div><p className="eyebrow orange">ACADEMIC PROGRAMMES</p><h2>Choose your<br/>academic pathway</h2></div><p>Explore undergraduate, postgraduate, professional and executive education opportunities offered through QISB.</p></div><div className="programme-grid academic-programme-grid shell">
      {programmes.map((programme,index)=><ProgrammeCard title={programme.title} index={index} key={programme.title}><div className="programme-options">{programme.links.map(link=><a href={link.href} target="_blank" rel="noreferrer" key={link.label}><span>{link.label}</span><ArrowRight size={20}/></a>)}</div></ProgrammeCard>)}
      <ProgrammeCard title="Professional Programmes" index={2}><button className="programme-card-action" type="button" onClick={()=>setProfessionalModalOpen(true)}><span>View programmes</span><ArrowRight size={20}/></button></ProgrammeCard>
      <ProgrammeCard title="Executive Education" index={3}><a className="programme-card-action" href="https://www.villacollege.edu.mv/executive-education" target="_blank" rel="noreferrer"><span>Explore executive education</span><ArrowRight size={20}/></a></ProgrammeCard>
    </div></section>
    <section className="rankings" data-admin-section="rankings" data-admin-title="Academic excellence"><div className="rank-overlay"/><div className="shell rank-content"><div><p className="eyebrow light">GET TO KNOW US</p><h2>Built on <span>academic<br/>excellence</span></h2><p>Established in 2007, QISB has built a strong national reputation for academic excellence and professional development. It is the Maldives&apos; first ACCA Gold Approved Learning Partner and combines rigorous programmes with research, entrepreneurship and strong industry connections.</p></div><div className="rank-stats"><div><strong>123K<sup>+</sup></strong><p>Students Graduated</p></div><div><strong>2007</strong><p>Established</p></div></div></div></section>
    <section id="incubator" className="incubator-section section-pad" data-admin-section="incubator" data-admin-title="University incubator"><div className="shell incubator-grid"><div><p className="eyebrow orange">UNIVERSITY INCUBATOR</p><h2>Turn bold ideas into viable startups</h2></div><div className="incubator-copy"><p>Our incubator helps students and emerging founders shape, test and grow their ideas through mentorship, practical guidance and access to a supportive entrepreneurial network.</p><a className="incubator-link" href="/vignite">Learn more <ArrowRight size={22}/></a></div></div></section>
    <section id="community" className="community-section section-pad" data-admin-section="community" data-admin-title="Our community"><div className="shell"><div className="community-heading"><div><p className="eyebrow orange">OUR COMMUNITY</p><h2>Connect, contribute<br/>and keep growing</h2></div><p>QISB is more than a place to study. Our communities create lasting connections, open doors to new experiences and give students and graduates a meaningful way to stay involved.</p></div><div className="community-card-grid">{communities.map((community,index)=><article key={community.title}><span className="community-number">0{index+1}</span><p className="community-type">{community.subtitle}</p><h3>{community.title}</h3><p>{community.description}</p><a href={community.href} target="_blank" rel="noreferrer">Learn More <ArrowRight size={20}/></a></article>)}</div></div></section>
    <section id="news-and-events" className="news-events-section section-pad" data-admin-section="events" data-admin-title="Events"><div className="shell"><div className="news-events-heading"><div><p className="eyebrow orange">EXPLORE QISB</p><h2>Events</h2></div><p>Discover the conversations, celebrations and experiences bringing our business community together.</p></div><div className="news-events-grid">{newsAndEvents.map(item=><a href="#news-and-events" className="news-event-card" aria-label={`${item.title} — page coming soon`} key={item.title}><span>{item.number}</span><h3>{item.title}</h3><ArrowRight size={28}/></a>)}</div><a className="more-events-button" href="/events">More Events <ArrowRight size={20}/></a></div></section>
    <section id="news" className="research section-pad shell" data-admin-section="news" data-admin-title="Recent news"><div className="research-title"><p className="eyebrow orange">WHAT&apos;S HAPPENING</p><h2>Recent News</h2><p>Discover the latest stories, achievements and opportunities from the QISB community.</p><div className="research-actions"><LinkButton href="https://www.villacollege.edu.mv/faculties/qasim-ibrahim-school-of-business/8">All News</LinkButton></div></div><div className="news-grid">{news.map((item,i)=><article className={i===0?'featured-news':''} key={item.title}><img src={item.image} alt=""/><div className="news-copy"><p className="category">VILLA COLLEGE NEWS</p><h3>{item.title}</h3><p className="date">{item.date}</p><a href={item.href} target="_blank" rel="noreferrer" aria-label={`Read ${item.title}`}>Learn More <ArrowRight size={18}/></a></div></article>)}</div></section>
    <section className="why section-pad shell" data-admin-section="why-choose-us" data-admin-title="Why choose us"><div className="why-copy"><p className="eyebrow orange">QUALITY EDUCATION, PROVEN RESULTS</p><h2>Why Choose Us</h2><p>We invite you to explore our programmes, meet our academic community and discover where your Villa College journey could take you.</p>{features.map((feature,index)=><details key={feature.title} open={index===0}><summary>{index+1}. {feature.title}<span>+</span></summary><p>{feature.description}</p></details>)}</div><div className="dean-portrait"><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz"/><div><strong>Abdulla Nafiz</strong><span>Dean — Qasim Ibrahim School of Business (QISB)</span></div></div></section>
    <section className="testimonials-section section-pad" data-admin-section="testimonials" data-admin-title="Testimonials"><div className="shell"><div className="testimonial-heading"><p className="eyebrow">TESTIMONIALS</p><h2>In Their Own Words:<br/>The QISB Experience</h2></div><div className="community-grid">{testimonials.map(item=><article key={item.name}><span>“</span><p>{item.quote}</p><strong>{item.name}</strong><small>{item.programme}</small></article>)}</div></div></section>
    <section id="career" className="career-section section-pad" data-admin-section="career" data-admin-title="Careers"><div className="shell career-grid"><div className="career-copy"><p className="eyebrow light">CAREER AT QISB</p><h2>Build your future with us</h2><p>Join a community of educators and professionals committed to shaping the next generation of business leaders. We welcome people who bring curiosity, expertise and a passion for making a meaningful contribution.</p><a className="career-link" href="mailto:qisb@villacollege.edu.mv?subject=Career%20enquiry"><span>Explore opportunities</span><ArrowRight size={22}/></a></div><div className="career-details"><article><span>01</span><div><h3>Academic roles</h3><p>Share your subject expertise through teaching, research and student mentorship.</p></div></article><article><span>02</span><div><h3>Professional roles</h3><p>Support our programmes, partnerships and day-to-day school operations.</p></div></article><article><span>03</span><div><h3>Grow together</h3><p>Work in a collaborative environment that values learning, ideas and impact.</p></div></article></div></div></section>
    <section id="contact" className="contact-section section-pad" data-admin-section="contact" data-admin-title="Contact"><div className="shell contact-grid"><div><p className="eyebrow light">CONTACT QISB</p><h2>Let&apos;s start a conversation</h2><p>Questions about programmes, admissions, partnerships or the QISB community? Our team is ready to help.</p></div><address><a href="tel:+9603303233"><span>Phone</span><strong>+960 330 3233</strong></a><a href="mailto:qisb@villacollege.edu.mv"><span>Email</span><strong>qisb@villacollege.edu.mv</strong></a><div><span>Visit</span><strong>Villa College QI Campus<br/>Rah Dhebai Hingun, 20373<br/>Malé, Maldives</strong></div></address></div></section>
  </main><Footer/>{professionalModalOpen&&<ProfessionalProgrammesModal onClose={()=>setProfessionalModalOpen(false)}/>}</div>
}

function Footer(){
  const cols=[['Villa College','About Us','Governance','Career','Media Center','Certificate Verification'],['Programmes','Foundation Programs','Undergraduate Programmes','Postgraduate Programmes','UWE Programmes','VC Programmes'],['Student Resources','Academic Calendar','Forms for Students','Student Policies','Learning Support','Graduation'],['Quick Links','Moodle','MyVC Portal','Student Association','Public Resources','Research Digest']]
  return <footer id="footer" data-admin-section="footer" data-admin-title="Footer"><div className="shell footer-logo-row"><img src={`${QISB_ASSETS}/villa-college-white.svg`} alt="Villa College"/></div><div className="shell footer-grid">{cols.map(([head,...links])=><div key={head}><h4>{head}</h4>{links.map(x=><a href="#" key={x}>{x}</a>)}</div>)}<div className="footer-contact"><h4>Villa College QI Campus</h4><p>Rah Dhebai Hingun, 20373<br/>Malé, Maldives</p><p>Qasim Ibrahim School of Business</p><a href="#">Contact Us →</a></div></div><div className="shell copyright">© 2007 - 2026 Villa College. All rights reserved. <span>Terms of Use · Privacy Policy</span></div></footer>
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/admin') return <AdminPage/>
  if (path === '/events') return <EditablePage pageId="events"><EventsPage/></EditablePage>
  if (path === '/vignite') return <EditablePage pageId="vignite"><VignitePage/></EditablePage>
  return <EditablePage pageId="home"><HomePage/></EditablePage>
}

export default App
