//the search query should be https://www.ratemyprofessors.com/search/teachers?query=jordan+axt&sid=U2Nob29sLTE0Mzk=

//resource 1 https://github.com/kennethtran91/RateMyProf/blob/master/contentscript.js
//resource 2 https://greasyfork.org/fr-CA/scripts/371513-rate-my-professor-uw/code

//fetching instructor names section from mcgill course webpage
//COMMENT MORE

//https://stackoverflow.com/questions/60471911/http-request-to-a-website-to-get-the-content-of-a-specific-html-element


//WATCH THIS https://www.youtube.com/watch?v=yC7RvrsgLCI

async function FetchHtml(url) {
    let response = await fetch(url)
    .then(response => {
        if (!response.ok) {
            alert("could not fetch");
            throw new Error("Could not reach website.");
        }
        return response.json();
    })
    return await response.text(); // Returns it as Promise
}
async function getHTML(url) {
    let html = await FetchHtml(url).then(text => {return text}); // Get html from the promise
    alert(html);
}

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const profIDRegex = /ShowRatings\.jsp\?tid=[0-9]*/g;

instructors = document.getElementsByClassName("catalog-instructors")[0].innerHTML;
//split string into array according to following delimiters: , ; : ( )
instArray = instructors.split(/,|;|:|\(|\)/);
for (i = 0; i<instArray.length; i++) {
    //remove start and end redundant whitespaces and remove accents
    instArray[i] = instArray[i].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//verify that format is correct
if (instArray[0]=="Instructors") {
    //remove redundant initial array element "Instructors"
    instArray.shift();
    //pop end whitespace array element
    if (instArray[-1]!="Fall" && instArray[-1]!="Winter" && instArray[-1]!="Summer") {
        instArray.pop();
    }
    alert(instArray);
    //array to store indices of names in array
    nameIndices = [];
    var count = 0;
    //iterate through array and find indices corresponding to prof last names
    while (count<instArray.length) {
        if (instArray[count]!="Fall" && instArray[count]!="Winter" && instArray[count]!="Summer") {
            nameIndices.push(count);
            count+=2;
        }
        else {
            count+=1;
        }
    }
    alert(nameIndices);
    //create array to store indices
    ratings = [];
    //iterate for each prof
    for (j=0; j<nameIndices.length; j++) {
        //create query url for ratemyprofessors.com query finding prof (search by prof name at mcgill university)
        var urlvar = 'https://www.ratemyprofessors.com/search/teachers?query='
        +instArray[nameIndices[j]]+'+'+instArray[nameIndices[j]+1]
        +'&sid=U2Nob29sLTE0Mzk=';
        alert(urlvar);

        getHTML('https://google.com');
          
        /*$.get(urlvar, function(responseText) {
            alert(responseText);
        });*/

        /*var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                alert(xhr.responseText);
            }
        }
        xhr.open('GET', 'http://google.com', true);
        xhr.send(null);*/
    }

}