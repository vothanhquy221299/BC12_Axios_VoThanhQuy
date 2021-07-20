var userServices = new UserServices();
var validators = new Validators();

function getEle(id) {
  return document.getElementById(id);
}

var layDanhSachUser = function () {
  userServices
    .layDSUser()
    .then(function (result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
layDanhSachUser();

var themUsers = function () {
  /**?
   *Take value from form
   */
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  /**
   * Validate input
   */
  var isValid = true;

  isValid &= validators.kiemTraRong(taiKhoan,"tbTaiKhoan","(*) Tài khoản không được để trống");
  isValid &= validators.kiemTraRong(hoTen, 'tbHoTen', '(*) Họ tên không được để trống')
          && validators.kiemTraChuoi(hoTen, 'tbHoTen', '(*) Họ tên không chứa số và kí tự đặt biệt');
  isValid &= validators.kiemTraRong(matKhau, 'tbMatKhau', '(*) Mật khẩu không được để trống')
          && validators.kiemTraMatKhau(matKhau, 'tbMatKhau', '(*) Mật khẩu có ít nhất 1 kí tự hoa, 1 kí tự đặt biêt, 1 kí tự số')
          && validators.kiemTraDoDaiKiTu(matKhau, 'tbMatKhau', '(*) Độ dài tối thiểu 6 kí tự');
  isValid &= validators.kiemTraRong(email, 'tbEmail', '(*) Email không được để trống')
          && validators.kiemTraEmail(email, 'tbEmail', '(*) Nhập theo định dạng example@gmail.com');
  isValid &= validators.kiemTraRong(hinhAnh, 'tbHinhAnh', '(*) Không được để trống');
  isValid &= validators.kiemTraOption(loaiND, 'tbLoaiND', '(*) Vui lòng chọn loại người dùng');
  isValid &= validators.kiemTraOption(ngonNgu, 'tbNgonNgu', '(*) Vui lòng chọn ngôn ngữ');
  isValid &= validators.kiemTraRong(moTa, 'tbMoTa', '(*) Không được để trống')
          && validators.kiemTraDoDaiKiTu(moTa, 'tbMoTa', '(*) Độ dài không vượt quá 60 kí tự')



  if (!isValid) return;
  /**
   * Khoi tao 1 dtuong User tu lop dtuong User
   */
  var us = new Users(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  /**
   * Goi api de luu data xuong csdl
   */
  userServices
    .themUser(us)
    .then(function (result) {
      layDanhSachUser();

      //An modal sau khi thêm thanh cong
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getEle("btnThemNguoiDung").addEventListener("click", function () {
  getEle("formUser").reset();
  var modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = `<button class="btn btn-success" onclick="themUsers()">Thêm người dùng</button>`;
});

var xoaUsers = function (id) {
  userServices
    .xoaUser(id)
    .then(function (result) {
      layDanhSachUser();
    })
    .catch(function (error) {
      console.log(error);
    });
};

var xemUsers = function (id) {
   //Them button cap nhat cho form
   var modalFooter = document.querySelector("#myModal .modal-footer");
   modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatUsers('${id}')">Cập nhật</button>`;
  userServices
    .xemUser(id)
    .then(function (result) {
      var user = result.data;
      //Open modal
      // getEle("btnThemNguoiDung").click();
      //Lay data tra ve tu server len form
      getEle("TaiKhoan").value = user.taiKhoan;
      getEle("HoTen").value = user.hoTen;
      getEle("MatKhau").value = user.matKhau;
      getEle("Email").value = user.email;
      getEle("loaiNguoiDung").value = user.loaiND;
      getEle("loaiNgonNgu").value = user.ngonNgu;
      getEle("MoTa").value = user.moTa;
      getEle("HinhAnh").value = user.hinhAnh;

     
    })
    .catch(function (error) {
      console.log(error);
    });
};

var capNhatUsers = function (id) {
  //Lay thong tin moi tu form
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  //Khoi tao doi tuong User
  var us = new Users(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  //Cap nhat xuong database
  userServices
    .capNhatUser(id, us)
    .then(function (result) {
      //Load lai danh sach
      layDanhSachUser();
      //An modal sau khi cap nhat thanh cong
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

function renderTable(mangUser) {
  var content = "";
  mangUser.map(function (us, index) {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${us.taiKhoan}</td>
                <td>${us.matKhau}</td>
                <td>${us.hoTen}</td>
                <td>${us.email}</td>
                <td>${us.ngonNgu}</td>
                <td>${us.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaUsers('${
                      us.id
                    }')">Xóa</button>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="xemUsers('${
                      us.id
                    }')">Cập nhật</button>
                </td>
            </tr>
            
        `;
  });
  //dom table to open content
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function setLocalStorage(dsus) {
  localStorage.setItem("DSUS", JSON.stringify(dsus));
}

function getLocalStorage(dsus) {
  if (localStorage.getItem("DSUS")) {
    return JSON.parse(localStorage.getItem("DSUS"));
  }
}
