import { HashMap } from "./classes/hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("--------------------");
console.log(test.entries());
console.log("length: " + test.length());
console.log("capacity: " + test.capacity);

test.set("apple", "green");
test.set("banana", "brown");
test.set("carrot", "purple");
test.set("dog", "black");

console.log("--------------------");
console.log(test.entries());
console.log("length: " + test.length());
console.log("capacity: " + test.capacity);

test.set("moon", "silver");

console.log("--------------------");
console.log(test.entries());
console.log("length: " + test.length());
console.log("capacity: " + test.capacity);

test.set("frog", "yellow");
test.set("grape", "green");
test.set("hat", "blue");
test.set("ice cream", "pink");

console.log("--------------------");
console.log(test.entries());
console.log("length: " + test.length());
console.log("capacity: " + test.capacity);

console.log("--------------------");
console.log("get ice cream: " + test.get("ice cream"));
console.log("has ice cream: " + test.has("ice cream"));
console.log("remove ice cream: " + test.remove("ice cream"));
console.log("length: " + test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();

console.log("--------------------");
console.log(test.entries());
console.log("length: " + test.length());
console.log("capacity: " + test.capacity);