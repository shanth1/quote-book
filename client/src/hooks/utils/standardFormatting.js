export const getStandardFormattedValue = (value, previousSymbol, isRemove) => {
    if (!/[A-Za-zА-Яа-я0-9,?!-_\s]/.test(value.at(-1))) return;
    if (previousSymbol === "," && value.at(-1) === ",") return;
    if (previousSymbol === " " && value.at(-1) === " ") return;
    if (previousSymbol === " " && value.at(-1) === "," && !isRemove) return;

    if (previousSymbol === " " && isRemove) {
        value = value.slice(0, -1);
    }

    if (value.at(-1) === "," && !isRemove) {
        value += " ";
    }

    value = value
        ? value.split(", ").reduce((accumulator, currentValue) => {
              if (currentValue !== "") {
                  accumulator =
                      accumulator +
                      (accumulator && ", ") +
                      currentValue[0].toUpperCase() +
                      currentValue.slice(1).toLowerCase();
              } else {
                  accumulator += ", ";
              }
              return accumulator;
          }, "")
        : "";

    return value;
};
