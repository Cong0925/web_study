# arr_deduplication
Import module command: **npm i arr_deduplication**

Introduction: This module can help you quickly deduplicate arrays,  
The data types of deduplicated array contents include:   
number  
string  
boolean  
undefined  
null  
array  
object

# Usage
Specific usage method:  
```
  const {arrDeduplication} = require('arr_deduplication')
  const array = ['aa','aa','cc','ss','cc','ds','asd','asd','asd','asd','das'];
  //const array = [
    //{id:1,name:'aa'},
    //{id:1,name:'bb'},
    //{id:3,name:'aa'},
    //{id:2,name:'bb'},
    //'aa','aaa','aa',
    //1,1,1,2,3,
    //null,null,'null',
    //undefined,undefined,'undefined',
    //[1,2,3],[1,2,3],[1,2],
    //true,true,false,false
  //]
  const uniqueArray = arrDeduplication(array,'name');
  console.log(uniqueArray);
```
You can also directly go to folder **node_modules/arr_deduplication** to find file **example.js** and see how to use it