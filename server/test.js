

str = "aiueo\n"

console.log(endLineDeteler(str));


const endLineDeteler = (str) => {
  newstr = str;
  
  while(newstr.endsWith('\n')){
    console.log(newstr);
    newstr = newstr.slice(0,newstr.length - 1);
  }

  return newstr;
}