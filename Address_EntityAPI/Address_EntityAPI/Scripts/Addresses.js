var app = angular.module("myApp", ['datatables', 'angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http, $rootScope) {
    $(document).ready(function () {
        $("#searchclear").click(function () {
            $("#autocomplete").val('');
        });
        $("#btnSave").click(function () {
            if ($("#autocomplete").val() == "") {
                sweetAlert("Address Is Empty !!", "Please Mention", "error");
            }
            else {
                sweetAlert("Address details Saved Successfully.", "success");
            }
        });
    });

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    debugger;
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "/Address/Get_AllAddress"
        }).then(function (response) {
            $scope.Addresses = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

    $scope.InsertData = function () {
        debugger;
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
                    url: "/Address/Insert_Address",
                    datatype: "json",
                    data: JSON.stringify($scope.address)
                }).then(function (response) {
                    $scope.GetAllData();
                    $scope.Name = "";
                    $scope.Cit = "";
                    $scope.St = "";
                    $scope.Cot = "";
                    $scope.Zip = "";
                })
            }
    };

    $scope.UpdateAddr = function () {
        debugger;
        var address = {
            AddressId: $scope.id,
            AddressLine1: $('#route').val(),
            City: $('#locality').val(),
            State: $('#administrative_area_level_1').val(),
            Country: $('#country').val(),
            Zipcode: $('#postal_code').val()
        }
        $http({
            method: "post",
            url: "/Address/Update_Address",
            datatype: "json",
            data: JSON.stringify(address)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
            $('#route').val() = "";
            $('#locality').val() = "";
            $('#administrative_area_level_1').val() = "";
            $('#country').val() ="";
            $('#postal_code').val() = "";
            document.getElementById("btnSave").setAttribute("value", "Update");
        })
    };


    $scope.UpdateData = function (address) {
        debugger;
        document.getElementById("AddressId_").value = address.AddressId;
        $scope.id = address.AddressId;
        $scope.Address = address.AddressLine1;
        $scope.Cit = address.City;
        $scope.St = address.State;
        $scope.Co = address.Country;
        $scope.Code = address.Zipcode;
        
        //document.getElementById("AddressId_").value = address.AddressId;
        //$scope.id = AddressId;
        //$scope.add1 = AddressLine1;
        //$scope.add2 = City;
        //$scope.add3 = State;
        //$scope.add4 = Country;
        //$scope.add5 = Zipcode;
        //$('#route').val() = AddressLine1,
        //$('#locality').val() = City,
        //$('#administrative_area_level_1').val() = State,
        //$('#country').val() = Country,
        //$('#postal_code').val() = Zipcode
        //AddrService.setSelectedAddress(address);
        //$rootScope.selectedaddress = address;
        //document.getElementById("AddressId_").value = address.AddressId;
        //document.getElementById("route").value = address.AddressLine1;
        //document.getElementById("locality").value = address.City;
        //document.getElementById("administrative_area_level_1").value = address.State;
        //document.getElementById("country").value = address.Country;
        //document.getElementById("postal_code").value=address.Zipcode;
    };

    $scope.DeleteData = function (address) {
        debugger;
        $http({
            method: "post",
            url: "/Address/Delete_Address",
            datatype: "json",
            data: JSON.stringify(address)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
});
