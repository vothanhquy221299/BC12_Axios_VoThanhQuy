function Validators(){
    this.kiemTraRong = function(value, spanID, msg){
        if(!value){
            getEle(spanID).style.display = 'block';
            getEle(spanID).innerHTML = msg;
            return false;
        }
        getEle(spanID).style.display = 'none';
        getEle(spanID).innerHTML = '';
        return true;
    }
    
    this.kiemTraChuoi = function(value, spanID, msg){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");

        if(pattern.test(value)){
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = msg;
        return false;
    }

    this.kiemTraMatKhau = function (value, spanID, msg){
        var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{6,}$/);

        if(pattern.test(value)){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = msg;
        return false;
    }

    this.kiemTraDoDaiKiTu = function(value, spanID, msg, min, max){
        if(value.length >= min && value.length <= max){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = msg;
        return false;
    }

    this.kiemTraEmail = function(value, spanID, msg){
        var pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if(pattern.test(value)){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = msg;
        return false;
    }

    this.kiemTraOption = function(value, spanID, msg){
        if(value != -1){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = msg;
        return false;
    }
}