# Project Backend CoderHouse

> This project is an e-commerce API, developed as part of a backend development course at CoderHouse. It focuses on NoSQL databases and REST API creation, utilizing technologies such as Node.js, Express, MongoDB, and WebSockets for real-time chat functionality. The project aims to provide a comprehensive buying experience, including user registration, product browsing, cart management, and checkout.

> Main website [_here_](pf-backend-faradar.koyeb.app/).
> Documentation [_here_](https://pf-backend-faradar.koyeb.app/api/docs/).
> Chat, which requires you to be logged in first to use, [_here_](https://pf-backend-faradar.koyeb.app/chat).

## Table of Contents

- [General Info](#general-info)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Features](#features)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Info

This project is a fully functioning e-commerce website, designed to facilitate the buying process for products. It includes a simple frontend and robust backend functionalities such as user registration, login, product browsing, cart management, and checkout. The project also features admin capabilities for managing users, including the ability to delete users, assign premium status, and check user details. Additionally, it incorporates a real-time chat functionality using WebSockets and provides comprehensive API documentation with Swagger. The project was primarily conceived as a learning experience, focusing on backend development, NoSQL databases, and REST API creation.

The application focuses on its backend, with the views and frontend serving primarily to demonstrate its functionality. These elements are kept minimal to maintain a focus on the backend's capabilities.

The project leverages Node.js and Express to create a robust API, utilizing JavaScript for server-side logic, CSS for styling, and Handlebars for dynamic HTML rendering. MongoDB serves as the database, with Mongoose providing an elegant solution to model application data. The project integrates authentication and authorization using Passport and JWT, ensuring secure access to user-specific data. Cookies and the Cookie Parser middleware are used for session management, while bcrypt is employed for password hashing.

For logging, the application uses Winston, providing detailed insights into the application's runtime behavior. Additionally, the project includes mailing capabilities with Nodemailer, utilizes Faker for generating mock data, and employs Jest and SuperTest for thorough testing, ensuring the reliability and stability of the backend services.

The project's API documentation is powered by Swagger, offering a comprehensive overview of the API's capabilities and endpoints. This documentation is accessible [_here_](https://pf-backend-faradar.koyeb.app/api/docs/).

## Architecture

The application follows the Model-View-Controller (MVC) design pattern, where the modules within the project are separated by "layers". These layers include:

- Router: Handles the routing of requests to the appropriate controller.
- Controller: Manages the application's logic and interacts with the service layer.
- Service: Contains the business logic and interacts with the Data Access Object (DAO) layer.
- DAO: Responsible for data persistence, following the factory pattern.

Within the persistence layer, the DAO is structured to follow the factory pattern, providing a flexible way to manage data access. Additionally, Data Transfer Objects (DTOs) from the DAO follow the repository pattern, offering a structured approach to data management and retrieval.

This layered architecture, combined with the MVC pattern, ensures a clear separation of concerns, making the application easier to maintain and extend.

## Technologies

Project is built using:

- NodeJS
- FileSystem
- ExpressJS - version 4.18.2
- Handlebars - version 7.1.2
- Socket.io - version 4.7.2
- Toastify
- connect-mongo - version 5.1.0
- Mongoose - version 8.0.1
- mongoose-paginate-v2 - version 1.7.4
- cookie-parser - version 1.4.6
- express-session - version 1.17.3
- bcrypt - version 5.1.1
- Passport - version 0.7.0
- passport-local - version 1.0.0
- passport-google-oauth20 - version 2.0.0
- passport-github2 - version 0.1.12
- JWT - version 9.0.2
- dotenv - version 16.3.1
- nodemailer - version 6.9.9
- faker-js - version 8.4.0
- winston - version 3.11.0
- uuid - version 9.0.1
- swagger-jsdoc - version 6.2.8
- swagger-ui-express - version 5.0.0
- Jest - version 29.7.0
- supertest - version 6.3.4

## Features

- Full buyer experience including user registration, login, product browsing, cart management, checkout and ticket
- Premium user capabilities to create and delete products
- Admin functionalities to manage users, including deletion, role assignment, and premium status changes
- Password reset functionality with email verification
- Real-time chat functionality using WebSockets
- Comprehensive API documentation with Swagger

## Usage

Users can navigate to the main site, register, and log in to browse products, add them to their cart, and proceed to checkout. Admins can log in with special credentials to manage users and products. The chat functionality is available to logged-in users.

## Project Status

Project is: _Finished_

The project is now complete. It was primarily conceived as a learning experience, focusing on backend development, NoSQL databases, and REST API creation. While there are areas for improvement, such as enhancing documentation, frontend development, and optimizing session management, the project's primary goal was to learn and apply new skills. Therefore, no further development is planned at this time.

## Room for Improvement

- Documentation could be enhanced.
- The frontend could be improved for a better user experience.
- Consider fully replacing Passport with JWT in some cases.
- Improve validations using specific libraries.

## Acknowledgements

- Many thanks to Coderhouse for its course.

## Contact

Created by <a href="https://github.com/faradar" target="_blank" rel="noopener">Tomás Echeveste Arteaga</a> - feel free to contact me at <echeveste.t@gmail.com>
