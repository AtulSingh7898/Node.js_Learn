// curring -> curring the the function programing technique and tranform each of 
//function as an taking single argument with the nested sequence function 

function f(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(f(4)(6)(8))
let result = f(1);
let result1 = result(2);
let result2 = result1(3);
console.log(result2)

a = 10;

(function fs1(){
    console.log(a)
})();



// delet duplicate from array 

let arr = [1,2,3,5,4,7,8,3,2,5,4];
let arr2 = [];
let arr3 = [];

for(let i = 0; i < arr.length; i++){
    let check = true;
   for(let j = i+1; j < arr.length; j++){
    if(arr[i] === arr[j]){
        check = false;
    }
  }
  if(check){
    arr2.push(arr[i]);
  }

}

console.log(arr2)
// console.log(arr3)

// for(let i = 0; i < arr.length; i++){
//     console.log(arr2[i])
// }

