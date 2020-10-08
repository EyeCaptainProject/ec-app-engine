import { ECApp } from "../src/ECApp";
import  { join } from 'path';

/*
test('TestClassTest', done => {
    const test = new ECApp(5);
    expect(test.theNumber).toBe(5);
    done();
});
*/


let instance: ECApp;

test('Get Instance', async done =>{
    console.log(__dirname);
    const path = join(__dirname, '/TestApp/tests/TestApp/TestApp.js');
    instance = await ECApp.getInstanceOf('TestApp', path);
    done();
});
