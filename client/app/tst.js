function insert(value) {
    return {into: function (array) {
        return {after: function (afterValue) {
            array.splice(array.indexOf(afterValue) + 1, 0, value);
            return array;
        }};
    }};
}

console.log(insert(2).into([1, 3]).after(1)); //[1, 2, 3]

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue) + 1, 0, value);
    return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]