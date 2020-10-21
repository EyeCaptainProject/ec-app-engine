import "reflect-metadata";

// Storing config files: https://www.electronjs.org/docs/api/app#appgetpathname

/*

Class decorator that overrides the constructor

function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}
*/


export class ECAppEngineConfig {

    /**
     * Singleton pattern
     */
    private static instance: ECAppEngineConfig;
    public static getInstance(): ECAppEngineConfig{
        if (!ECAppEngineConfig.instance){
            ECAppEngineConfig.instance = new ECAppEngineConfig();
        }
        return ECAppEngineConfig.instance;
    }


    constructor(){

    }



}
