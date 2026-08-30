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
  { title: 'External validation', description: 'SAQS accreditation, overseas university partnerships and professional-body recognition independently verify the quality of our education.' },
  { title: 'Applied learning', description: 'Case studies, simulations, employer-set briefs and industry placements carry learning beyond traditional assessment.' },
  { title: 'Honest challenge', description: 'Students learn to articulate what they think, justify their reasoning and identify the evidence that would change their minds.' },
  { title: 'National relevance', description: 'Curricula, research and case materials are anchored in the realities of the Maldivian economy.' },
]

const testimonials = [
  { name: 'Aishath Shifana', programme: 'Bachelor of Business and Hospitality Management', quote: 'The focus on relevant case studies gave me more than theory. I graduated with practical skills, professional confidence and a clear sense of how to solve real business problems.' },
  { name: 'Mariyam Anoosha', programme: 'Master of Business Administration (MBA)', quote: 'The lecturers brought deep industry experience and treated us as future colleagues. Their mentorship and the supportive class community encouraged me to challenge myself and grow.' },
  { name: 'Mohamed Adam', programme: 'Bachelor of Science in Marketing', quote: 'Guest lectures, networking events and internship opportunities connected my studies to the Maldivian business landscape and helped me build a professional network before graduating.' },
]

const communities = [
  {
    title: 'VCBS',
    subtitle: 'Student community',
    description: 'The Villa College Business Society is the School’s independent, student-led body, creating opportunities for experiential learning, voluntary service and professional networking.',
    href: 'https://villacollege.edu.mv/communities/villa-college-business-society-vcbs/1',
  },
  {
    title: 'Alumni',
    subtitle: 'Graduate community',
    description: 'Alumni stay connected through mentoring, guest teaching, industry panels and institutional governance, while helping the next generation build professional confidence and networks.',
    href: 'https://villacollege.edu.mv/communities/villa-college-alumni-association-vcaa/4',
  },
]

const facultyMembers = [
  { name: 'Dr. Byju Koreth Puthanveettil Madhavan', role: 'Assistant Professor — Business and Management', focus: 'Strategic management, people management and integrated business simulation' },
  { name: 'Dr. Mir Hasan Naqvi', role: 'Assistant Professor — Business and Economics', focus: 'Islamic finance, international trade and credit management' },
  { name: 'Shajeer Sainudeen Shahida', role: 'Senior Lecturer — Business and Management', focus: 'Marketing, branding and entrepreneurship' },
  { name: 'Muhammed Shahzeb Khan', role: 'Senior Lecturer', focus: 'Operations, supply chain and project quality management' },
  { name: 'Ibrahim Sadhin', role: 'Lecturer', focus: 'Business and aviation management' },
  { name: 'Dr. Ashlin Nimo J.R.', role: 'Assistant Professor — Marketing', focus: 'Marketing with business management' },
  { name: 'Dr. Mohd Irfan Rais', role: 'Assistant Professor — Marketing', focus: 'Marketing with business management' },
  { name: 'Dr. Siddique E Azam', role: 'Assistant Professor — Marketing', focus: 'Marketing with business management' },
  { name: 'Dr. Mohammed Ali Sharafuddin', role: 'Senior Lecturer — Marketing', focus: 'Marketing with business management' },
  { name: 'Dr. Mohammed Ashraf Balloor Abdulla', role: 'Senior Lecturer — Human Resource Management', focus: 'HRM teaching and curriculum development' },
  { name: 'Dr. Abdulrahman Abubakar', role: 'Assistant Professor — Accounting and Finance', focus: 'Financial and management accounting, audit and reporting' },
  { name: 'Dr. Mohamed Noordeen Mohamed Imtiyaz', role: 'Assistant Professor — Accounting and Finance', focus: 'Managerial finance, taxation and advanced accounting' },
  { name: 'Dr. Abubakar Abdu', role: 'Assistant Professor — Accounting and Finance', focus: 'Corporate finance, financial reporting and assurance' },
  { name: 'Dr. Oyetunji Oluwayomi Taiwo', role: 'Assistant Professor — Accounting and Finance', focus: 'Corporate finance, financial decision-making and accounting frameworks' },
  { name: 'Syed Masood Hussaini', role: 'Lecturer — Accounting and Finance', focus: 'Financial and management accounting' },
  { name: 'Jyothylakshmi B', role: 'Lecturer and ACCA Programme Manager', focus: 'ACCA pathways, exemptions and professional registration' },
  { name: 'Syed Ahmad Rafey', role: 'Manager and Lecturer — CIED', focus: 'Enterprise modules, student competitions and incubator programming' },
  { name: 'Ruchira Perera', role: 'School Administrator and Senior Lecturer', focus: 'School administration and teaching' },
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

const advisoryInternalMembers = [
  { name: 'Abdulla Nafiz', role: 'Dean, Qasim Ibrahim School of Business' },
  { name: 'Dr Ahsan Ahmed Jaleel', role: 'Associate Dean, Qasim Ibrahim School of Business' },
  { name: 'Nikhil Vimala Muraleedharan', role: 'Head of Cluster, Qasim Ibrahim School of Business' },
]

const advisoryExternalMembers = [
  { category: 'Eminent Academic', name: 'Dr Patrick Gunnigle', role: 'Emeritus Professor of Business Studies, University of Limerick' },
  { category: 'Industry Expert', name: 'Mohamed Haleem', role: 'Chief Financial Officer, Villa Air' },
  { category: 'Industry Expert', name: 'Mohamed Najah', role: 'Managing Director, FENAKA Corporation Limited' },
  { category: 'Discipline Expert', name: 'Ahmed Abdul Hakeem', role: 'Chief Engineer — Line Maintenance, ATR and DHC-8 Fleet, Maldives Airports Company Limited' },
  { category: 'Government Representative', name: 'Hassan Miras', role: 'Deputy Minister, Ministry of Finance and Planning' },
  { category: 'Alumni Representative', name: 'Mariyam Nasha Hashim', role: 'Senior Administrative Officer — Policy Planning and Research Division, Ministry of Education' },
  { category: 'Student Representative', name: 'Mariyam Manaal Moosa', role: 'MBA Candidate, Qasim Ibrahim School of Business' },
]

const advisoryFunctions = [
  { number: '01', title: 'Curriculum relevance', description: 'Evaluate curriculum design and verify that module content reflects current business and technological realities.' },
  { number: '02', title: 'Graduate outcomes', description: 'Confirm that learning outcomes and graduate attributes align with employer recruitment benchmarks.' },
  { number: '03', title: 'Academic development', description: 'Review proposals for new qualifications and contribute to periodic programme evaluations.' },
  { number: '04', title: 'Workplace learning', description: 'Advise on assessment balance, internships and the integration of meaningful workplace experience.' },
  { number: '05', title: 'Industry collaboration', description: 'Support guest masterclasses, live business briefs, site visits, formal internships and graduate hiring pipelines.' },
]

function FacultyAdvisoryPage() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Faculty Advisory Committee — QISB'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  return <div className={`page advisory-page ${dark?'dark':''}`}><Header dark={dark} onToggleTheme={()=>setDark(value=>!value)}/><main>
    <div className="events-breadcrumb" data-admin-section="advisory-breadcrumb" data-admin-title="Breadcrumb"><div className="shell"><span aria-hidden="true">●</span><a href="/">Home</a><i>/</i><a href="/#leadership">Our Team</a><i>/</i><strong>Faculty Advisory Committee</strong></div></div>
    <section className="advisory-hero" data-admin-section="advisory-introduction" data-admin-title="Page introduction"><div className="shell advisory-hero-grid"><div><p className="eyebrow light">INDEPENDENT OVERSIGHT</p><h1>Faculty Advisory Committee</h1></div><div className="advisory-hero-copy"><p>The Committee ensures that the School&apos;s academic portfolio directly aligns with the economic and developmental requirements of the Maldives and the wider region.</p><a className="advisory-photo-credit" href="https://unsplash.com/photos/four-business-professionals-in-a-meeting-discussing-ideas-oWp_brmeBdQ" target="_blank" rel="noreferrer">Photo by Vitaly Gariev on Unsplash</a></div></div></section>
    <section className="advisory-overview section-pad" data-admin-section="advisory-overview" data-admin-title="Committee overview"><div className="shell advisory-overview-grid"><div><p className="eyebrow orange">PURPOSE</p><h2>Connecting academic quality with real-world needs</h2></div><div><p>The Committee brings together the School&apos;s executive leadership and external representatives drawn from international academia, key industries, government, the alumni body, and the student community.</p><p>Members are appointed to provide independent, critical oversight and to ensure that programmes remain relevant to students, employers and the wider economy.</p></div></div><figure className="shell advisory-image-band"><img src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?auto=format&amp;fit=crop&amp;w=1800&amp;q=85" alt="Business professionals discussing ideas around a meeting table"/><figcaption><span>Independent perspectives strengthen academic decisions.</span><a href="https://unsplash.com/photos/business-people-in-a-meeting-around-a-table-fQf9XTYNmQU" target="_blank" rel="noreferrer">Photo by Vitaly Gariev on Unsplash</a></figcaption></figure></section>
    <section className="advisory-members section-pad" data-admin-section="advisory-members" data-admin-title="Committee membership"><div className="shell"><div className="advisory-heading"><p className="eyebrow orange">COMMITTEE MEMBERSHIP</p><h2>Internal academic leadership</h2></div><div className="advisory-internal-grid">{advisoryInternalMembers.map(member=><article key={member.name}><Initials name={member.name}/><div><h3>{member.name}</h3><p>{member.role}</p></div></article>)}</div><div className="advisory-heading advisory-external-heading"><p className="eyebrow">EXTERNAL PERSPECTIVE</p><h2>Industry and stakeholder representatives</h2></div><div className="advisory-external-grid">{advisoryExternalMembers.map(member=><article key={member.name}><p className="advisory-member-category">{member.category}</p><h3>{member.name}</h3><p>{member.role}</p></article>)}</div></div></section>
    <section className="advisory-functions section-pad" data-admin-section="advisory-functions" data-admin-title="Role and strategic functions"><div className="shell advisory-functions-grid"><div className="advisory-functions-heading"><p className="eyebrow light">ROLE &amp; STRATEGIC FUNCTIONS</p><h2>How the Committee contributes</h2><p>The Committee works across curriculum, academic development, workplace learning and active employer engagement.</p></div><div>{advisoryFunctions.map(item=><article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>
    <section className="advisory-governance section-pad" data-admin-section="advisory-governance" data-admin-title="Governance"><div className="shell"><p className="eyebrow orange">GOVERNANCE</p><h2>Independent advice within an accountable structure</h2><p>The Committee meets on a scheduled basis throughout the academic year in line with College policy. It reports directly to the School&apos;s leadership and into Villa College&apos;s academic governance framework.</p><a href="mailto:qisb@villacollege.edu.mv?subject=Faculty%20Advisory%20Committee%20enquiry">Enquire about the Committee <ArrowRight size={21}/></a></div></section>
  </main><Footer/></div>
}

function VignitePage() {
  const [dark, setDark] = useState(false)
  const benefits = [
    ['Dedicated co-working space', 'a focused environment where founders can develop and test their ventures'],
    ['Executive mentoring', 'direct guidance from experienced business leaders and entrepreneurs'],
    ['Technical workshops', 'practical support for market validation, business models, finance and regulatory planning'],
    ['Commercial connections', 'introductions to established entrepreneurs, corporate partners and investors'],
  ]
  const partners = ['Business Centre Corporation', 'Dhiraagu', 'Fenaka Corporation', 'Soneva Namoona', 'Women in Tech Maldives', 'Spark Hub', 'Square Hub', 'OXIQA', 'Kandufa Foundation', 'Villa Shipping and Trading Company', 'Huawei', 'APIMED']

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'VIgnite Incubator Programme — QISB'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  return <div className={`page vignite-page ${dark?'dark':''}`}><Header dark={dark} onToggleTheme={()=>setDark(value=>!value)}/><main id="main-content">
    <nav className="vignite-faculty-nav" data-admin-section="section-navigation" data-admin-title="Section navigation" aria-label="QISB section navigation"><div className="shell"><strong>Entrepreneurship</strong><div><a href="/#programmes">Programmes</a><a className="current" href="/vignite">VIgnite</a><a href="/#community">Community</a><a href="/#news-and-events">Events</a></div></div></nav>
    <div className="vignite-page-layout shell">
      <aside className="vignite-side-nav" data-admin-section="page-navigation-copy" data-admin-title="Page navigation" aria-label="VIgnite page navigation"><strong>VIgnite incubator</strong><a href="#about-vignite">About VIgnite</a><a href="#vignite-benefits">Founder support</a><a href="#vignite-dates">Venture development</a><a href="#vignite-eligibility">Partner network</a><a href="#vignite-apply">Work with VIgnite</a></aside>
      <article className="vignite-article">
        <nav className="vignite-breadcrumb" data-admin-section="breadcrumb" data-admin-title="Breadcrumb" aria-label="Breadcrumb"><a href="/">QISB</a><span>›</span><a href="/#community">Entrepreneurship</a><span>›</span><span>VIgnite incubator programme</span></nav>
        <header className="vignite-intro" data-admin-section="introduction-copy" data-admin-title="Page introduction"><h1>Turn early-stage ideas into viable enterprises</h1><p>VIgnite is the Qasim Ibrahim School of Business incubator and the first student business incubator in the Maldives.</p></header>
        <section id="about-vignite" data-admin-section="about-copy" data-admin-title="About the programme"><h2>About VIgnite</h2><p>Established on 14 September 2024 alongside the renaming of the School, VIgnite provides structured support to help founders validate early-stage concepts and build commercially sustainable enterprises.</p><p>It serves as an objective testing ground where student founders can critically examine unit economics, market demand and business models under expert supervision.</p></section>
        <section data-admin-section="development-copy" data-admin-title="Venture development"><h2>From opportunity to enterprise</h2><p>Founders work through opportunity identification, market validation, business model design, unit economics, cash-flow forecasting, financing strategies and regulatory compliance in the Maldives.</p><p>The aim is practical: to test assumptions early, strengthen commercial decisions and build ventures capable of surviving contact with the market.</p></section>
        <section id="vignite-benefits" data-admin-section="benefits-copy" data-admin-title="VIgnite benefits"><h2>Founder support</h2><p>VIgnite combines practical resources with direct access to experienced people and organisations.</p><ul className="vignite-benefits">{benefits.map(([title,description])=><li key={title}><strong>{title}:</strong> {description}</li>)}</ul></section>
        <blockquote className="vignite-quote" data-admin-section="founder-quote" data-admin-title="Founder experience quote"><span aria-hidden="true">“</span><p>Build alongside an ambitious community of founders, learn from experienced mentors and turn your ideas into action.</p><cite>The VIgnite founder experience</cite></blockquote>
        <section id="vignite-dates" data-admin-section="stages-copy" data-admin-title="Venture development"><h2>What founders test</h2><dl className="vignite-dates"><div><dt>Opportunity</dt><dd>Is the problem real, specific and worth solving?</dd></div><div><dt>Market</dt><dd>Is there evidence of demand from a clearly defined customer?</dd></div><div><dt>Economics</dt><dd>Can the venture’s pricing, costs and cash flow support sustainable operation?</dd></div><div><dt>Model</dt><dd>Can the team deliver, finance and scale the proposed solution responsibly?</dd></div></dl></section>
        <section id="vignite-eligibility" data-admin-section="partners-copy" data-admin-title="Partner network"><h2>Supported by industry</h2><p>The incubator is supported by corporate and public partners that contribute connectivity, seed support, specialist knowledge, mentors and commercial networks.</p><div className="vignite-alumni-grid">{partners.map(name=><span key={name}><i aria-hidden="true">→</i>{name}</span>)}</div></section>
        <section id="vignite-apply" data-admin-section="application-copy" data-admin-title="Work with VIgnite"><h2>Work with VIgnite</h2><p>Students, founders, mentors, investors and organisations interested in supporting commercially sustainable student ventures are invited to contact the School.</p><a className="vignite-apply-button" href="mailto:qisb@villacollege.edu.mv?subject=VIgnite%20incubator%20enquiry">Contact the VIgnite team <ArrowRight size={21}/></a></section>
        <blockquote className="vignite-quote" data-admin-section="community-quote" data-admin-title="Programme principle quote"><span aria-hidden="true">“</span><p>A strong founder community gives you people to challenge your assumptions, share useful connections and keep you moving when building gets difficult.</p><cite>VIgnite programme principle</cite></blockquote>
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
    <section className="hero-section qisb-hero" data-admin-section="hero-copy" data-admin-title="Hero"><div className="hero-shade"/><div className="hero-copy shell"><p>Developing ethical leaders and innovative entrepreneurs for the Maldives and beyond.</p></div><div className="scroll-cue"><span>SCROLL</span><i/></div></section>
    <section id="about" className="intro shell section-pad" data-admin-section="about-copy" data-admin-title="About QISB"><p className="eyebrow">QASIM IBRAHIM SCHOOL OF BUSINESS</p><h1>Business education built for the real world</h1><p className="lede">QISB is Villa College’s largest school, offering programmes from undergraduate degrees through to master’s study, professional qualifications and executive education. Established in 2007 as the Faculty of Business Management, it became the first business school in the Maldives to earn SAQS accreditation in February 2026.</p></section>
    <section className="purpose-section section-pad" data-admin-section="purpose-copy" data-admin-title="Vision, mission and values"><div className="shell"><div className="purpose-heading"><p className="eyebrow orange">VISION, MISSION &amp; VALUES</p><h2>This is what guides us.</h2><p>Our objective is to develop ethical leaders and innovative entrepreneurs who drive sustainable economic growth in the Maldives and beyond.</p></div><div className="purpose-layout"><div className="purpose-list">
      <article><span>1.</span><div><h3>External validation</h3><p>We measure ourselves against independent international standards through accreditation, overseas university partnerships and professional-body recognition.</p></div></article>
      <article><span>2.</span><div><h3>Applied learning</h3><p>Case studies, simulations, employer-set briefs and industry placements connect academic knowledge directly to organisations and markets.</p></div></article>
      <article><span>3.</span><div><h3>Honest challenge</h3><p>Students are expected to explain what they think, justify their reasoning and identify the evidence that would change their minds.</p></div></article>
      <article><span>4.</span><div><h3>National relevance</h3><p>Curricula, research and case materials are grounded in the distinctive realities of the Maldivian economy.</p></div></article>
    </div><figure className="purpose-image"><img src={`${QISB_ASSETS}/hero.webp`} alt="QISB students working together"/><figcaption>Purpose-led education for tomorrow&apos;s business leaders.</figcaption></figure></div></div></section>
    <section className="dean-message section-pad" data-admin-section="dean-message-copy" data-admin-title="Message from the Dean"><div className="shell dean-message-grid"><div className="dean-message-portrait"><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz, Dean of QISB"/><div><strong>Abdulla Nafiz</strong><span>Dean — Qasim Ibrahim School of Business</span></div></div><div className="dean-message-copy"><p className="eyebrow orange">MESSAGE FROM THE DEAN</p><h2>Welcome to QISB</h2><p>Dear students, colleagues, partners, and friends,</p><p>It is my great pleasure to welcome you to the Qasim Ibrahim School of Business, an institution accredited by the South Asian Quality Assurance System and recognised as an ACCA Gold Approved Learning Partner.</p><p>At the Qasim Ibrahim School of Business, we are dedicated to developing ethical, innovative, and future-ready business leaders who can thrive in a dynamic global economy. Our SAQS accreditation reflects our adherence to the highest standards of quality in business education across South Asia, while our ACCA Gold approval underscores our standing in professional accounting and finance education.</p><p>External recognition is more than a credential. Graduates of an accredited school carry an assurance of competence verified by an independent international quality-assurance agency. When you present your degree to an employer in Malé or an admissions committee abroad, it carries objective validation rather than institutional self-description. That distinction belongs to you as a graduate.</p><p>Whether you are a prospective student, a current learner, an alumnus, or an industry partner, you will find an academic community dedicated to rigorous teaching, active research, and meaningful industry engagement. We combine academic depth with practical learning to equip graduates with the skills and values needed to make an impact.</p><p>I invite you to explore our programmes, meet our faculty, and discover what this School can help you become.</p><p className="message-signoff">Warm regards,<strong>Abdulla Nafiz</strong><span>Dean, Qasim Ibrahim School of Business</span></p></div></div></section>
    <section id="leadership" className="team-section section-pad" data-admin-section="leadership-copy" data-admin-title="Leadership"><div className="shell"><div className="about-heading team-heading"><p className="eyebrow orange">OUR PEOPLE</p><h2>Leadership</h2><p>The School is led by an executive team whose members remain active in classroom teaching, academic governance and research.</p></div><div className="leadership-grid">
      <article><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz"/><div><p>DEAN</p><h3>Abdulla Nafiz</h3><span>MBA, University of Adelaide. Teaching and researching enterprise, international markets, SMEs and family-owned businesses.</span></div></article>
      <article className="leadership-text-card"><Initials name="Dr. Ahsan Ahmed Jaleel"/><div><p>ASSOCIATE DEAN</p><h3>Dr. Ahsan Ahmed Jaleel</h3><span>PhD, Monash University. Teaching applied business projects and evidence-based research, with research in consumer behaviour and gamified learning.</span></div></article>
      <article className="leadership-text-card"><Initials name="Nikhil Vimala Muraleedharan"/><div><p>HEAD OF CLUSTER · BUSINESS AND MANAGEMENT</p><h3>Nikhil Vimala Muraleedharan</h3><span>Overseeing curriculum currency, teaching standards and academic coordination across business and management programmes.</span></div></article>
    </div></div></section>
    <section className="faculty-section section-pad" data-admin-section="faculty-copy" data-admin-title="Faculty profile"><div className="shell"><div className="about-heading faculty-heading"><p className="eyebrow">FACULTY PROFILE</p><h2>Meet our academic team</h2><p>Faculty combine advanced academic credentials with operational experience across Maldivian and international organisations, supported by guest practitioners, industry panels and employer-set briefs.</p></div><div className="faculty-grid">{facultyMembers.map(member=><article key={member.name}><Initials name={member.name}/><div><h3>{member.name}</h3><p>{member.role}</p><span>{member.focus}</span></div></article>)}</div></div></section>
    <section className="governance-section section-pad" data-admin-section="governance-copy" data-admin-title="Administration and governance"><div className="shell governance-grid">
      <article id="admin-staff"><p className="eyebrow orange">ADMIN STAFF</p><h2>Administrative Office</h2><p>The School Administration Team supports registration, timetabling, assessments, results, transcripts, student letters, fees and examination logistics. It is also the first point of contact for electives, progression, deadlines and professional accounting pathways.</p><a href="mailto:qisb@villacollege.edu.mv">Contact the administrative team <ArrowRight size={20}/></a></article>
      <article id="advisory-committee"><p className="eyebrow orange">FACULTY ADVISORY COMMITTEE</p><h2>Industry-informed guidance</h2><p>External leaders from major Maldivian industries independently review curriculum design, graduate attributes, internships and programme proposals so learning remains aligned with contemporary recruitment and business requirements.</p><a href="/faculty-advisory">Learn more <ArrowRight size={20}/></a></article>
    </div></section>
    <section id="programmes" className="programmes-section section-pad" data-admin-section="programmes-copy" data-admin-title="Academic programmes"><div className="shell section-heading"><div><p className="eyebrow orange">ACADEMIC PROGRAMMES</p><h2>Knowledge.<br/>Application. Connection.</h2></div><p>Study undergraduate, postgraduate and professional pathways through lectures, seminars, simulations, applied research and employer briefs, with on-campus and online options and intakes in January, May and September.</p></div><div className="programme-grid academic-programme-grid shell">
      {programmes.map((programme,index)=><ProgrammeCard title={programme.title} index={index} key={programme.title}><div className="programme-options">{programme.links.map(link=><a href={link.href} target="_blank" rel="noreferrer" key={link.label}><span>{link.label}</span><ArrowRight size={20}/></a>)}</div></ProgrammeCard>)}
      <ProgrammeCard title="Professional Programmes" index={2}><button className="programme-card-action" type="button" onClick={()=>setProfessionalModalOpen(true)}><span>View programmes</span><ArrowRight size={20}/></button></ProgrammeCard>
      <ProgrammeCard title="Executive Education" index={3}><a className="programme-card-action" href="https://www.villacollege.edu.mv/executive-education" target="_blank" rel="noreferrer"><span>Explore executive education</span><ArrowRight size={20}/></a></ProgrammeCard>
    </div></section>
    <section className="rankings" data-admin-section="rankings-copy" data-admin-title="Academic excellence"><div className="rank-overlay"/><div className="shell rank-content"><div><p className="eyebrow light">EXTERNALLY VALIDATED</p><h2>Built on <span>academic<br/>excellence</span></h2><p>QISB became the first business school in the Maldives to receive SAQS accreditation in February 2026. It has been an ACCA Gold Approved Learning Partner since 2013, and its Online MBA is the first Maldivian programme to enter the QS Online MBA Rankings.</p></div><div className="rank-stats"><div><strong>13</strong><p>SAQS-accredited programmes</p></div><div><strong>2007</strong><p>Established</p></div></div></div></section>
    <section id="incubator" className="incubator-section section-pad" data-admin-section="incubator-copy" data-admin-title="University incubator"><div className="shell incubator-grid"><div><p className="eyebrow orange">VIGNITE INCUBATOR</p><h2>Test ideas before the market does</h2></div><div className="incubator-copy"><p>Established in September 2024 as the first student business incubator in the Maldives, VIgnite provides co-working space, executive mentoring, technical workshops and introductions to entrepreneurs and investors.</p><a className="incubator-link" href="/vignite">Learn more <ArrowRight size={22}/></a></div></div></section>
    <section id="community" className="community-section section-pad" data-admin-section="community-copy" data-admin-title="Our community"><div className="shell"><div className="community-heading"><div><p className="eyebrow orange">OUR COMMUNITY</p><h2>Connect, contribute<br/>and keep growing</h2></div><p>Student life extends through societies, business competitions, academic forums, sports and community initiatives, supported by academic advising, career guidance and confidential mental-health services.</p></div><div className="community-card-grid">{communities.map((community,index)=><article key={community.title}><span className="community-number">0{index+1}</span><p className="community-type">{community.subtitle}</p><h3>{community.title}</h3><p>{community.description}</p><a href={community.href} target="_blank" rel="noreferrer">Learn More <ArrowRight size={20}/></a></article>)}</div></div></section>
    <section id="news-and-events" className="news-events-section section-pad" data-admin-section="events" data-admin-title="Events"><div className="shell"><div className="news-events-heading"><div><p className="eyebrow orange">EXPLORE QISB</p><h2>Events</h2></div><p>Discover the conversations, celebrations and experiences bringing our business community together.</p></div><div className="news-events-grid">{newsAndEvents.map(item=><a href="#news-and-events" className="news-event-card" aria-label={`${item.title} — page coming soon`} key={item.title}><span>{item.number}</span><h3>{item.title}</h3><ArrowRight size={28}/></a>)}</div><a className="more-events-button" href="/events">More Events <ArrowRight size={20}/></a></div></section>
    <section id="news" className="research section-pad shell" data-admin-section="news" data-admin-title="Recent news"><div className="research-title"><p className="eyebrow orange">WHAT&apos;S HAPPENING</p><h2>Recent News</h2><p>Discover the latest stories, achievements and opportunities from the QISB community.</p><div className="research-actions"><LinkButton href="https://www.villacollege.edu.mv/faculties/qasim-ibrahim-school-of-business/8">All News</LinkButton></div></div><div className="news-grid">{news.map((item,i)=><article className={i===0?'featured-news':''} key={item.title}><img src={item.image} alt=""/><div className="news-copy"><p className="category">VILLA COLLEGE NEWS</p><h3>{item.title}</h3><p className="date">{item.date}</p><a href={item.href} target="_blank" rel="noreferrer" aria-label={`Read ${item.title}`}>Learn More <ArrowRight size={18}/></a></div></article>)}</div></section>
    <section className="why section-pad shell" data-admin-section="why-choose-us-copy" data-admin-title="Why choose us"><div className="why-copy"><p className="eyebrow orange">KNOWLEDGE · APPLICATION · CONNECTION</p><h2>Why Choose Us</h2><p>Business education is valuable when it survives contact with the market. At QISB, knowledge is taught, applied and connected directly to real organisations.</p>{features.map((feature,index)=><details key={feature.title} open={index===0}><summary>{index+1}. {feature.title}<span>+</span></summary><p>{feature.description}</p></details>)}</div><div className="dean-portrait"><img src={`${QISB_ASSETS}/dean.png`} alt="Abdulla Nafiz"/><div><strong>Abdulla Nafiz</strong><span>Dean — Qasim Ibrahim School of Business (QISB)</span></div></div></section>
    <section className="testimonials-section section-pad" data-admin-section="testimonials" data-admin-title="Testimonials"><div className="shell"><div className="testimonial-heading"><p className="eyebrow">TESTIMONIALS</p><h2>In Their Own Words:<br/>The QISB Experience</h2></div><div className="community-grid">{testimonials.map(item=><article key={item.name}><span>“</span><p>{item.quote}</p><strong>{item.name}</strong><small>{item.programme}</small></article>)}</div></div></section>
    <section id="career" className="career-section section-pad" data-admin-section="career-copy" data-admin-title="Careers"><div className="shell career-grid"><div className="career-copy"><p className="eyebrow light">CAREERS &amp; EMPLOYABILITY</p><h2>Build your future before graduation</h2><p>Career development runs through every programme via internships, employer panels, CV workshops, interview coaching and alumni mentoring. Graduates work across tourism, finance, government, telecommunications, logistics, retail and construction, while many build enterprises of their own.</p><a className="career-link" href="mailto:careerservices@villacollege.edu.mv"><span>Meet a Career Advisor</span><ArrowRight size={22}/></a></div><div className="career-details"><article><span>01</span><div><h3>Career Fair</h3><p>Meet national employers through direct on-campus recruitment.</p></div></article><article><span>02</span><div><h3>VC_Connect</h3><p>Find current jobs and internships through Villa College’s dedicated online board.</p></div></article><article><span>03</span><div><h3>CAST</h3><p>Prepare for corporate recruitment pipelines through the graduate talent initiative.</p></div></article></div></div></section>
    <section id="contact" className="contact-section section-pad" data-admin-section="contact-copy" data-admin-title="Contact"><div className="shell contact-grid"><div><p className="eyebrow light">CONTACT QISB</p><h2>Let&apos;s start a conversation</h2><p>The School office is open Saturday to Thursday, 2:00pm to 10:00pm. Visit the Student Support desk on the ground floor of QI Campus or contact us directly.</p></div><address><a href="tel:+9603303233"><span>School office</span><strong>+960 330 3233</strong></a><a href="mailto:qisb@villacollege.edu.mv"><span>Email</span><strong>qisb@villacollege.edu.mv</strong></a><div><span>Visit</span><strong>Villa College QI Campus<br/>Rah Dhebai Hingun, Malé 20373<br/>Republic of Maldives</strong></div></address></div></section>
  </main><Footer/>{professionalModalOpen&&<ProfessionalProgrammesModal onClose={()=>setProfessionalModalOpen(false)}/>}</div>
}

function Footer(){
  const cols=[['Villa College','About Villa College','Governance','Faculties','Campuses','Partners'],['Programmes','All Programmes','Undergraduate Programmes','Postgraduate Programmes','Professional Programmes','Executive Education'],['Student Resources','Academic Calendar','Forms and Handbooks','Student Policies','V-Care','Graduation'],['Quick Links','Moodle','MyVC Portal','VC_Connect','Public Resources','Certificate Verification']]
  return <footer id="footer" data-admin-section="footer-copy" data-admin-title="Footer"><div className="shell footer-logo-row"><img src={`${QISB_ASSETS}/villa-college-white.svg`} alt="Villa College"/></div><div className="shell footer-grid">{cols.map(([head,...links])=><div key={head}><h4>{head}</h4>{links.map(x=><a href="#" key={x}>{x}</a>)}</div>)}<div className="footer-contact"><h4>Qasim Ibrahim School of Business</h4><p>Villa College, QI Campus<br/>Rah Dhebai Hingun<br/>Malé 20373, Republic of Maldives</p><a href="mailto:qisb@villacollege.edu.mv">qisb@villacollege.edu.mv</a><a href="tel:+9603303233">+960 330 3233</a><p>SAQS Accredited<br/>ACCA Gold Approved Learning Partner</p></div></div><div className="shell copyright">© 2007 - 2026 Villa College. All rights reserved. <span>Terms of Use · Privacy Policy</span></div></footer>
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/admin') return <AdminPage/>
  if (path === '/events') return <EditablePage pageId="events"><EventsPage/></EditablePage>
  if (path === '/faculty-advisory') return <EditablePage pageId="faculty-advisory"><FacultyAdvisoryPage/></EditablePage>
  if (path === '/vignite') return <EditablePage pageId="vignite"><VignitePage/></EditablePage>
  return <EditablePage pageId="home"><HomePage/></EditablePage>
}

export default App
