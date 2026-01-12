import "../assets/MyProjects.css"

const MyProjects = () => {
    const gotoGithub = (link) => {
        window.open(link,"_blank")
    }
    return (
        <div className="cardContainer">
            <h1 className="header">Some technical work done by me...</h1>
            <div className="innerContainer">
                <div className="card">
                    <div className="imageContainer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="" />
                    </div>
                    <div className="textContainer">
                        <h1>Point and Shoot 2D</h1>
                        <p>Simple C++ game made from scratch using SFML. Graphics and Audio pipelines used.</p>
                    </div>
                    <div className="buttonsContainer">
                        <button onClick={() => {gotoGithub("http://www.github.com/shiroluigi")}}>GitHub</button>
                    </div>
                </div>

                <div className="card">
                    <div className="imageContainer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="" />
                    </div>
                    <div className="textContainer">
                        <h1>Path Finding Algorithm Graphical 2D</h1>
                        <p>Simple path A* and BFS Visualizer using C++ and SFML.</p>
                    </div>
                    <div className="buttonsContainer">
                        <button onClick={() => {gotoGithub("http://www.github.com/shiroluigi")}}>GitHub</button>
                    </div>
                </div>

                <div className="card">
                    <div className="imageContainer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="" />
                    </div>
                    <div className="textContainer">
                        <h1>Zip Unzip</h1>
                        <p>File and folder compression and decompression tool using Rust. Used Flate2 and TAR.</p>
                    </div>
                    <div className="buttonsContainer">
                        <button onClick={() => {gotoGithub("http://www.github.com/shiroluigi")}}>GitHub</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProjects;