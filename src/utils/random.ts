export function randomSix(){
    let rand = "";
    for(let i = 0; i < 6; ++i){
      const a = Math.floor(Math.random() * 10);
    
      rand += `${a}`;
    }; 
    return rand;
}