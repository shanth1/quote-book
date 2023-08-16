export const isEqualObject = (obj1, obj2) => {
    if (!obj1 || !obj2) return false;
    for (var p in obj1) {
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
        if (obj1[p] !== obj2[p]) return false;
    }
    return true;
};
