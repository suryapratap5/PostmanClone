console.log('this is post master project');

// utility functions:
// 1. Utitlity function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize no of parameters
let addedParamsCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let requestJsonBox = document.getElementById('requestJsonBox')
 
// if the user clicks on params, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block"
})

// if the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', ()=>{
    requestJsonBox.style.display = "block";
    parametersBox.style.display = "none";
})

// if the user clicks on + button add more parameter
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let str = `<div class="row my-2">
                    <label for="urlField" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                    </div>
                    <div class="col-md-1">
                        <button type="button" class="btn btn-primary w-2 deleteParam" style="width : 36px;">-</button>
                    </div>
                </div>`;


        // convert the element string to DOM node 
        let paramElement = getElementFromString(str); 
        params.appendChild(paramElement);
        // Add an event listener to remove the parameter on clicking - button 
        let deleteParam = document.getElementsByClassName('deleteParam');
        for(item of deleteParam){
            item.addEventListener('click', (e)=>{
                
                    e.target.parentElement.parentElement.remove();
                
            })
        }


        addedParamsCount++;

})

// If the user clicks on submit button
let submit = document.getElementById('submit');
// Show please wait in the response box to request patience from the user
submit.addEventListener('click', ()=>{
    // document.getElementById('responseJsonText').value = "Please wait... fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait... fetching response...";

    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    console.log('url', url)
    console.log('requestType', requestType)
    console.log('contentType', contentType)

    // if user has used params options instead of json, collect all the paramters in an object

    if(contentType === 'params'){
        
        data = {};
        for(let i =0; i < addedParamsCount + 1; i++){
            console.log(document.getElementById('parameterKey' + (i + 1)))
            
            if(document.getElementById('parameterKey' + (i + 1)) !=  undefined){

                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
        
                data[key] = value;
                
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    console.log('data', data)

    // if request type is get, invoke fetch api to create a get request
    if(requestType === "GET"){
        fetch(url, {
            method : 'GET',
        })
        .then((response)=>{ 
            // console.log(response)
           return response.text()})
        .then((text)=>{
            // console.log(JSON.parse(text))
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }else{
        fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json : charset=utf-8'
            },
            body : data 
        })
        .then(response=> response.text())
        .then((text)=>{
            console.log(text)
            // document.getElementById('responseJsonText').value = text;  
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }

})

