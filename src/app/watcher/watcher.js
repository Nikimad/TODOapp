export default (obj, handler) => new Proxy(obj, {
    set: (target, prop, value) => {
        if (Reflect.set(target, prop, value, obj)) {
            handler();

            return true;
        }

        throw new Error("Value hasn't been set");
    }
});