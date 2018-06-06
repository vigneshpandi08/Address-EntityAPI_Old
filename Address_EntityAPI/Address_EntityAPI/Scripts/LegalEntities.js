var app = angular.module("myApp", ['datatables', 'angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http) {

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    debugger;
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "/LegalEntity/Get_AllEntity"
        }).then(function (response) {
            $scope.LegalEntities = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

    $scope.InsertData = function (isValid) {
        debugger;
        if (isValid) {
            debugger;
                var Action = document.getElementById("btnSave").getAttribute("value");
                if (Action == "Submit") {
                    $scope.entity = {};
                    $scope.entity.EntityName = $scope.Name;
                    $scope.entity.Abbreviation = $scope.Abbr;
                    $http({
                        method: "post",
                        url: "/LegalEntity/Insert_Entity",
                        datatype: "json",
                        data: JSON.stringify($scope.entity)
                    }).then(function (response) {
                        $scope.GetAllData();
                        $scope.Name = "";
                        $scope.Abbr = "";
                    })
                }
        }
    };

    $scope.UpdateDetails = function () {
        if (($scope.Name != undefined && $scope.Name != '') && ($scope.Abbr != undefined && $scope.Abbr != '')) {
            var entity = {
                EntityId: $scope.id,
                EntityName: $scope.Name,
                Abbreviation: $scope.Abbr
            }
            $http({
                method: "post",
                url: "/LegalEntity/Update_Entity",
                datatype: "json",
                data: JSON.stringify(entity)
            }).then(function (response) {
                $scope.GetAllData();
                $scope.Name = "";
                $scope.Abbr = "";
                //$('#addEntity').modal('toggle');
                document.getElementById("btnUpdate").setAttribute("value", "Update");
            })
        }
    };
    debugger;
    $scope.UpdateEmp = function (entity) {
        debugger;
        document.getElementById("EntityId_").value = entity.EntityId;
        $scope.id = entity.EntityId;
        $scope.Name = entity.EntityName;
        $scope.Abbr = entity.Abbreviation;
    };
    debugger;
    $scope.DeleteEmp = function (entity) {
        $http({
            method: "post",
            url: "/LegalEntity/Delete_Entity",
            datatype: "json",
            data: JSON.stringify(entity)
        }).then(function (response) {
            sweetAlert("Entity details deleted Successfully.", "success");
            $scope.GetAllData();
        })
    };

});
