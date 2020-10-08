export interface AppConfig {
    name: number
}

export interface LauncherIconConfig {
    backgroundColor: string;
    icon: string;
}


export class ECAppConfig{

    name: string;
    contactEmail: string;
    launcherIcon: LauncherIconConfig;


    private static assertKey(object: any, key: string): any{
        let currentObject = object;
        for (let subkey of key.split('.')){
            if (!(subkey in currentObject)) {
                throw new Error(`Key ${key} does not exist on ${typeof currentObject}`);
            }
            currentObject = currentObject[subkey];
        }
        return currentObject;
    }

    static fromJson(config: any): ECAppConfig{
        const instance = new ECAppConfig();

        try{
            instance.name = this.assertKey(config, 'name')
        } catch (e) {
            console.error(e)
        }

        return instance
    }
}
