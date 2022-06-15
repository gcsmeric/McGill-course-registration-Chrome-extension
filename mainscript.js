//toggle script only if user is on a mcgill webpage
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

    }
}

if (document.location.href.includes("ratemyprofessors")) {
    if ((document.referrer).includes("mcgill.ca")) {
        window.location.replace(document.getElementsByClassName("TeacherCard__StyledTeacherCard-syjs0d-0 dLJIlx")[0].href);
    }
}
