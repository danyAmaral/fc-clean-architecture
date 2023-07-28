import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 123",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is not greater than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = -100;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow();
  });
});
