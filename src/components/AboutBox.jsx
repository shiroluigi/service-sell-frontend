import "../assets/AboutBox.css";

const AboutBox = () => {
  return (
    <>
      <div className="container">
        <div className="centeredContainer">
          <h1>About Me</h1>

          <p>
            Hello! I'm <strong>Rohit Mondal</strong>, a full-stack software engineer
            passionate about building scalable applications, solving real-world problems,
            and delivering clean, maintainable software. I specialize in
            <strong> Java (Spring Boot)</strong>, <strong>React.js</strong>,
            <strong> Python (Django)</strong>, and <strong>Docker</strong>, with
            hands-on experience working on production-grade systems across backend,
            frontend, and DevOps.
          </p>

          <p>
            I enjoy transforming ideas into reliable digital solutions — whether it’s
            architecting backend systems, creating dynamic UI experiences, or improving
            existing products with performance-focused enhancements.
          </p>

          <h2>Education</h2>
          <ul>
            <li>
              <strong>B.Sc. Computer Science (Hons.)</strong> — St. Xavier’s College,
              Kolkata (2021–2024)
            </li>
            <li>
              <strong>ISC Board (High School)</strong> — St. Stephen’s School, Kolkata
            </li>
          </ul>

          <h2>Technical Skills</h2>
          <ul>
            <li>Java (Spring Boot), Python (Django, PySpark)</li>
            <li>JavaScript (React.js), HTML, CSS</li>
            <li>SQL, C, C++</li>
            <li>Apache Spark</li>
            <li>Git, Docker</li>
          </ul>

          <h2>Professional Experience</h2>

          <h3>Software Engineer — Kreative Chimp (Oct 2024 – June 2025)</h3>
          <ul>
            <li>
              Built and maintained responsive, scalable web applications using Spring Boot,
              Docker, Python (Django), and React.js.
            </li>
            <li>
              Conducted client meetings to translate requirements into technical solutions.
            </li>
            <li>Led team members, assigned tasks, and ensured timely delivery.</li>
          </ul>

          <h3>R&D Trainee — Skill Academia (May 2022 – July 2022)</h3>
          <ul>
            <li>Developed responsive websites using Vanilla JavaScript and CSS.</li>
            <li>
              Researched and assisted in integrating secure and efficient payment gateways.
            </li>
          </ul>

          <h3>Beta Tester — Divitira Enterprises (Jan 2023 – July 2023)</h3>
          <ul>
            <li>Worked with the game testing team to identify bugs and report issues.</li>
            <li>Managed a team to ensure efficient testing and documentation.</li>
          </ul>

          <h2>Projects</h2>
          <h3>Company Projects (Kreative Chimp)</h3>
          <ul>
            <li>CMS Website for the company</li>
            <li>E-commerce website</li>
            <li>Bluechip Real Estate CRM (Spring Boot)</li>
            <li>Sri-Ramanuja Vani website (Django + Vanilla JS)</li>
            <li>Official Company Home Website</li>
            <li>Product management & analytics web app</li>
          </ul>

          <h3>Personal Projects</h3>
          <ul>
            <li>
              <strong>Point & Shoot Game (C++ with SFML)</strong> — Game state systems,
              menus, AABB collision, shooting physics, memory optimization.
            </li>
            <li>
              <strong>Pathfinding Visualizer (C++ with SFML)</strong> — Real-time BFS &
              A* visualization with clean data structures.
            </li>
            <li>
              <strong>Rust Compression Tool</strong> — File/folder compression using
              flate2 & tar.
            </li>
          </ul>

          <h2>Certifications</h2>
          <ul>
            <li>
              <strong>Ethical Hacking</strong> — Indian School of Ethical Hacking (ISOEH)
            </li>
            <li>JLPT N5, N4</li>
          </ul>

          <h2>Languages</h2>
          <ul>
            <li>English</li>
            <li>Bengali</li>
            <li>Hindi</li>
            <li>Japanese</li>
          </ul>

          <h2>Links</h2>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/rohitmondal200/" target="_blank">
                LinkedIn Profile
              </a>
            </li>
            <li>
              <a href="https://github.com/shiroluigi" target="_blank">
                GitHub Profile
              </a>
            </li>
          </ul>

          <h2>Let’s Connect</h2>
          <p>
            I'm always open to new opportunities, collaborations, and exciting projects.
            If you need a dedicated full-stack engineer with a strong technical foundation,
            feel free to reach out!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutBox;
