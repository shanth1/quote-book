export const getColorFromOption = (value, isBright = false) => {
    switch (value) {
        case "Work":
            return isBright ? "bg-red-500" : "bg-red-100";
        case "Education":
            return isBright ? "bg-orange-500" : "bg-orange-100";
        case "Personal":
            return isBright ? "bg-yellow-500" : "bg-yellow-100";
        case "Health":
            return isBright ? "bg-green-500" : "bg-green-100";
        case "Ideas":
            return isBright ? "bg-sky-500" : "bg-sky-100";
        case "Entertainment":
            return isBright ? "bg-indigo-500" : "bg-indigo-100";
        case "Images":
            return isBright ? "bg-violet-500" : "bg-violet-100";
        case "Other":
            return isBright ? "bg-gray-500" : "bg-gray-100";
        default:
            break;
    }
};
