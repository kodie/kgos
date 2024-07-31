import {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  matchRoutes,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'

import {
  FaBug,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaHeart,
  FaInfoCircle,
  FaLinkedin,
  FaWrench
} from 'react-icons/fa'

import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscMenu
} from 'react-icons/vsc'

import { Helmet } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import preval from 'preval.macro'

import AboutView from './views/AboutView.js'
import HireMeView from './views/HireMeView.js'
import ProjectsView from './views/ProjectsView.js'

import contributions from './data/contributions.json'
import portfolio from './data/portfolio.json'
import projects from './data/projects.json'

function App() {
  ReactGA.initialize('G-ZY8TE8DXKL')

  const routes = [
    {
      id: 'about',
      title: 'About',
      path: 'about',
      description: 'Hi there, I\'m Kodie—a father, musician, tinkerer, and software engineer. With nearly 20 years of coding experience, including a decade professionally, I\'ve developed websites (both backend and frontend), mobile applications, desktop software, APIs, build tools, plugins, add-ons, you name it.',
      element: <AboutView />,
      icon: <FaInfoCircle />
    },
    {
      id: 'projects',
      title: 'Projects',
      path: 'projects/*',
      description: 'A list of projects that I have built and worked on over the years.',
      element: <ProjectsView title="Projects" projects={projects} />,
      icon: <FaWrench />
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      path: 'portfolio/*',
      description: 'My portfolio; a list of projects that I have worked on for clients.',
      element: <ProjectsView title="Portfolio" projects={portfolio} />,
      icon: <FaFolder />
    },
    {
      id: 'contributions',
      title: 'Contributions',
      path: 'contributions/*',
      description: 'Contributions I\'ve made to open source projects.',
      element: <ProjectsView title="Contributions" projects={contributions} />,
      icon: <FaBug />
    },
    {
      id: 'hire-me',
      title: 'Hire Me!',
      path: 'hire-me',
      description: 'As an Independent Senior Software Engineer Contractor, I am eager to help you build your next project or enhance an existing one. I take pride in delivering high-quality, maintainable code and bring unparalleled care and professionalism to every task.',
      element: <HireMeView />,
      icon: <FaHeart />
    }
  ]

  const links = [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/kodie',
      icon: <FaGithub />
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/kodie',
      icon: <FaLinkedin />
    },
    {
      id: 'resume',
      label: 'Resume',
      url: 'https://kodieg.com/resume.pdf',
      icon: <FaFileAlt />
    }
  ]

  const buildDate = preval`module.exports = new Date().toLocaleString()`

  const navRef = useRef(null)
  const mobileNavBtnRef = useRef(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const matchedRoutes = matchRoutes(routes, location)
  const currentRoute = matchedRoutes ? matchedRoutes[0].route : routes[0]

  const handleDocumentClick = (event) => {
    if (
      mobileNavOpen &&
      !navRef.current.contains(event.target) &&
      !mobileNavBtnRef.current.contains(event.target)
    ) {
      setMobileNavOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  })

  useEffect(() => {
    setMobileNavOpen(false)

    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname
    })
  }, [location])

  return (
    <div id="WindowBox" className={`${currentRoute.id}-view`}>
      <Helmet titleTemplate="%s &ndash; Kodie Grantham &mdash; Independent Senior Software Engineer Contractor">
        <title>{currentRoute.title}</title>
        <meta name="description" content={currentRoute.description} />
      </Helmet>
      <div className="title-bar">
        <span className="title">Kodie Grantham &mdash; Senior Software Engineer Contractor</span>
        <div className="controls">
          <VscChromeMinimize />
          <VscChromeMaximize />
          <VscChromeClose />
        </div>
      </div>
      <div className={`tabs-navigation ${mobileNavOpen ? 'open' : ''}`}>
        <button className="mobile-nav-btn" ref={mobileNavBtnRef} onClick={() => setMobileNavOpen(prev => !prev)}>
          <VscMenu />
          <span>Menu</span>
        </button>
        {(currentRoute && currentRoute.element.type === ProjectsView) &&
          <button className={`mobile-nav-btn projects-mobile-nav-btn ${currentRoute.path.replace(/\/\*$/, '') === location.pathname.replace(/^\/|\/$/g, '') ? 'open' : ''}`} onClick={() => navigate(currentRoute.path.replace(/\/\*$/, ''))}>
            {currentRoute.icon}
            <span>{currentRoute.title} List</span>
          </button>
        }
        <ul className="nav-items" ref={navRef}>
          {routes.map((r, i) =>
            <li key={`tab-nav-item-${r.id}`} id={`tab-nav-item-${r.id}`}>
              <NavLink to={r.path.replace(/\/\*$/, '')}>
                {r.icon}
                <span>{r.title}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="content-container">
        <Routes location={location}>
          {routes.map((r, i) =>
            <Route key={`route-${r.id}`} path={r.path} element={r.element} />
          )}
          <Route key={routes.length} path="*" element={<Navigate to={routes[0].path} replace />}/>
        </Routes>
      </div>
      <div className="status-bar">
        {links.map((link, i) =>
          <a key={`status-bar-link-${link.id}`} href={link.url} className={`status-bar-link ${link.id}`} target="_blank" rel="noreferrer">
            {link.icon}
            <span>{link.label}</span>
          </a>
        )}
        <span className="status-bar-copyright" title={`Build Date: ${buildDate}`}>&copy;2024 Kodie Grantham</span>
      </div>
    </div>
  )
}

export default App