const AppServiceMock = () => ({
    getHello: jest.fn(() => Promise.resolve("Hello World")),
});

export default AppServiceMock;
