export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Backend CoderHouse",
      version: "1.0.0",
      description:
        "This project, created by [Tomás Echeveste Arteaga](https://github.com/Faradar), is a comprehensive solution developed for the backend course at CoderHouse . You can find more about it [here](https://github.com/Faradar/Entrega-Final-Backend-Tomas-Echeveste-Arteaga).\n\n" +
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
