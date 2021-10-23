//the search query should be https://www.ratemyprofessors.com/search/teachers?query=jordan+axt&sid=U2Nob29sLTE0Mzk=

//resource 1 https://github.com/kennethtran91/RateMyProf/blob/master/contentscript.js
//resource 2 https://greasyfork.org/fr-CA/scripts/371513-rate-my-professor-uw/code

//fetching instructor names section from mcgill course webpage
//COMMENT MORE

//https://stackoverflow.com/questions/60471911/http-request-to-a-website-to-get-the-content-of-a-specific-html-element


//WATCH THIS https://www.youtube.com/watch?v=yC7RvrsgLCI

/*function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;                                                  
                onload();
            }
        } 
        else {
            onload();          
        }
    };
    head.appendChild(script);
}

include('http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js', function() {
    $(document).ready(function() {
        alert('the DOM is ready');
    });
});*/


/*async function FetchHtml(url) {
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
    return html;
}*/

/*var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);*/

if (document.location.href.includes("mcgill.ca")) {

    instructors = document.getElementsByClassName("catalog-instructors")[0].innerHTML;
    //split string into array according to following delimiters: , ; : ( )
    instArray = instructors.split(/,|;|:|\(|\)/);
    for (i = 0; i<instArray.length; i++) {
        //remove start and end redundant whitespaces and remove accents
        instArray[i] = instArray[i].trim();
    }
    //verify that format is correct
    if (instArray[0]=="Instructors") {
        //catch edge case where there are no instructors associated with course for academic year
        if (instArray.length == 2) {
            throw new Error("no instructors associated with course");
        }
        //remove redundant initial array element "Instructors"
        instArray.shift();
        //pop end whitespace array element
        if (instArray[-1]!="Fall" && instArray[-1]!="Winter" && instArray[-1]!="Summer") {
            instArray.pop();
        }

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

        //create array to store indices
        urlArray = [];
        //iterate for each prof
        for (j=0; j<nameIndices.length; j++) {
            //create query url for ratemyprofessors.com query finding prof (search by prof name at mcgill university)
            var url = 'https://www.ratemyprofessors.com/search/teachers?query='
            +instArray[nameIndices[j]].normalize("NFD").replace(/[\u0300-\u036f]/g, "")+'+'+instArray[nameIndices[j]+1].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            +'&sid=U2Nob29sLTE0Mzk=';
            urlArray.push(url);
        }

        var newInstructorsStr = "Instructors: ";
        var instructorHyperLinks = [];
        for (l = 0; l<nameIndices.length;l++) {
            str = "";
            str += "<a href=\"";
            str += urlArray[l];
            str += "\">"
            str += instArray[nameIndices[l]]+", "+instArray[nameIndices[l]+1];
            str += "</a>"
            instructorHyperLinks.push(str);
        }

        lastNameIndex = 0;
        for (i = 0; i<instArray.length; i++) {
            if (i==nameIndices[lastNameIndex]) {
                if (lastNameIndex>0&&i-2==nameIndices[lastNameIndex-1]) {
                    newInstructorsStr+= "; "
                }
                newInstructorsStr+=instructorHyperLinks[lastNameIndex];
                lastNameIndex+=1;
                continue;
            }
            else if (lastNameIndex>0 && i-1==nameIndices[lastNameIndex-1]) {
                continue;
            }
            else if (instArray[i] == "Fall") {
                newInstructorsStr+=" (Fall) ";
            }
            else if (instArray[i] == "Winter") {
                newInstructorsStr+=" (Winter) ";
            }
            else if (instArray[i] == "Summer") {
                newInstructorsStr+=" (Summer) ";
            }
        }
        document.getElementsByClassName("catalog-instructors")[0].innerHTML = newInstructorsStr;



        



            /*chrome.runtime.sendMessage({query: urlvar}, function(response) {
                var div = document.createElement('div');
                div.innerHTML = response.source;
                alert(div.innerHTML);
            });*/

            /*$.ajax({
                url: 'https://www.yahoo.com',
                method: "GET",
                success: function (data, status, jqxhr) {
                    console.log("Success");
                    console.log(data);
                },
                error: function (jqxhr, status, error) {
                    console.log("error oops");
                    console.log(error);
                }
            })*/

            //let returnedHTML = getHTML(urlvar);
            
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

if (document.location.href.includes("ratemyprofessors")) {
    if ((document.referrer).includes("mcgill.ca")) {
        window.location.replace(document.getElementsByClassName("TeacherCard__StyledTeacherCard-syjs0d-0 dLJIlx")[0].href);
    }
}