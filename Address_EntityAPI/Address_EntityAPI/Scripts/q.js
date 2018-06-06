var app = angular.module("myApp", ['datatables', 'angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http) {
    debugger;

    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "/Test/Get_AllAddress"
        }).then(function (response) {
            $scope.Addresses = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.InsertData = function (isValid) {
        if (isValid) {
            var Action = document.getElementById("btnSave").getAttribute("value");
            if (Action == "Submit") {
                $scope.address = {};
                $scope.address.AddressLine1 = $('#route').val();
                $scope.address.City = $('#locality').val();
                $scope.address.State = $('#administrative_area_level_1').val();
                $scope.address.Country = $('#country').val();
                $scope.address.Zipcode = $('#postal_code').val();
                $http({
                    method: "post",
                    url: "/Test/Insert_Address",
                    datatype: "json",
                    data: JSON.stringify($scope.address)
                }).then(function (response) {
                    alert(response.data);
                    $scope.GetAllData();
                    $('#route').val() = "";
                    $('#locality').val() = "";
                    $('#administrative_area_level_1').val() = "";
                    $('#country').val() = "";
                    $('#postal_code').val() = "";
                })
            }
            else {
                debugger;
                $scope.address = {};
                $scope.address.AddressLine1 = $('#route').val();
                $scope.address.City = $('#locality').val();
                $scope.address.State = $('#administrative_area_level_1').val();
                $scope.address.Country = $('#country').val();
                $scope.address.Zipcode = $('#postal_code').val();
                $scope.address.AddressId = document.getElementById("AddressId_").value;
                $http({
                    method: "post",
                    url: "/Test/Update_Address",
                    datatype: "json",
                    data: JSON.stringify($scope.address)
                }).then(function (response) {
                    alert(response.data);
                    $scope.GetAllData();
                    $('#route').val() = "";
                    $('#locality').val() = "";
                    $('#administrative_area_level_1').val() = "";
                    $('#country').val() = "";
                    $('#postal_code').val() = "";
                    document.getElementById("btnSave").setAttribute("value", "Submit");
                    document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                    document.getElementById("spn").innerHTML = "Add New Address";
                })
            }
        }
    }
   


    $scope.DeleteData = function (address) {
        $http({
            method: "post",
            url: "/Test/Delete_Address",
            datatype: "json",
            data: JSON.stringify(address)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateData = function (address) {
        debugger;
        document.getElementById("AddressId_").value = address.AddressId;
        //$('#route').val() = address.AddressLine1;
        //$('#locality').val() = address.City;
        //$('#administrative_area_level_1').val() = address.State;
        //$('#country').val() = address.Country;
        //$('#postal_code').val() = address.Zipcode;
        $scope.Address = address.AddressLine1;
        $scope.Cit = address.City;
        $scope.St = address.State;
        $scope.Co = address.Country;
        $scope.Code = address.Zipcode;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "CornFlowerblue";
        document.getElementById("spn").innerHTML = "Update Address Information";
    }
})