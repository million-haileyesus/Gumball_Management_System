// About.js
import React from 'react';
import './Styles/About.css';
import './static/images/squareGundam.jpg';

const About = () => {
    return (
        <section id="about">
            <h2>What We're About!</h2>
            <section id="aboutContent">
                <div id='aboutText'>
                    <p>
                    The Gundam Management System is a React application that leverages a variety of modern web technologies for its development and deployment.
                    </p>
                    
                    <p>
                    React: This is the primary library used for building the user interface of the application. It allows for the creation of reusable UI components and manages the state of the application.
                    </p>
                    
                    <p>
                    MongoDB: This is the database used for storing and retrieving data. It’s a NoSQL database, which provides high performance, high availability, and easy scalability.
                    </p>

                    <p>
                    Docker: This is used to containerize the application, making it easier to create, deploy, and run applications by using containers.
                    </p>

                    <p>
                    Nginx: This is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. In this project, it’s likely used to serve the static files of the React application and to proxy the API requests to the Node.js server.
                    </p>
                    
                    <p>
                    Node.js: This is the runtime environment for executing JavaScript code server-side. It’s used for building the backend of the application, likely providing an API for the React application to interact with.
                    </p>

                    <p>
                    HTML, CSS, and JavaScript: These are the core technologies for building Web pages. HTML provides the structure of the page, CSS the (visual and aural) layout, for a variety of devices, and JavaScript the behavioral layer of the application.

                    </p>
                </div>
                <img
                    src="https://i0.wp.com/resurfacetoreality.com/wp-content/uploads/2021/02/img_3455.jpg?resize=1100%2C1467&ssl=1"
                    alt="A giant gundam giving the thumbs up">
                </img>
              
            </section>
        </section>
    );
}

export default About;
