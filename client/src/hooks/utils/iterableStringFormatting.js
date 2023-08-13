export const getIterableFormattedValue = (value, isRemove) => {
    if (/[^A-Za-zА-Яа-я0-9,-.\s]/.test(value)) return;
    if (!/^[a-zA-Zа-яА-Я]/.test(value) && value !== "") return;

    if (/\s,/.test(value)) return;
    if (/,\s,/.test(value)) return;

    if (/,$/.test(value) && isRemove) {
        value = value.slice(0, -1);
    }
    if (/,$/.test(value) && !isRemove) {
        value += " ";
    }

    value = value
        ? value.split(", ").reduce((accumulator, currentValue) => {
              if (currentValue !== "") {
                  accumulator =
                      accumulator +
                      (accumulator && ", ") +
                      currentValue[0].toUpperCase() +
                      currentValue.slice(1);
              } else {
                  accumulator += ", ";
              }
              return accumulator;
          }, "")
        : "";

    return value;
};
