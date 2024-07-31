import {
  useEffect,
  useRef
} from 'react'

import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

import { FaFile } from 'react-icons/fa'

import ProjectView from './ProjectView.js'

function ProjectsView({ title, projects }) {
  const routes = projects.map(project => Object({
    slug: project.id,
    title: project.name ?? project.id,
    path: project.id,
    element: <ProjectView title={title} project={project} />
  }))

  const contentRef = useRef(null)

  const location = useLocation()
  const pathParts = location.pathname.replace(/^\/|\/$/g, '').split('/')
  const currentProject = pathParts.length > 1 ? pathParts[pathParts.length - 1] : null

  useEffect(() => {
    contentRef.current.scrollTop = 0
  }, [location])

  return (
    <>
      <div className={`side-navigation ${currentProject ?? 'root'}-project-view`}>
        <ul className="nav-items">
          {routes.map((r, i) =>
            <li key={`side-nav-item-${r.slug}`} id={`side-nav-item-${r.slug}`}>
              <NavLink to={r.path.replace(/\/\*$/, '')}>
                <FaFile />
                <span>{r.title}</span>
              </NavLink>
            </li>
            )}
        </ul>
      </div>
      <div className="content" ref={contentRef}>
        <Routes>
          <Route key="root-child-route" path="/" element={window.innerWidth >= 768 ? <Navigate to={routes[0].path} replace /> : <></>}/>
          {routes.map((r, i) =>
            <Route key={`child-route-${r.id}`} path={r.path} element={r.element} />
          )}
          <Route key={routes.length} path="*" element={<Navigate to={routes[0].path} replace />}/>
        </Routes>
      </div>
    </>
  )
}

export default ProjectsView