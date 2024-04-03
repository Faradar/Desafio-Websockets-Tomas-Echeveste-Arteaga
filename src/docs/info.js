export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Backend CoderHouse",
      version: "1.0.0",
      description:
        "This project is a comprehensive backend solution developed for the backend course at CoderHouse created by [Tomás Echeveste Arteaga](https://github.com/Faradar). You can find more about it [here](https://github.com/Faradar/Entrega-Final-Backend-Tomas-Echeveste-Arteaga).\n\n" +
        "It leverages Node.js and Express to create a robust API, utilizing JavaScript for server-side logic, CSS for styling, and Handlebars for dynamic HTML rendering. The application incorporates advanced features such as real-time communication via WebSockets, and a chat functionality.\n\n" +
        "MongoDB serves as the database, with Mongoose providing an elegant solution to model application data. The project also integrates authentication and authorization using Passport and JWT, ensuring secure access to user-specific data. Cookies and the Cookie Parser middleware are used for session management, while bcrypt is employed for password hashing.\n\n" +
        "For logging, the application uses Winston, providing detailed insights into the application's runtime behavior. Additionally, the project includes mailing capabilities with Nodemailer, utilizes Faker for generating mock data, and employs Jest and SuperTest for thorough testing, ensuring the reliability and stability of the backend services.\n\n" +
        "Some useful links:\n" +
        "- [The Project's repository](https://github.com/Faradar/Entrega-Final-Backend-Tomas-Echeveste-Arteaga)\n" +
        "- [The Project's chat](https://pf-backend-faradar.koyeb.app/chat) (requires to be logged in to use)\n" +
        "- [The Project's main page](https://pf-backend-faradar.koyeb.app/)",
      contact: {
        name: "Tomás Echeveste Arteaga",
        email: "echeveste.t@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        description: "Development server",
      },
    ],
  },
  apis: [
    "./src/docs/products/*.yml",
    "./src/docs/carts/*.yml",
    "./src/docs/users/*.yml",
  ],
};
