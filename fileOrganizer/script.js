const fileIcons = {
    txt: 'https://via.placeholder.com/200?text=TXT',
    pdf: 'https://via.placeholder.com/200?text=PDF',
    mp3: 'https://via.placeholder.com/200?text=MP3',
    exe: 'https://via.placeholder.com/200?text=EXE',
    rar: 'https://via.placeholder.com/200?text=RAR',
    docx: 'https://via.placeholder.com/200?text=DOCX',
    jpg: 'https://via.placeholder.com/200?text=JPG',
    png: 'https://via.placeholder.com/200?text=PNG',
    gif: 'https://via.placeholder.com/200?text=GIF',
    zip: 'https://via.placeholder.com/200?text=ZIP',
};

const files1 = [
    'document1.txt', 'presentation1.pdf', 'song1.mp3', 'installer1.exe',
    'archive1.rar', 'report1.docx', 'image1.jpg', 'graphic1.png', 'animation1.gif',
    'compressed1.zip', 'document2.txt', 'presentation2.pdf', 'song2.mp3', 'installer2.exe',
    'archive2.rar', 'report2.docx', 'image2.jpg', 'graphic2.png', 'animation2.gif', 'compressed2.zip',
    null, 'presentation3.pdf', '', 'installer3.exe', 'archive3.rar', 'report3.docx', 'image3.jpg',
    'graphic3.png', 'animation3.gif', 'compressed3.zip', 'document4.txt', 'presentation4.pdf',
    'song4.mp3', 'installer4.exe', 'archive4.rar', 'report4.docx', 'image4.jpg', 'graphic4.png',
    'animation4.gif', 'compressed4.zip', 'document5.txt', 'presentation5.pdf', 'song5.mp3', 'installer5.exe',
    'archive5.rar', 'report5.docx', 'image5.jpg', 'graphic5.png', 'animation5.gif', 'compressed5.zip',
    'document6.txt', 'presentation6.pdf', 'song6.mp3', 'installer6.exe', 'archive6.rar', 'report6.docx',
    'image6.jpg', null, 'animation6.gif', 'compressed6.zip', 'document7.txt', 'presentation7.pdf', 'song7.mp3',
    'installer7.exe', 'archive7.rar', 'report7.docx', 'image7.jpg', 'graphic7.png', 'animation7.gif', 'compressed7.zip',
    'document8.txt', 'presentation8.pdf', 'song8.mp3', 'installer8.exe', 'archive8.rar', 'report8.docx', 'image8.jpg',
    '', 'animation8.gif', 'compressed8.zip', 'document9.txt', 'presentation9.pdf', 'song9.mp3', 'installer9.exe',
    'archive9.rar', 'report9.docx', 'image9.jpg', '', 'animation9.gif', 'compressed9.zip', 'document10.txt',
    'presentation10.pdf', 'song10.mp3', 'installer10.exe', 'archive10.rar', 'report10.docx',
    'image10.jpg', 'graphic10.png', 'animation10.gif', 'compressed10.zip',
];

function cleanFiles(files1){
    var validFiles=[];
    for (var i=0;i<files1.length;i++){
        var file=files1[i];
        if(file && file.includes('.')){
            var parts=file.split('.');
            validFiles.push({name:parts[0],type:parts[1]});
        }
    }
    return validFiles;
}

var files=cleanFiles(files1);

//save to local storage
function saveToLocalStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));

}

saveToLocalStorage('files',files);

//get form local storage
function getFromLocalStorage(key){
    var data =localStorage.getItem(key);
    return data ? JSON.parse(data):[];
}

var savedFiles=getFromLocalStorage('files');
var bin=getFromLocalStorage('bin') || [];
//categorized function
function categorizedFiles(files){
    var categorized={};

    for(var i=0 ;i<files.length;i++){
        var file=files[i];
        if(!categorized[file.type]){
            categorized[file.type]=[];
        }
        categorized[file.type].push(file);
    }
    return categorized;
}

var categorizedFiles=categorizedFiles(savedFiles);

function displayFolders(){
    var folderContainer=document.getElementById('folders');
    folderContainer.innerHTML='';

    for(var folder in categorizedFiles){
        var folderDiv = document.createElement('div');
        folderDiv.className='folder';
        folderDiv.textContent=folder.toUpperCase();
        
        folderDiv.addEventListener('click',(function(folderName){
            return function(){
                displayFiles(folderName);
            };
        })(folder));
        folderContainer.appendChild(folderDiv);
    }
}
var ascendingOrder=true;
//display files
function displayFiles(folder){
    var filesContainer=document.getElementById('files');
    var sortbtn=document.getElementById('sortbtn')
    filesContainer.innerHTML="";
    sortbtn.innerHTML="";
    var files=categorizedFiles[folder];

    files.sort(function(a,b){
        return ascendingOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    var sortToggleBtn=document.createElement('button');
    sortToggleBtn.textContent="Sort: " + (ascendingOrder ? 'Ascending' : 'descending');
    sortToggleBtn.style.marginBottom='10px';
    sortToggleBtn.addEventListener('click',function(){
        ascendingOrder=!ascendingOrder;
        displayFiles(folder);
    });
    sortbtn.appendChild(sortToggleBtn);


    for(var i=0;i<files.length;i++){
        var file=files[i];
        var fileDiv=document.createElement('div');
        fileDiv.className='file';
        fileDiv.innerHTML=`
            <p>${file.name}</p>
            <img src="${fileIcons[file.type] || 'https://via.placeholder.com/200?text=FILE'}" alt=${file.type}">
            <div>
                <button onclick="editFileName('${file.name}')">Edit</button>
                <button onclick="moveToBin('${file.name}',this)">Add to Bin</button>
            </div>
            
        `;
        filesContainer.appendChild(fileDiv);

    }
}

function moveToBin(fileName,fileDivElement){
    // fileDivElement.parentNode.removeChild(fileDivElement);
    var filesContainer=fileDivElement.closest('.file');
    filesContainer.remove();
    var fileIndex=files.findIndex(f => f.name ===fileName);
    if(fileIndex > -1){
        var file=files.splice(fileIndex,1)[0];
        bin.push(file);
        saveToLocalStorage('files',files);
        saveToLocalStorage('bin',bin);
        displayFolders();

        displayBin();
    }
}

function displayBin(){
    var binContainer=document.getElementById('binFiles');
    binContainer.innerHTML="";

    bin.forEach((file,index) => {
        var binDiv=document.createElement('div');
        binDiv.className='bin-file';
        binDiv.innerHTML=`
            <p>${file.name}</p>
            <img src="${fileIcons[file.type] || 'https://via.placeholder.com/200?text=FILE'}" alt=${file.type}">
            <div>
                <button onclick="restoreFile('${file.name}')">Restore</button>
                <button onclick="clearBinFile('${index}')">Delete</button>
            </div>
        `;
        binContainer.appendChild(binDiv);
    })
}

function restoreFile(fileName){
    var binIndex=bin.findIndex(f =>f.name===fileName);
    if(binIndex > -1){
        var file=bin.splice(binIndex,1)[0];
        files.push(file);
        saveToLocalStorage('files',files);
        saveToLocalStorage('bin',bin);

        // categorizedFiles=categorizedFiles(files);
        displayFolders();
        displayFiles(file.type);
        displayBin();
    }
}

function clearBinFile(index){
    bin.splice(index,1);
    saveToLocalStorage('bin',bin);
    displayBin();
}

document.getElementById('clearAllBin').addEventListener('click',function(){
    if(confirm('Are You Sure you want delete data permanentaly')){
        bin=[];
        saveToLocalStorage('bin',bin);
        displayBin();
    }
});

document.getElementById('clearAutoBin').addEventListener('click',function(){
    if(confirm('Are u sure u want start "AUTO DELETE"')){
        setTimeout(function(){
            bin=[];
            saveToLocalStorage('bin',bin);
            displayBin();
        },30000);
    }
    
});

document.getElementById('binIcon').addEventListener('click',function(){
    var binContainer=document.getElementById('bin');
    var folderContainer=document.getElementById('folders');
    var filesContainer=document.getElementById('files');
    var container=document.getElementById('container')
    if(binContainer.style.display==='none' || binContainer.style.display === ''){
        binContainer.style.display='block';
        folderContainer.style.display='none';
        filesContainer.style.display='none';
        container.style.display='none';
    }
    else{
        binContainer.style.display='none';
        folderContainer.style.display='flex';
        filesContainer.style.display='flex';
        container.style.display='block';
    }
});

function searchFiles(){
    var searchTerm=document.getElementById('searchInput').value.toLowerCase();
    var filesContainer=document.getElementById('files');

    filesContainer.innerHTML="";

    var allFiles=Object.values(categorizedFiles).flat();
    for(var i=0;i<allFiles.length;i++){
        var file=allFiles[i];
        if(file.name.toLowerCase().includes(searchTerm)){
            var fileDiv=document.createElement('div');
            fileDiv.className='file';
            fileDiv.innerHTML=`
                <p>${file.name}</p>
                <img src="${fileIcons[file.type] || 'https://viaplaceholder.com/100?text=FILE'}" alt=${file.type}">
                <div>
                    <button onclick="editFileName('${file.name}')">Edit</button>
                    <button onclick="moveToBin('${file.name}')">Delete</button>
                </div>
                

            `;
            filesContainer.appendChild(fileDiv);
        }
    }
}

function editFileName(fileName){
    var file =files.find(f=>f.name===fileName);
    if(file){
        var newName=prompt("Edit file name:",file.name);
        if(newName && newName !== file.name){
            var oldName = file.name;
            file.name=newName;
            if (!file.history) {
                file.history = [];
            }

            file.history.push({
                action:'Renamed',
                oldName:oldName,
                newName:newName,
                timestamp:new Date().toLocaleString()
            });
            // console.log(file);

            saveToLocalStorage('files',files);
            displayFolders();
            displayFiles(file.type);
            displayBin();
        }
    }
}

document.getElementById('searchInput').addEventListener('input',searchFiles);
displayFolders();
displayBin();