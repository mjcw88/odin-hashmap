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

console.log(test.hash("Luke"));
console.log(test.hash("Han"));
console.log(test.hash("Leia"));
console.log(test.hash("Anakin"));
console.log(test.hash("Obi Wan"));
console.log(test.hash("Chewbacca"));
console.log(test.hash("R2D2"));
console.log(test.hash("C3PO"));
console.log(test.hash("Jabba"));
console.log(test.hash("Darth Vader"));
console.log(test.hash("Palpatine"));
console.log(test.hash("Lando"));
console.log(test.hash("Wicket"));