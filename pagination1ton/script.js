const numbers=Array.from({length:50},(_,i)=>i+1); //used to print array 1 to 50
console.log(numbers);

let currentPage=1;
const itemPerpage=10;

const pageContent=document.getElementById('pageContent');
const prevButton=document.getElementById('prevButton');
const nextButton=document.getElementById('nextButton');
const pageNumber=document.getElementById('pageNumber');

function displayNumbers(){
    const startIndex = (currentPage-1)*itemPerpage;
    const endIndex= startIndex +itemPerpage;
    const currentItems=numbers.slice(startIndex,endIndex);

    pageContent.textContent=currentItems.join(", ");

    pageNumber.textContent=`page ${currentPage}`;

    prevButton.disabled=currentPage===1;
    nextButton.disabled=currentPage===Math.ceil(numbers.length/itemPerpage);
}

prevButton.addEventListener('click',()=>{
    if(currentPage > 1){
        currentPage--;
        displayNumbers();
    }
});

nextButton.addEventListener('click',()=>{
    if(currentPage < Math.ceil(numbers.length/itemPerpage)){
        currentPage++;
        displayNumbers();
    }
});

displayNumbers();