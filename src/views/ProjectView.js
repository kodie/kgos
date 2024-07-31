import { Helmet } from 'react-helmet-async'

function ProjectView({ title, project }) {
  return (
    <div className="project-content">
      <Helmet>
        <title>{project.name ?? project.id} - {title}</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <h1>{project.name ?? project.id}</h1>
      {project.description &&
        <p className="project-description">{project.description}</p>
      }
      {project.url &&
        (Array.isArray(project.url) ? project.url : [project.url]).map((url, i) =>
          <div key={`project-url-${i}`} className="project-url"><a href={url} target="_blank" rel="noreferrer">{url}</a></div>)
      }
      {project.info &&
        (Array.isArray(project.info) ? project.info : [project.info]).map((info, i) => typeof info !== 'object' ? Object({ info }) : info).map((info, i) =>
          <div key={`project-info-${i}`} className="project-info">
            {info.heading ? <h4>{info.heading}</h4> : <></>}
            {info.info ? <p>{info.info}</p> : <></>}
            {info.list ? <ul>{info.list.map((item, j) => <li key={`project-info-${i}-list-item-${j}`}>{item}</li>)}</ul> : <></>}
          </div>
        )
      }
      {project.languages &&
        <>
          <h4>Languages</h4>
          <ul className="project-languages">
            {project.languages.map((language, i) =>
              <li key={`project-lang-${i}`} className={`lang-${language.toLowerCase().replace(' ', '-').replace(/[^0-9a-z-]/gi, '')}`}>{language}</li>)}
          </ul>
        </>
      }
      {project.technologies &&
        <>
          <h4>Technologies</h4>
          <ul className="project-technologies">
            {project.technologies.map((technology, i) =>
              <li key={`project-tech-${i}`} className={`tech-${technology.toLowerCase().replace(' ', '-').replace(/[^0-9a-z-]/gi, '')}`}>{technology}</li>)}
          </ul>
        </>
      }
      {project.tags &&
        <>
          <h4>Tags</h4>
          <ul className="project-tags">
            {project.tags.map((tag, i) =>
              <li key={`project-tag-${i}`} className={`tag-${tag.toLowerCase().replace(' ', '-').replace(/[^0-9a-z-]/gi, '')}`}>{tag}</li>)}
          </ul>
        </>
      }
    </div>
  )
}

export default ProjectView