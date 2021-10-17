//the search query should be https://www.ratemyprofessors.com/search/teachers?query=jordan+axt&sid=U2Nob29sLTE0Mzk=

//fetching instructor names section from mcgill course webpage
//COMMENT MORE
instructors = document.getElementsByClassName("catalog-instructors")[0].innerHTML;
instArray = instructors.split(/,|;|:|\(|\)/);
for (i = 0; i<instArray.length; i++) {
    //remove start and end redundant whitespaces and remove accents
    instArray[i] = instArray[i].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
if (instArray[0]=="Instructors") {
    instArray.shift();
    if (instArray[-1]!="Fall" && instArray[-1]!="Winter" && instArray[-1]!="Summer") {
        instArray.pop();
    }
    alert(instArray);
    nameIndices = [];
    var count = 0;
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
    ratings = [];
    for (j=0; j<nameIndices.length; j++) {
        var url = 'https://www.ratemyprofessors.com/search/teachers?query='
        +instArray[nameIndices[j]]+'+'+instArray[nameIndices[j]+1]
        +'&sid=U2Nob29sLTE0Mzk=';
        alert(url);
    }

}