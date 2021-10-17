//the search query should be https://www.ratemyprofessors.com/search/teachers?query=jordan+axt&sid=U2Nob29sLTE0Mzk=

//resource 1 https://github.com/kennethtran91/RateMyProf/blob/master/contentscript.js
//resource 2 https://greasyfork.org/fr-CA/scripts/371513-rate-my-professor-uw/code

//fetching instructor names section from mcgill course webpage
//COMMENT MORE
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
        var url = 'https://www.ratemyprofessors.com/search/teachers?query='
        +instArray[nameIndices[j]]+'+'+instArray[nameIndices[j]+1]
        +'&sid=U2Nob29sLTE0Mzk=';
        alert(url);
    }

}