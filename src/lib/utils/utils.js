export function isClass(v) {
    if (typeof v !== 'function') {
        return false;
    }
    try {
        v();
        return false;
    } catch (error) {
        if (/^Class constructor/.test(error.message)) {
            return true;
        }
        return false;
    }
}