function UserServices(){
    this.layDSUser = function(){
        //GET: take data from server
        return axios({
            url: 'https://60db2a6c801dcb0017290f1e.mockapi.io/users',
            method: "GET",
        });
    };

    this.themUser = function(us){
        return axios({
            url: 'https://60db2a6c801dcb0017290f1e.mockapi.io/users',
            method: 'POST',
            data: us,
        });
    }

    this.xoaUser = function(id){
        return axios({
            url: `https://60db2a6c801dcb0017290f1e.mockapi.io/users/${id}`,
            method: 'DELETE',
        })
    }

    this.xemUser = function(id){
        return axios({
            url: `https://60db2a6c801dcb0017290f1e.mockapi.io/users/${id}`,
            method: 'GET',
        })
    }

    this.capNhatUser = function(id, us){
        return axios({
            url: `https://60db2a6c801dcb0017290f1e.mockapi.io/users/${id}`,
            method: 'PUT',
            data: us,
        })
    }
}