import { TestClass } from "../src/TestClass";

test('TestClassTest', done => {
    const test = new TestClass(5);
    expect(test.theNumber).toBe(5);
    done();
});



