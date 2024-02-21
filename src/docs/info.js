export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Projecto Backend para CoderHouse",
      version: "1.0.0",
      description: "Tecnologías utilizadas: Node, Express, MongoDB",
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
