import "../assets/AboutBox.css"

const AboutBox = () => {
    return (
        <>
            <div className="container">
                <div className="centeredContainer">
                    <h1>About Me</h1>

                    <p>
                        Welcome to my professional space — a platform built to showcase my
                        technical expertise, real-world projects, and the services I offer in
                        modern software development. This website itself reflects how I work:
                        thoughtfully designed, performance-focused, and built using
                        industry-grade technologies like <strong>Spring Boot</strong> on the
                        backend and <strong>React</strong> on the frontend.
                    </p>

                    <p>
                        I am a software engineer with a strong foundation in full-stack
                        development, driven by a passion for building scalable, maintainable,
                        and impactful digital solutions. Over time, I have worked on diverse
                        projects that span backend systems, frontend interfaces, APIs,
                        databases, and cloud-ready architectures. My goal has always been
                        simple:{" "}
                        <strong>
                            turn ideas into reliable software that delivers real value
                        </strong>.
                    </p>

                    <h2>My Technical Philosophy</h2>

                    <p>
                        I believe that good software is not just about writing code — it’s
                        about problem-solving, clarity, and long-term reliability. Every
                        application should be easy to maintain, secure by design, and
                        optimized for both users and businesses.
                    </p>

                    <p>
                        Whether I am designing RESTful APIs in Spring Boot or building
                        interactive user interfaces with React, I focus on clean architecture,
                        performance optimization, security best practices, and user-centric
                        design.
                    </p>

                    <h2>Backend Expertise (Spring Boot & Java)</h2>

                    <p>
                        On the backend, I specialize in Java and Spring Boot, creating robust,
                        production-ready systems. I have experience designing REST APIs,
                        handling authentication and authorization, integrating databases, and
                        implementing scalable business logic.
                    </p>

                    <ul>
                        <li>RESTful API development using Spring Boot</li>
                        <li>Spring Security (JWT, role-based access control)</li>
                        <li>Database design with SQL and NoSQL systems</li>
                        <li>JPA / Hibernate ORM</li>
                        <li>Exception handling and structured logging</li>
                        <li>API documentation and testing</li>
                        <li>Performance tuning and scalability considerations</li>
                    </ul>

                    <h2>Frontend Development (React)</h2>

                    <p>
                        On the frontend, I build modern, responsive, and dynamic user
                        interfaces using React. I focus on creating applications that feel
                        fast, intuitive, and accessible across all devices.
                    </p>

                    <ul>
                        <li>Component-based architecture</li>
                        <li>State management and clean data flow</li>
                        <li>API integration using Axios or Fetch</li>
                        <li>Responsive design for mobile and desktop</li>
                        <li>Reusable and maintainable UI components</li>
                        <li>Performance-optimized rendering</li>
                    </ul>

                    <h2>Full-Stack Integration</h2>

                    <p>
                        One of my key strengths is bridging the gap between frontend and
                        backend. I understand how data flows through the entire system — from
                        database to API to UI — and design applications where all layers work
                        seamlessly together.
                    </p>

                    <p>
                        This allows me to design end-to-end architectures, debug issues across
                        the full stack, optimize client-server communication, and ensure
                        consistent data validation and handling.
                    </p>

                    <h2>Services I Offer</h2>

                    <ul>
                        <li>Full-stack web application development</li>
                        <li>Backend API development using Spring Boot</li>
                        <li>Frontend development with React</li>
                        <li>Enhancement and maintenance of existing projects</li>
                        <li>Bug fixing and performance optimization</li>
                        <li>Authentication and security implementation</li>
                        <li>Technical consulting and architecture guidance</li>
                    </ul>

                    <h2>Why Work With Me?</h2>

                    <ul>
                        <li>Strong technical foundation with modern frameworks</li>
                        <li>Detail-oriented and quality-driven development</li>
                        <li>Clear communication and reliable delivery</li>
                        <li>Business-focused mindset, not just code</li>
                        <li>Commitment to continuous learning and improvement</li>
                    </ul>

                    <h2>Continuous Learning & Growth</h2>

                    <p>
                        Technology evolves rapidly, and I actively invest time in improving my
                        skills and exploring new tools, frameworks, and best practices.
                        Continuous learning allows me to deliver solutions that are modern,
                        secure, and future-ready.
                    </p>

                    <h2>Let’s Build Something Together</h2>

                    <p>
                        This website represents more than just my work — it represents my
                        approach, mindset, and dedication to software engineering. If you are
                        looking for a developer who values clean architecture, scalable
                        systems, and reliable delivery, I would be glad to collaborate.
                    </p>

                    <p>
                        Whether you have a clear idea or just a problem that needs solving,
                        feel free to reach out. Let’s build something meaningful, efficient,
                        and future-ready together.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutBox;