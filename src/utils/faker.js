import { faker } from "@faker-js/faker";

export function generateMockProduct() {
  return {
    status: true,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    price: faker.commerce.price({ min: 100 }),
    stock: faker.number.int({ max: 500 }),
    category: faker.commerce.department(),
    thumbnails: Array.from({ length: 3 }, () => faker.image.url()),
  };
}

export function generateMockCart() {
  return {
    user: faker.database.mongodbObjectId(),
    products: [],
  };
}
