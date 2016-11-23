//Introduce IFFE functions - Immediately evoked function expression
//to avoid globalisation of transaction variables

(function () {
    var rowNo = 1; var rowNo_CM=0;
    var td_Details,td_DEtails_CM;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;
    var menu = document.querySelector("#myDropdown");
    var filter = document.querySelector("#div_Filter");
    var Context_flag;
    var empTotalSal = 0;
    var asc_Desc_Flag_I1=0, asc_Desc_Flag_I2 = 0, asc_Desc_Flag_I3 = 0, asc_Desc_Flag_I4 = 0;
    var selectedVal = -1;
    var header_Position = -1;
   
    var current_page = 1;
    var records_per_page = 10;
    var tbl_Emp;
    var len;
    tbl_Emp = document.getElementById('empTable');
    len = tbl_Emp.rows.length;
    function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    function nextPage() {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }

    function changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("listingTable");
        var page_span = document.getElementById("page");
        var tr;
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();
        listing_table.innerHTML = "";
        
        var i, j;
        var flag = 0;
        for ( i = (page-1) * records_per_page; i < (page * records_per_page) && i < tbl_Emp.rows.length-1; i++)
        {
            tr = tbl_Emp.rows[i + 1];
            if (tr.classList.contains("show_pg")) {
                tr.classList.remove("show_pg")
            }
            if (tr.classList.contains("hide_pg")) {
                tr.classList.remove("hide_pg")
            }
            tr.classList.add("show_pg");
        }
        if (page == numPages()) {
            var td_extra = parseInt(tbl_Emp.rows.length-2) % records_per_page;
            if (i - 1 > records_per_page) {
                for (var k = (i - td_extra)-1 ; k > 0; k--) {
                    tr = tbl_Emp.rows[k];
                    if (tr.classList.contains("show_pg")) {
                        tr.classList.remove("show_pg")
                    }
                    if (tr.classList.contains("hide_pg")) {
                        tr.classList.remove("hide_pg")
                    }
                    tr.classList.add("hide_pg");
                }
            }
        }
        else{
            if (i-1 > records_per_page) {
                for (var k = (i - records_per_page); k > 0; k--) {
                    tr = tbl_Emp.rows[k];
                    if (tr.classList.contains("show_pg")) {
                        tr.classList.remove("show_pg")
                    }
                    if (tr.classList.contains("hide_pg")) {
                        tr.classList.remove("hide_pg")
                    }
                    tr.classList.add("hide_pg");
                }
            }
        }
        for (l = i+1; l < tbl_Emp.rows.length - 1; l++) {
          
            tr = tbl_Emp.rows[l];
            if (tr.classList.contains("show_pg")) {
                tr.classList.remove("show_pg")
            }
            if (tr.classList.contains("hide_pg")) {
                tr.classList.remove("hide_pg")
            }
            tr.classList.add("hide_pg");
           
        }
        
        page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    function numPages() {
        return Math.ceil(parseInt(tbl_Emp.rows.length-2) / records_per_page);
       
    }

    window.onload = function () {
        changePage(1);
    };
   
    var tableValue = document.getElementById('empTable');
    var rCount = tableValue.rows.length; //get no.of rows in static table
    
    var empNo;
    var empName;
    var EmpSalary;
    
    empNo = tableValue.rows[1].cells[1].innerText;
    EmpName = tableValue.rows[1].cells[2].innerText;
    EmpSalary = tableValue.rows[1].cells[3].innerText;
  
    for (var j = 0; j <= 30 ; j++) {
        var row = tableValue.insertRow(j + 5);
        row.className = "row";
        var rowVal = j + 4;
        var cellSNo = row.insertCell(0);
        cellSNo.innerHTML = j + 5;
        var cellENo = row.insertCell(1);
        cellENo.innerHTML = parseInt(empNo) + rowVal;
        var cellEmpName = row.insertCell(2); 
        cellEmpName.innerHTML = EmpName + rowVal;
        var cellEmpSalary = row.insertCell(3);
        cellEmpSalary.innerHTML = parseInt(EmpSalary) + j;

    }
    
    

    var row_400 = tableValue.rows.length;
    document.getElementById("tdNoOfRows").innerHTML = parseInt(row_400)-2;
    var sal = 0; empTotalSal = 0;
    for (var j = 1; j < row_400 - 1; j++) {
        var cellValue = tableValue.rows[j].cells[3].innerHTML;
        if (cellValue != '') {

            sal = tableValue.rows[j].cells[3].innerHTML;
            empTotalSal += parseInt(sal);
            //alert(empTotalSal);
        }
    }
    document.getElementById("totalSalary").innerHTML = empTotalSal;
    
    var cols = document.querySelectorAll('.row td');

    for (i = 0; i < cols.length; i++) {
        var item = cols[i];
        item.addEventListener('blur', function (e) {
            //console.log(e.target);
            console.log("HI");
        });
    }
 
    function populate_checkBox(headerPosition)
    {
       
        var tbl_Temp = document.getElementById("empTable").tBodies[0];
        var tbl_Arr_ddSal = [];
        var tbl_Arr_dd = [];
        var tbl_Arr_ddEName = [];
        var tbl_Arr_ddName = [];
        var tbl_Arr_ddENo = [];
        var tbl_Arr_ddNo = [];
        
        for (var i = 1, len = tbl_Temp.rows.length - 1; i < len; i++) {
            var row = tbl_Temp.rows[i];
            if (headerPosition == 2) {
                var cellValue = (row.cells[headerPosition].textContent.trim() || row.cells[headerPosition].innerText.trim());
            }
            else {
                var cellValue = parseInt(row.cells[headerPosition].textContent.trim() || row.cells[headerPosition].innerText.trim());
            }
            tbl_Arr_ddSal.push(cellValue);
        }
   
        tbl_Arr_dd = tbl_Arr_ddSal.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        })
       
        var table = document.getElementsByTagName('input');
        var rowCount = table.length;
        var flag = 0;


        for (var i = 0; i < rowCount; i++) {
          
            if (table[i].checked == true) {
                flag++;
                console.log(flag);
                table.checked = true;
            }
        }
        var dd_item = document.getElementsByClassName('show_Filter'); 
        if (flag >= 1 || dd_item.length>=1) {
            document.getElementById('div_ENO').innerHTML = '';
            var sel = document.getElementById('div_ENO');
            

            var chkId = "chk_All";
            var lblId = "lbl_All";
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";

            checkbox.id = chkId;
            checkbox.addEventListener("click", getSelectedValue);

            var label = document.createElement('label')
            label.id = lblId;
            label.appendChild(document.createTextNode("select All"));
            sel.appendChild(checkbox);
            sel.appendChild(label);
            sel.appendChild(document.createElement("br"));

            for (var k = 0; k < dd_item.length; k++) {
                
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                
                checkbox.id = "chk"+parseInt(k);
               

                var label = document.createElement('label')
                label.id = "lbl"+parseInt(k);;
                label.appendChild(document.createTextNode(dd_item[k].getElementsByTagName('td')[headerPosition].innerHTML.trim()));

                sel.appendChild(checkbox);
                sel.appendChild(label);
                sel.appendChild(document.createElement("br"));

            }
                
        }
    
        
        else {
            if (flag == 0) {
                document.getElementById('div_ENO').innerHTML = '';
                var sel = document.getElementById('div_ENO');

                var chkId = "chk_All";
                var lblId = "lbl_All";
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";

                checkbox.id = chkId;
                checkbox.addEventListener("click", getSelectedValue);

                var label = document.createElement('label')
                label.id = lblId;
                label.appendChild(document.createTextNode("select All"));
                sel.appendChild(checkbox);
                sel.appendChild(label);
                sel.appendChild(document.createElement("br"));

                for (var i = 0; i < 6; i++) {
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    
                    checkbox.id = "chk" + i;
                    var label = document.createElement('label')
                    label.id = "lbl" + i;
                    label.appendChild(document.createTextNode(tbl_Arr_dd[i]));

                    sel.appendChild(checkbox);
                    sel.appendChild(label);
                    sel.appendChild(document.createElement("br"));

                }

            }
        }
       
    }
    function getSelectedValue() {

        console.log("awqd");
        console.log(this.id);
        var chkId = this.id;
       
        var docTbl = document.getElementById("div_ENO");
        var input_list = docTbl.querySelectorAll("input");
        var selected_dd = docTbl.querySelectorAll("label");
        var chkAll=document.getElementById("chk_All");
        if(chkAll.checked==true)
        {
            for (var j = 1; j < input_list.length; j++)
            {
            var id = selected_dd[j].innerHTML.trim();
            input_list[j].checked = true;
            }
        }
        else if(chkAll.checked==false)
        {
            for (var j = 1; j < input_list.length; j++)
            {
                var id = selected_dd[j].innerHTML.trim();
                input_list[j].checked = false;
            }
        }
        
    }

    function getLocation_Click(e) {
       
        td_Details = e.target;
        rowNo = e.target.parentNode.rowIndex;
    }
    function getLocation_Context_Click(e) {
        
        td_Details_CM = e.target;
        rowNo_CM = e.target.parentNode.rowIndex;
    }

    var tdEle = document.getElementById("empTable").getElementsByTagName("td");
    
    for (var i = 0; i < tdEle.length; i++) {
        if (i % 4 != 0) {
            tdEle[i].setAttribute("contenteditable", "true");
        }
    }
 
    function contextMenu()
    {
        
        if (td_Details.parentElement.classList.contains('headers')) {
           
        }
        else if (td_Details.parentElement.classList.contains('footers')) {

        }
        else {
            document.getElementById("myDropdown").classList.add('show_CM');
        }
            
           
    }

    window.onclick = function (event) {
        if (!event.target.matches('.dropTable')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show_CM')) {
                    openDropdown.classList.remove('show_CM');
                }
            }

           
        }

       if (event.target.matches('.search'))
        {
            document.getElementById("div_Filter").classList.add('show_CM');
        }
       else if (event.target.parentElement.matches('.div_ENO'))
        {
           document.getElementById("div_Filter").classList.add('show_CM');
           
        }
        else if (!event.target.matches('.image'))  {

            document.getElementById("div_Filter").classList.remove('show_CM');
         
       }
        
    }

    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data_CSV || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function convertArrayOfObjectsToJSON(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
       
        data = args.data_JSON || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
     

        keys = Object.keys(data[0]);

        result = '';
        
        result += '[ ';
        var rows_JSON = 0;
        data.forEach(function (item) {
            ctr = 0;
            rows_JSON++;
            result += '{';
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;
                if (key == 'EmpName') {
                    result += key + ":'" + item[key] +"'";
                    ctr++;
                }
                else {
                    result += key + ":" + item[key];
                    ctr++;
                }
            });
            if (data.length != rows_JSON)
                result += '},' + "\n";
            else if (data.length == rows_JSON)
                result += '}' + '\n';
            
        });
        result += ']';
        return result;
    }

    //Download table data in CSV format
    function downloadCSV() {
        var data_CSV, filename, link;
        var data = [];
        var table = document.getElementById('empTable').cloneNode(true);
        var filter_Class = table.getElementsByClassName('hide');
        if (filter_Class.length != 0) {
            while (filter_Class.length) filter_Class[0].parentElement.removeChild(filter_Class[0]);
        }
        var rowCount = table.rows.length; //get no.of rows in static table

        for (var i = 1; i < rowCount - 1; i++) {

            // declare and assign values to local--object
            var local = {
                "SNo": table.rows[i].cells[0].innerText.trim(),
                "EmpNo": table.rows[i].cells[1].innerText.trim(),
                "EmpName": table.rows[i].cells[2].innerText.trim(),
                "EmpSalary": table.rows[i].cells[3].innerText.trim()
            };

            data.push(local);//now data -- loaded with array of objects

            console.log(data);

        }

        var csv = convertArrayOfObjectsToCSV({
            data_CSV: data
        });
        if (csv == null) return;

        filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        var data_Final = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data_Final);
        link.setAttribute('download', filename);
        link.click();
    }
  
    //download table data in JSON Format
  function downloadJSON() {
   
      var data_JSON, filename, link;

      var data = [];

      var table = document.getElementById('empTable').cloneNode(true);
      var filter_Class = table.getElementsByClassName('hide');
      if (filter_Class.length != 0) {
          while (filter_Class.length) filter_Class[0].parentElement.removeChild(filter_Class[0]);
      }
      var rowCount = table.rows.length; //get no.of rows in static table

      for (var i = 1; i < rowCount - 1; i++) {

          // declare and assign values to local--object
          var local = {
              "SNo": table.rows[i].cells[0].innerText.trim(),
              "EmpNo": table.rows[i].cells[1].innerText.trim(),
              "EmpName": table.rows[i].cells[2].innerText.trim(),
              "EmpSalary": table.rows[i].cells[3].innerText.trim()
          };

          data.push(local);//now data -- loaded with array of objects

          console.log(data);

      }

      var json = convertArrayOfObjectsToJSON({
          data_JSON: data
      });
      if (json == null) return;

      filename = 'Export_JSON.json';

      if (!json.match(/^data:text\/json/i)) {
          json = 'data:text/json;charset=utf-8,' + encodeURIComponent(json);
      }
      var data_Final = json;

      link = document.createElement('a');
      link.setAttribute('href', data_Final);
      link.setAttribute('download', filename);
      link.click();

      
  }
  

  function deleteRow_ContextMenu(tableID) {
      
          var table = document.getElementById(tableID);

          var rowCount = table.rows.length;
          var noOfRows = 0;
         
            table.deleteRow(rowNo);
            for (var i = 1; i < rowCount-2; i++) {
                table.rows[i].cells[0].innerHTML = i;
                noOfRows++;
            }
            document.getElementById("tdNoOfRows").innerHTML = noOfRows;
            var sal = 0; empTotalSal = 0;
            for (var j = 1; j < table.rows.length - 1; j++) {
                var cellValue=table.rows[j].cells[3].innerHTML;
                if (cellValue != '') {
                    sal = cellValue;
                    empTotalSal += parseInt(sal);
                }
                //alert(empTotalSal);
            }
            document.getElementById("totalSalary").innerHTML = empTotalSal;
           // populate_DD();
  }

  function insertRowBelow_ContextMenu(tableID) {

      var table = document.getElementById(tableID);
      var rowCount = table.rows.length;
      var td = table.insertRow(rowNo + 1);
      var c = td.insertCell(0);
      td.className = "row";
      var noOfRows = 0;
      
      var c1 = td.insertCell(1); var c2 = td.insertCell(2); var c3 = td.insertCell(3);
      c.height = 15;
      c1.contentEditable = true; c2.contentEditable = true; c3.contentEditable = true;
      //c.style.height = 10;
      for (var i = 1; i < rowCount; i++) {
          table.rows[i].cells[0].innerHTML = i;
          noOfRows++;
      }

      var cols = document.querySelectorAll('.row td');

      for (i = 0; i < cols.length; i++) {
          var item = cols[i];
          item.addEventListener('blur', function (e) {
              //console.log(e.target);
              console.log("HI");
              var newRow_Sal = e.target.innerText;
              var cellIndex = e.target.cellIndex;



              if (cellIndex == 1) {
                  if (newRow_Sal.trim()=="") {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "EmpNo field is mandatory field...";
                      flag_ADD = "Error_EmpNo";
                  }
                  else if (isNaN(parseInt(newRow_Sal))) {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "U have entered wrong value in empNo field...";
                      flag_ADD = "Error_EmpNo";
                  }
                  
                  else {
                      flag_ADD = "";
                  }
              }
              else if (cellIndex == 3) {
                  if (newRow_Sal.trim()=="") {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "EmpSal field is mandatory field...";
                      flag_ADD = "Error_EmpSal";
                  }
                  else if (isNaN(parseInt(newRow_Sal))) {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "U have entered wrong value in  EmpSal field...";
                      flag_ADD = "Error_EmpSal";
                  }
                  
                  else {
                      flag_ADD = "";
                  }
              }
              if (flag_ADD == "") {
                  document.getElementById("tdNoOfRows").innerHTML = noOfRows;
                  var sal = 0; empTotalSal = 0;
                  for (var j = 1; j < table.rows.length - 1; j++) {
                      var cellValue = table.rows[j].cells[3].innerHTML;
                      if (!isNaN(parseInt(cellValue))) {

                          sal = table.rows[j].cells[3].innerHTML;
                          empTotalSal += parseInt(sal);
                          //alert(empTotalSal);
                      }
                  }
                  document.getElementById("totalSalary").innerHTML = empTotalSal;
                  document.getElementById('lblStatus').innerHTML = "";
              }


          });
      }

      document.getElementById("tdNoOfRows").innerHTML = noOfRows;
     
      var sal = 0; empTotalSal = 0;
      for (var j = 1; j < table.rows.length - 1; j++) {
          var cellValue=table.rows[j].cells[3].innerHTML;
          if (cellValue != '') {

              sal = table.rows[j].cells[3].innerHTML;
              empTotalSal += parseInt(sal);
              //alert(empTotalSal);
          }
      }
      document.getElementById("totalSalary").innerHTML = empTotalSal;

  }
    //Used to insert new row under clicked row

  function insertRowAbove_ContextMenu(tableID) {

      

      var table = document.getElementById(tableID);
      var rowCount = table.rows.length;
      var td = table.insertRow(rowNo);
      var c = td.insertCell(0);
      var noOfRows = 0;
      var newRow_Sal = 0;
      
      td.className = "row";
      var c1 = td.insertCell(1); var c2 = td.insertCell(2); var c3 = td.insertCell(3); 
      c.height = 15;
      c1.contentEditable = true; c2.contentEditable = true; c3.contentEditable = true;

      for (var i = 1; i < rowCount; i++) {
          table.rows[i].cells[0].innerHTML = i;
          noOfRows++;
      }

      var cols = document.querySelectorAll('.row td');
      var flag_ADD ="";
      for (i = 0; i < cols.length; i++) {
          var item = cols[i];
          item.addEventListener('blur', function (e) {
              
              newRow_Sal = e.target.innerText;
              
              var newRow_Sal = e.target.innerText;
              var cellIndex = e.target.cellIndex;

             

              if (cellIndex == 1 ){
                  if (newRow_Sal.trim()=='') {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "EmpNo field is mandatory field...";
                      flag_ADD = "Error_EmpNo";
                  }
                  else if (isNaN(parseInt(newRow_Sal))) {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "U have entered wrong value in  EmpSal field...";
                      flag_ADD = "Error_EmpSal";
                  }
                  else {
                      flag_ADD = "";
                  }
              }
              else if(cellIndex==3)
              {
                  if (newRow_Sal.trim() == "") {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "EmpSal field is mandatory field...";
                      flag_ADD = "Error_EmpSal";
                  }
                  else if (isNaN(parseInt(newRow_Sal)))
                  {
                      document.getElementById('lblStatus').style.color = "red";
                      document.getElementById('lblStatus').innerHTML = "U have entered wrong value in  EmpSal field...";
                      flag_ADD = "Error_EmpSal";
                  }
                   
                  else{
                      flag_ADD="";}
              }
                  if(flag_ADD=="")
                   {
                      document.getElementById("tdNoOfRows").innerHTML = noOfRows;
                      var sal = 0; empTotalSal = 0;
                      for (var j = 1; j < table.rows.length - 1; j++) {
                          var cellValue = table.rows[j].cells[3].innerHTML;
                          if ( !isNaN(parseInt(cellValue))) {

                              sal = table.rows[j].cells[3].innerHTML;
                              empTotalSal += parseInt(sal);
                             
                          }
                      }
                      document.getElementById("totalSalary").innerHTML = empTotalSal;
                      document.getElementById('lblStatus').innerHTML = "";

                  }
              

          });
         
      }


  }

    // Positioning context menu
  function positionMenu(e) {
      menuPosition = getPosition(e);
      console.log(menuPosition);
      menuPositionX = menuPosition.x + "px";
      menuPositionY = menuPosition.y + "px";

      menu.style.left = menuPositionX;
      menu.style.top = menuPositionY;

  }

  function positionFilter(e) {
      menuPosition = getPosition(e);
      console.log(menuPosition);
      menuPositionX = menuPosition.x-60 + "px";
      menuPositionY = menuPosition.y+15 + "px";

      filter.style.left = menuPositionX;
      filter.style.top = menuPositionY;

  }
 
  function getPosition(e) {
      var posx = 0;
      var posy = 0;

      if (!e) var e = window.event;

      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      } else if (e.clientX || e.clientY) {
          posx = e.clientX + document.body.scrollLeft +
                             document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop +
                             document.documentElement.scrollTop;
      }

      return {
          x: posx,
          y: posy
      }
  }


  function searchFunction_SNO(headerPositin) {
      // Declare variables 
      var input, filter, table, tr, td1,td2,td3,td4, i;
      input = document.getElementById("empTable");
      var tr = input.getElementsByTagName("tr");
      var txtValue = document.getElementById("myInput");
      filter = txtValue.value.toUpperCase();
      
      var table_Search;
      var filter_Search;
      document.getElementById('div_ENO').innerHTML = '';
      document.getElementById('div_Store').innerHTML = '';
      var sel = document.getElementById('div_Store');
      var sel_SNO = document.getElementById('div_ENO');
      var k = 0;
      var lblId,chkId;
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 1; i < tr.length - 1; i++) {
          td1 = tr[i].getElementsByTagName("td")[headerPositin];
          
          if (td1.innerHTML.toUpperCase().indexOf(filter) > -1)
              {
              lblId = "lbl" + parseInt(i);
              chkId = "chk" + parseInt(i);

              var checkbox = document.createElement('input');
              checkbox.type = "checkbox";
             
              checkbox.id = chkId;
            
              var label = document.createElement('label')
              label.id = lblId;
              label.appendChild(document.createTextNode(td1.innerHTML));
              sel.appendChild(checkbox);
              sel.appendChild(label);
              sel.appendChild(document.createElement("br"));

          }
      }

     // var id = selected_dd[i].innerHTML.trim();

      var chkId = "chk_All";
      var lblId = "lbl_All";
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";

      checkbox.id = chkId;
     checkbox.addEventListener("click", getSelectedValue);

      var label = document.createElement('label')
      label.id = lblId;
      label.appendChild(document.createTextNode("select All"));
      sel_SNO.appendChild(checkbox);
      sel_SNO.appendChild(label);
      sel_SNO.appendChild(document.createElement("br"));

      var selected_dd = sel.querySelectorAll("label");
      if (selected_dd.length>6)
      {
          for (var i = 0; i < 6; i++) {
             
              var id = selected_dd[i].innerHTML.trim();
              var chkId = "chk" + id;
              var lblId = "lbl" + id;
              var checkbox = document.createElement('input');
              checkbox.type = "checkbox";
             
              checkbox.id = chkId;
              

              var label = document.createElement('label')
              label.id = lblId;
              label.appendChild(document.createTextNode(selected_dd[i].innerHTML));
              sel_SNO.appendChild(checkbox);
              sel_SNO.appendChild(label);
              sel_SNO.appendChild(document.createElement("br"));
          }
      }
      else
      {
          for (var i = 0; i < selected_dd.length; i++) {
              var id = selected_dd[i].innerHTML.trim();
              var chkId = "chk" + id;
              var lblId = "lbl" + id;
              var checkbox = document.createElement('input');
              checkbox.type = "checkbox";

              checkbox.id = chkId;
          

              var label = document.createElement('label')
              label.id = lblId;
              label.appendChild(document.createTextNode(selected_dd[i].innerHTML));
              sel_SNO.appendChild(checkbox);
              sel_SNO.appendChild(label);
              sel_SNO.appendChild(document.createElement("br"));
          }
      }
  
       
      
  }
  
  function sortTable(index){
      var tbl = document.getElementById("empTable").tBodies[0];
      var tbl_Arr = [];

      for(var i=1, len=tbl.rows.length-1; i<len; i++){
          var row = tbl.rows[i];
          if (index == 2) {
              var cellValue = (row.cells[index].textContent || row.cells[index].innerText);
              if (isNaN(cellValue)) tbl_Arr.push([cellValue, row]);
          }
          else {
              var cellValue = parseInt(row.cells[index].textContent || row.cells[index].innerText);
              if (!isNaN(cellValue)) tbl_Arr.push([cellValue, row]);
          }
          
      }
      if (index == 2) {
          tbl_Arr.sort();
          
      }
      else {
          tbl_Arr.sort(function (x, y) {
              return x[0] - y[0];
          });
      }
      var footer = document.querySelector('.footers');

      var image = "img" + (parseInt(index) + 1);
      if (image=="img1")
      {
          if (asc_Desc_Flag_I1 % 2 == 0) {
          
              for (var i = 0, len = tbl_Arr.length; i < len; i++) {

                  tbl.insertBefore(tbl_Arr[i][1], footer);

             
              }
              document.getElementById(image).src = "Image/asc.bmp";
              asc_Desc_Flag_I1++;
          }
          else {
              var imgPos = document.getElementById(image).src.search("asc.bmp");
              if (imgPos != -1) {
                  for (var i = tbl_Arr.length-1, len = 0; i >= len; i--) {

                      tbl.insertBefore(tbl_Arr[i][1], footer);

                  
                  }
              }
              document.getElementById(image).src = "Image/desc.bmp";
              asc_Desc_Flag_I1++;
          }
      }
      if (image=="img2")
      {
          if (asc_Desc_Flag_I2 % 2 == 0) {
          
              for (var i = 0, len = tbl_Arr.length; i < len; i++) {

                  tbl.insertBefore(tbl_Arr[i][1], footer);

             
              }
              document.getElementById(image).src = "Image/asc.bmp";
              asc_Desc_Flag_I2++;
          }
          else {
              var imgPos = document.getElementById(image).src.search("asc.bmp");
              if (imgPos != -1) {
                  for (var i = tbl_Arr.length-1, len = 0; i >= len; i--) {

                      tbl.insertBefore(tbl_Arr[i][1], footer);

                  
                  }
              }
              document.getElementById(image).src = "Image/desc.bmp";
              asc_Desc_Flag_I2++;
          }
      }
      if (image == "img3") {
          if (asc_Desc_Flag_I3 % 2 == 0) {

              for (var i = 0, len = tbl_Arr.length; i < len; i++) {

                  tbl.insertBefore(tbl_Arr[i][1], footer);


              }
              document.getElementById(image).src = "Image/asc.bmp";
              asc_Desc_Flag_I3++;
          }
          else {
              var imgPos = document.getElementById(image).src.search("asc.bmp");
              if (imgPos != -1) {
                  for (var i = tbl_Arr.length - 1, len = 0; i >= len; i--) {

                      tbl.insertBefore(tbl_Arr[i][1], footer);


                  }
              }
              document.getElementById(image).src = "Image/desc.bmp";
              asc_Desc_Flag_I3++;
          }
      }
      if (image=="img4")
      {
          if (asc_Desc_Flag_I4 % 2 == 0) {
          
              for (var i = 0, len = tbl_Arr.length; i < len; i++) {

                  tbl.insertBefore(tbl_Arr[i][1], footer);

             
              }
              document.getElementById(image).src = "Image/asc.bmp";
              asc_Desc_Flag_I4++;
          }
          else {
              var imgPos = document.getElementById(image).src.search("asc.bmp");
              if (imgPos != -1) {
                  for (var i = tbl_Arr.length-1, len = 0; i >= len; i--) {

                      tbl.insertBefore(tbl_Arr[i][1], footer);

                  
                  }
              }
              document.getElementById(image).src = "Image/desc.bmp";
              asc_Desc_Flag_I4++;
          }
      }
  
     
      tbl_Arr = null;
  }



  function showSelectedChk(headerposition) {
      var s = document.getElementById("div_ENO");
      console.log(headerposition);
      var l = s.querySelectorAll("Input");
      var lbl = s.querySelectorAll("label");
      var tblContent = document.getElementById("empTable");
      var tr = tblContent.getElementsByTagName("tr");
      for (var k = 1; k < tr.length - 1; k++) {
          if (tr[k].classList.contains("show_pg") || tr[k].classList.contains("hide_pg") || tr[k].classList.contains("hide_Filter") || tr[k].classList.contains("show_Filter")) {
              tr[k].classList.remove("show_pg");
              tr[k].classList.remove("hide_pg");
              tr[k].classList.remove("hide_Filter");
              //tr[k].classList.remove("show_pg");
              tr[k].classList.remove("show_Filter");
              tr[k].classList.add("hide_Filter");
          }
      }
      for (var i = 1; i < l.length; i++) {
          if (l[i].checked == true)
          {
            
              var w = lbl[i].id; console.log(w); var q = document.getElementById(w).innerHTML.trim(); console.log(q);
              for (var k = 1; k < tr.length; k++) {
                  if ((tr[k].getElementsByTagName("td")[headerposition].innerHTML.trim()) == q) {
                      tr[k].classList.remove("hide_Filter");
                      tr[k].classList.add("show_Filter");
                      

                  }
                 
              }


          } else console.log("2");
      }

  }
  function filterFunction(val,index) {
      console.log("FILTER");
      
      var tbl = document.getElementById("empTable").tBodies[0];
      for (var i = 1; i < tbl.rows.length - 1; i++) {
          var cell_Sal = tbl.rows[i].cells[index].innerHTML;
          if (val != "-Select-") {
              if (cell_Sal.trim() == val) {
                  tbl.rows[i].classList.remove("hide");
                  tbl.rows[i].classList.add("show");
              }
              else {
                  //tbl.rows[i].style.display = "none";
                  tbl.rows[i].classList.remove("show");
                  tbl.rows[i].classList.add("hide");
              }
          }
          else if (val == "-Select-") {
              for (var j = 1; j < tbl.rows.length - 1; j++) {
                  tbl.rows[j].classList.remove("hide");
                  tbl.rows[j].classList.add("show");
              }
              break;
          }
      }
      var table = document.getElementById('empTable').cloneNode(true);
      var filter_Class = table.getElementsByClassName('hide');
      var rowCount = 0;
      if (filter_Class.length != 0) {
          while (filter_Class.length) filter_Class[0].parentElement.removeChild(filter_Class[0]);
          rowCount = table.rows.length;
          document.getElementById("tdNoOfRows").innerHTML = parseInt(rowCount) - 2;
          var sal = 0; empTotalSal = 0;
          for (var j = 1; j < rowCount - 1; j++) {
              var cellValue = table.rows[j].cells[3].innerHTML;
              if (cellValue != '') {
                empTotalSal += parseInt(cellValue);
                  
              }
          }
          document.getElementById("totalSalary").innerHTML = empTotalSal;


      }
      else {
          rowCount = table.rows.length;
          document.getElementById("tdNoOfRows").innerHTML = parseInt(rowCount) - 2;
          var sal = 0; empTotalSal = 0;
          for (var j = 1; j < rowCount - 1; j++) {
              var cellValue = table.rows[j].cells[3].innerHTML;
              if (cellValue != '') {

                  empTotalSal += parseInt(cellValue);
                  
              }
          }
          document.getElementById("totalSalary").innerHTML = empTotalSal;
      }
      }
  function filterFunction_ENo() {
      var ddl_Selected = document.getElementById("dd_ENo");
      var val = ddl_Selected.options[ddl_Selected.selectedIndex].value;
      filterFunction(val, 1);
  }
  function filterFunction_EName() {
      var ddl_Selected = document.getElementById("dd_EName");
      var val = ddl_Selected.options[ddl_Selected.selectedIndex].value;
      filterFunction(val, 2);
  }
  function filterFunction_Sal() {
      var ddl_Selected = document.getElementById("dd_Sal");
      var val = ddl_Selected.options[ddl_Selected.selectedIndex].value;
      filterFunction(val,3);
  }


    //Adding event listener

  var buttondownloadJSON = document.getElementById('btnDownloadJSON');
    var buttonDownloadCSV = document.getElementById('downloadAnchor');
 
  buttondownloadJSON.addEventListener('click', downloadJSON);
  buttonDownloadCSV.addEventListener('click', downloadCSV);
  document.getElementById('empTable').addEventListener("contextmenu", function (e) {
      contextMenu();
     
      e.preventDefault();
      positionMenu(e);
     
     
  });
  document.getElementById('fil_SNO').addEventListener('click', function (e) {

      
      var header = event.target.parentElement.parentElement;
      if (header.innerHTML.indexOf("S NO") != -1) { header_Position = 0; }
     
      document.getElementById("div_Filter").classList.add('show_CM');
      populate_checkBox(header_Position);
      
      e.preventDefault();
      positionFilter(e);
     

  });
  document.getElementById('fil_ENO').addEventListener('click', function (e) {
    
      var header = event.target.parentElement.parentElement;
      if (header.innerHTML.indexOf("Emp No") != -1) { header_Position = 1; }
     
      document.getElementById("div_Filter").classList.add('show_CM');
      populate_checkBox(header_Position);

      e.preventDefault();
      positionFilter(e);


  });
  document.getElementById('fil_EName').addEventListener('click', function (e) {
     
      var header = event.target.parentElement.parentElement;
      if (header.innerHTML.indexOf("Emp Name") != -1) { header_Position = 2; }
     
      document.getElementById("div_Filter").classList.add('show_CM');
      populate_checkBox(header_Position);

      e.preventDefault();
      positionFilter(e);


  });
  document.getElementById('fil_ESal').addEventListener('click', function (e) {
      
      var header = event.target.parentElement.parentElement;
      if (header.innerHTML.indexOf("Emp Salary") != -1) { header_Position = 3; }
    
      document.getElementById("div_Filter").classList.add('show_CM');
      populate_checkBox(header_Position);

      e.preventDefault();
      positionFilter(e);


  });
  document.getElementById('angDelete').addEventListener('click', function (e) {
      deleteRow_ContextMenu('empTable');
      getLocation_Click(e);
      
  });
  document.getElementById('angInsertAbove').addEventListener('click', function (e) {
      insertRowAbove_ContextMenu('empTable');
     

  });
  document.getElementById('angInsertBelow').addEventListener('click', function (e) {
      insertRowBelow_ContextMenu('empTable');
      

  });

  document.getElementById('empTable').addEventListener('mousedown', function (e) {
      getLocation_Click(e);
     

  });
  document.getElementById('myInput').addEventListener('keyup', function (e) {
     
      searchFunction_SNO(header_Position);
  });

  document.getElementById('ang_SNO').addEventListener('click', function (e) {
      sortTable(0);
  });
  document.getElementById('ang_ENo').addEventListener('click', function (e) {
      sortTable(1);
  });
    document.getElementById('ang_EName').addEventListener('click', function (e) {
        sortTable(2);
    });
  document.getElementById('ang_ESal').addEventListener('click', function (e) {
      sortTable(3);
  });
  document.getElementById('btn_prev').addEventListener('click', prevPage);
  document.getElementById('btn_next').addEventListener('click', nextPage);
  document.getElementById('btn_OK').addEventListener('click', function (e) { showSelectedChk(header_Position) });
 
})();