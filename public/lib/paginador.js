//paginador

exports.paginador = function  (pages,current) {
	


var html = '<div class="row mx-auto" style="padding:20px">';
    
    //pagination 
    if(pages > 1) { // show pagination if there is pages 
      html += '<nav class="mx-auto"><ul class="pagination">'
          
          //FIRST ITEM 
          if(current == 1) { 

            html += '<li class="page-item disabled"><a class="page-link" href="#">First</a></li>'
           
           } else { 
            
            html +='<li class="page-item"><a class="page-link" href="?page=1">First</a></li>'
          } 
          
          //ITEMS 

          var i = (Number(current) > 5 ? Number(current) - 4 : 1);
          
          if(i !== 1) { 
            
            html += '<li class="page-item disabled"><a class="page-link" href="#">...</a></li>'
          } 
          
          for(; i <= (Number(current) + 4) && i <= pages; i++) { 
            
            if(i == current) {
              
              html +=`<li class="page-item active"><a class="page-link" href="?page=${i}">${i}</a></li>`
              
            } else {
              
              html +=`<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`
            
            } 
            if (i == Number(current) + 4 && i < pages) { 
               
               html +='<li class="page-item disabled"><a class="page-link" href="#">...</a></li>'
                 
            } 
          } 
          //LAST ITEM 

          if(current == pages) { 
            
            html +='<li class="page-item disabled"><a class="page-link" href="#"> Last</a> </li>'
              
          } else {
            
            html +=`<li class="page-item"> <a class="page-link" href="?page=${pages}">Last</a> </li>`
             
          } 
        
        html +='</ul></nav>'
   } 
  
  html +='</div></div>'

  return html;

  }