app.service("StudentService", function ($http) {
    //get All Eployee  
    this.getAllStudents = function () {
        return $http.get("LegalEntity/Get_AllEntity");
    };
    // Adding Record  
    this.AddNewStudent = function (LegalEntity) {
        return $http({
            method: "post",
            url: "LegalEntity/Insert_Entity",
            data: JSON.stringify(LegalEntity),
            dataType: "json"
        });
    }
    // Updating record  
    this.UpdateStudent = function (LegalEntity) {
        return $http({
            method: "post",
            url: "LegalEntity/Update_Entity",
            data: JSON.stringify(LegalEntity),
            dataType: "json"
        });
    }
    // Deleting records  
    this.deleteStudent = function (Id) {
        return $http.post('LegalEntity/Delete_Entity/' + Id)
    }
    
});