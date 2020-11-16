function ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var s = '<input type="text" id="myInput" onkeyup="search()" placeholder="Search for Items"><br>';
            var out = "<table cellpadding='20' border='1' id='Table1'><tr><th> Select </th><th> Name </th><th> quantity </th><th> Unit </th><th>Price</th><th>Category</th></tr>";
            for(var i=0; i<response.length; i++) {
                out += "<tr><td><input class='hello' type='checkbox' value=i>" +"</td><td>" + response[i].name +"</td><td>"+ response[i].quantity+"</td><td>"
                + response[i].Unit + "</td><td>" +"₹"+ response[i].price +"</td><td>"+ response[i].Category + "</td></tr>";
            }
            document.getElementById("shopList").innerHTML = s + out + "</table>" + "<br><button class='btn btn-lg btn-light' onclick='proceed()'>Proceed</button>";
        }
    }
    xhttp.open("GET", "list.json", true);
    xhttp.send();
}


function search() {
    // Declare variables
    var td, txtValue;
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("Table1");
    var tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (var i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


function proceed(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
       
            var grid = document.getElementById("Table1");
            var checkBoxes = grid.getElementsByTagName("INPUT");
            var msg= [];
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].checked) {
                    var message = {};
                    var row = checkBoxes[i].parentNode.parentNode;
                    message.name = row.cells[1].innerHTML;
                    message.quantity = row.cells[2].innerHTML;
                    message.unit = row.cells[3].innerHTML;
                    message.price = row.cells[4].innerHTML;
                    message.Category = row.cells[5].innerHTML;
                    msg.push(message);
                }
            }
    
            var out = "<table cellpadding='20' border='1' id='table2'><tr><th>Sl.No</th><th> Name </th><th> quantity </th><th> Unit </th><th>Price</th><th>Category</th></tr>";
            for(var i=0; i<msg.length; i++) {
                    out += "<tr><td>"+ (i+1) +"</td><td>" + msg[i].name +"</td><td>"+ msg[i].quantity +"</td><td>"
                        + msg[i].unit + "</td><td>"+ msg[i].price +"</td><td>"+ msg[i].Category + "</td></tr>";
                    }
            var happy = '<p class="happy">❤ Happy Shopping ❤</p>';
            document.getElementById("shopList").innerHTML = out + "</table>" +happy + "<br><button class='btn btn-outline-light' onclick='PrintTable()'>Print Your List</button>";

        }
    }
    xhttp.open("GET", "", true);
    xhttp.send();
}

function PrintTable() {
    var printWindow = window.open('', '', 'height=400,width=700');
    printWindow.document.write('<html><head><title>Table Contents</title></head>');
    printWindow.document.write('<body>');
    var Contents = document.getElementById("table2").innerHTML;
    printWindow.document.write("<table border='1' cellpadding='5'>"+Contents+"</table>");
    printWindow.document.write('</body>');

    printWindow.document.write('</html>');
    printWindow.document.close();
    printWindow.print();
}