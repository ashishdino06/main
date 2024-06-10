const textareaE = document.getElementById("textarea");

const totalCounterEl = document.getElementById("total-counter")


textareaE.addEventListener("keyup",()=>{
    updateCounter()
    // console.log("Key is pressed");
})

function updateCounter(){
    totalCounterEl.innerText=textareaE.value.length;
};



