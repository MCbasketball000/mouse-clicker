function initall(){
    document.body.style.backgroundColor = "#101010";
    CreateElementBy("div",4,0,0,'author','#ffffff',NaN,NaN,'作者：MC篮球');
    CreateElementBy("div",4,0,250,'github','#a8da99',NaN,NaN,'Github');
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//一些乱七八糟的读取
async function initregister()
{
    const response = await fetch("./register/resource.json");
    resourceRegister = await response.json();
    const response2 = await fetch("./lang/zh-cn.json");
    languageRegister = await response2.json();
    const response3 = await fetch("./register/upgrade.json");
    upgradeRegister = await response3.json()
    return 0;
}


function CreateElementBy(type,pos,pos1,pos2,opcode,color,lengthz,widthz,content,postype){
    var newDiv = document.createElement(type);
    console.log(postype);
    if(postype == undefined){
        pos1 = pos1+'px';
        pos2 = pos2+'px';
    }
    else{
        pos1 = pos1+postype;
        pos2 = pos2+postype;
    }
    if(color != undefined){
        newDiv.style.color = color;
    }
    if(content != undefined){
        newDiv.textContent = content;
    }
    else{
        newDiv.textContent = languageRegister[opcode];
    }
    newDiv.style.position = "absolute";
    newDiv.id = opcode;
    //pos：1是左上，2是右上，3是左下，4是右下
    if(pos == 1)
    {
        newDiv.style.top = pos1;
        newDiv.style.left = pos2;
    }
    if(pos == 2)
    {
        newDiv.style.top = pos1;
        newDiv.style.right = pos2;
    }
    if(pos == 3)
    {
        newDiv.style.bottom = pos1;
        newDiv.style.left = pos2;
    }
    if(pos == 4)
    {
        newDiv.style.bottom = pos1;
        newDiv.style.right = pos2;
    }
    if(type == "button")
    {
        console.log('fuck');
        console.log(widthz);
        if(widthz != undefined){
            widthz = widthz+'px';
            newDiv.style.width = widthz;
        }
        if(lengthz != undefined){
            lengthz = lengthz+'px';
            newDiv.style.height = lengthz;
        }
        newDiv.style.height = lengthz;
        newDiv.addEventListener("mouseenter", function(){
            this.classList.add('highlight');
        });
        newDiv.addEventListener("mouseleave", function(){
            this.classList.remove('highlight');
        });
    }
    newDiv.addEventListener("click", function(){
        use(opcode)
    });
    document.body.appendChild(newDiv);
}
function use(opcode){
    if(opcode == 'press'){
        resource['point'] += 1;
        document.getElementById("pointresource").innerHTML=resource['point'];
    }
    if(opcode == 'author'){
        window.open('https://space.bilibili.com/3546613752531863?spm_id_from=333.1369.0.0', '_blank');
    }
    if(opcode == 'github'){
        window.open('https://github.com/MCbasketball000/mouse-clicker', '_blank');
    }
}
function refreshbutton(){
    CreateElementBy("button",1,40,40,'press','#ffffff',200,300,undefined,'%');
    var keys = Object.keys(upgradeRegister);
    keys.forEach(function(key, index) {
        CreateElementBy("button",1,100+index*75,15,key,undefined,45,120)
        console.log(index);
    });
}
function refreshResourse(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        CreateElementBy("div",1,index*35,0,key,resourceRegister[key]['color'])
        CreateElementBy("div",1,index*35,150,key+'resource',resourceRegister[key]['color'],NaN,NaN,0)
        console.log(index);
    });
}
function updateResource(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        document.getElementById(key+'resource').innerHTML=resource[key];
    });
} 
function checkResource(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        if(resource[key] == undefined){
            resource[key] = 0;
        }
    });
}   
function checkUpgrades(){
    var keys = Object.keys(upgrades);
    keys.forEach(function(key, index) {
        if(resource[key] == undefined){
            resource[key] = 0;
        }
    });
}
function addresource(){
    var keys = Object.keys(upgrades);
    keys.forEach(function(key, index) {
        if(upgrades[key] == undefined){
            resource[key] = 0;
        }
    });
}    
async function main(fuck){
    //存档部分（本来想单独写成一个文件的但是不会导入就算了
    function load(){
        haveData = localStorage.getItem("haveData");
        resource = JSON.parse(localStorage.getItem("resource"));
        if(haveData == 'true'){
            checkResource()
        }
        upgrades = JSON.parse(localStorage.getItem("upgrades"));
        if(haveData == 'true'){
            checkUpgrades();
        }
    }
    function save(){
        localStorage.setItem("haveData", haveData);
        localStorage.setItem("resource", JSON.stringify(resource));
        localStorage.setItem("upgrades", JSON.stringify(upgrades));
    }
    function init(){
        haveData = true;
        resource = {};
        checkResource();
        upgrades = {};
        checkUpgrades();
        save();
    }
    load();
    if(haveData != 'true'){
        console.log("fucklocalstorage")
        init();
        console.log(haveData)
    }
    //-------------------------------------------------//

    console.log(fuck);
    
    refreshbutton();
    refreshResourse();
    console.log(resourceRegister);
    while(true){
        addresource()
        updateResource();
        save();
        await wait(1000);
    }
}
async function run(){
    initall();
    const temp = await initregister();
    main(temp);
}
run();