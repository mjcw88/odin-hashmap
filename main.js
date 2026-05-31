import { HashMap } from "./classes/hashmap.js";
import { HashSet } from "./classes/hashset.js";

const hashMap = new HashMap();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");

console.log("--------------------");
console.log("HashMap Testing");

console.log("--------------------");
console.log(hashMap.entries());
console.log("length: " + hashMap.length());
console.log("capacity: " + hashMap.capacity);

hashMap.set("apple", "green");
hashMap.set("banana", "brown");
hashMap.set("carrot", "purple");
hashMap.set("dog", "black");

console.log("--------------------");
console.log(hashMap.entries());
console.log("length: " + hashMap.length());
console.log("capacity: " + hashMap.capacity);

hashMap.set("moon", "silver");

console.log("--------------------");
console.log(hashMap.entries());
console.log("length: " + hashMap.length());
console.log("capacity: " + hashMap.capacity);

hashMap.set("frog", "yellow");
hashMap.set("grape", "green");
hashMap.set("hat", "blue");
hashMap.set("ice cream", "pink");

console.log("--------------------");
console.log(hashMap.entries());
console.log("length: " + hashMap.length());
console.log("capacity: " + hashMap.capacity);

console.log("--------------------");
console.log("get ice cream: " + hashMap.get("ice cream"));
console.log("has ice cream: " + hashMap.has("ice cream"));
console.log("remove ice cream: " + hashMap.remove("ice cream"));
console.log("length: " + hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

hashMap.clear();

console.log("--------------------");
console.log(hashMap.entries());
console.log("length: " + hashMap.length());
console.log("capacity: " + hashMap.capacity);

const hashSet = new HashSet();

hashSet.set("apple");
hashSet.set("banana");
hashSet.set("carrot");
hashSet.set("dog");
hashSet.set("elephant");
hashSet.set("frog");
hashSet.set("grape");
hashSet.set("hat");
hashSet.set("ice cream");
hashSet.set("jacket");
hashSet.set("kite");
hashSet.set("lion");

console.log("--------------------");
console.log("HashSet Testing");

console.log("--------------------");
console.log(hashSet.keys());
console.log("length: " + hashSet.length());
console.log("capacity: " + hashSet.capacity);

hashSet.set("moon");

console.log("--------------------");
console.log(hashSet.keys());
console.log("length: " + hashSet.length());
console.log("capacity: " + hashSet.capacity);

console.log("--------------------");
console.log("has ice cream: " + hashSet.has("ice cream"));
console.log("remove ice cream: " + hashSet.remove("ice cream"));
console.log("length: " + hashSet.length());
console.log(hashSet.keys());

hashSet.clear();

console.log("--------------------");
console.log(hashSet.keys());
console.log("length: " + hashSet.length());
console.log("capacity: " + hashSet.capacity);