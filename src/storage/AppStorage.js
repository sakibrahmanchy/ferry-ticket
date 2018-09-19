import {
    AsyncStorage,
} from 'react-native';

const AppStorage = (function () {
    let instance;
 
    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }

    return {
        putItem(key, value) {
            this.getInstance();
            AsyncStorage.setItem(key, value);
        },
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default AppStorage;
