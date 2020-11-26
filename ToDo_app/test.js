document.getElementById("reg").addEventListener("click", () => {
    if(document.getElementById("userName").value == "admin" && document.getElementById("inputPassword").value == 12345) {
        alert("true");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var form = document.getElementsByTagName('form');
            form[0].style.display="none";
            var portion = document.getElementById("content");
            portion.style.display="block";
            portion.style.width="100%";
            portion.style.position="absolute";
            portion.style.top = '0';
            var table = document.getElementById("table");
            var out="";
            for(var i=0; i<response.length; i++){
                if(response[i].completed == true){
                    out += "<tr><td class='align'><input type='checkbox' checked disabled></td><td>"+response[i].title+"</td></tr>"
                }
                else{
                    out += "<tr><td class='align'><input type='checkbox'></td><td>"+response[i].title+"</td></tr>";
                }
            }
            table.innerHTML = out;
            var p = new Promise(function(resolve){
                var n =0;
                var checkboxes = document.querySelectorAll("input[type=checkbox]");
                checkboxes.forEach(function(checkbox) {
                    checkbox.addEventListener('change', function() {
                        n+=1;
                        if(n==5){resolve();}
                    });
                });
            });
            p.then(function(){alert("Congrats. 5 Tasks have been Successfully Completed.");});
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
   }
   else {
       alert("Incorrect Username or password");
       window.location.reload();
   }
});
console.log("current page is" + window.location.href);




