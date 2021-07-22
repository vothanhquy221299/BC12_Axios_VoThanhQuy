var userService  = new UserService();

function getEle(id){
    return document.getElementById(id);
}

var layDSUS = function(){
    userService.layDSUser()
    .then(function(result){
        renderDiv(result.data);
        console.log(result.data)
    }).catch(function(error){
        console.log(error);
    })
}
layDSUS();

function renderDiv(arrUser){
    var content = '';
    arrUser.map(function(us, index){
        content += `
            <div class="col-3 text-center">
                <img src="${us.hinhAnh}"/>
                <p >${us.ngonNgu}</p>
                <h2>${us.hoTen}</h2>
                <p>${us.moTa}</p>
            </div>    
        `; 
    });
    getEle('tblCarousel').innerHTML = content;
}