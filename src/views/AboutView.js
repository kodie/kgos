import headshot from '../img/headshot.png'

function AboutView() {
  return (
    <div className="content">
      <img src={headshot} className="headshot" alt="It's me!" />
      <p>Hi there, I'm Kodie—a father, musician, tinkerer, and software engineer. With nearly 20 years of coding experience, including a decade professionally, I've developed websites (both backend and frontend), mobile applications, desktop software, APIs, build tools, plugins, add-ons, you name it.</p>
      <p>When you're passionate about your job, it doesn't feel like work, and I truly love what I do.</p>
    </div>
  )
}

export default AboutView