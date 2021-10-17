//the search query should be https://www.ratemyprofessors.com/search/teachers?query=jordan+axt&sid=U2Nob29sLTE0Mzk=
instructors = document.getElementsByClassName("catalog-instructors")[0].innerHTML;
instArray = instructors.split(/,|;|:|\(|\)/);
alert(instArray);
for (i = 0; i<instArray.length; i++) {
    instArray[i] = instArray[i].trim();
}
if (instArray[0]=="Instructors") {
    instArray.shift();
    alert(instArray);
    alert('bruh');
    alert(instArray.length);
    alert(instArray);
}


