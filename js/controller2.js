admin.controller("serviceCtrl", function($scope, $rootScope, $stateParams, $mdDialog, $timeout) {
    $scope.editItem = false;
    $scope.vendorListItem = {
        key: "",
        name: ""
    }
    $scope.vendorID = "";
    $scope.vendorID = "";
    $scope.vendorList = [];
    $scope.tvendorService = {};
    $scope.vendorServices = [];
    $scope.vendorServicesFinal = {};
    var userId = "132214988410";
    $scope._oldservice = {};
    $scope.services = [];
    $scope.reset = function() {
        $scope.editItem = false;
        $scope.tvendorService = {};
        $scope.vendorServiceForm.$setPristine();
        $scope.vendorServiceForm.$setUntouched();
    }
    $scope.editVendorService = function(service) {
        $scope._oldservice = service;
        console.log(service);
        $scope.editItem = true;
        $scope.tvendorService = {
            val: {
                serviceName: service.val.serviceName,
                serviceId: service.val.serviceId,
                menuTitle: service.val.menuTitle,
                listPrice: service.val.listPrice,
                customerPrice: service.val.customerPrice,
                fab2uPrice: service.val.fab2uPrice,
                male: service.val.male,
                female: service.val.female,
                kids: service.val.kids,
                duration: service.val.duration
            },
            key: service.key
        };
    }
    $scope.updateServiceInMain = function(service) {
        var updates = {
            serviceName: serviceNameById(service.val.serviceId),
            serviceId: service.val.serviceId,
            menuTitle: service.val.menuTitle,
            listPrice: service.val.listPrice,
            customerPrice: service.val.customerPrice,
            fab2uPrice: service.val.fab2uPrice,
            male: service.val.male == undefined ? null : service.val.male ,
            female: service.val.female == undefined ? null : service.val.female,
            kids: service.val.kids == undefined ? null : service.val.kids,
            duration: service.val.duration
        };
        if($scope._oldservice.val.serviceId != updates.serviceId ) {
            var fix = {};
            fix[$scope._oldservice.key] = null;
            database
            .ref('vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID+'/active/services/'
             +$scope._oldservice.val.serviceId+'/')
            .update(fix);
        }
        database
        .ref('vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID+'/active/services/'
             +service.val.serviceId+'/'+service.key)
        .update(updates)
        .then(function(data) {
            $scope.vendorServiceForm.$setDirty();
            $scope.vendorServiceForm.$setPristine();
        });
        $scope.editItem = false;
        $scope.tvendorService = {};
        $scope.vendorServiceForm.$setPristine();
        $scope.vendorServiceForm.$setUntouched();
    }
    $scope.removeVendorService = function(service) {
        var updates = {};
        updates[service.key] = null;
        database
        .ref('vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID+'/active/services/'
             +service.val.serviceId+'/')
        .update(updates);
    }
    function getServices() {
        $scope.services = [];
        database.ref('services/').once('value', function(snapshot) {
            console.log(snapshot.val());
            // $scope.services = snapshot.val();
            // snapshot.forEach(function(data) {
            //     $scope.services.push({
            //         serviceId: data.val().id,
            //         serviceName: data.val().name
            //     });
            // });
            $scope.services = snapshot.val();
        })
        // .then(function(data) {
        //     console.log(data);
        //     console.log(data.val());
        //     console.log($scope.services);
        // })
        ;
    } // Initializes Vendor Service List In The Form
    function getCities() {
        $scope.vendorCities = [];
        return database.ref().child('/city/data/').once('value', function(snapshot) {
            console.log(snapshot.val());
            // return snapshot.forEach(function(data) {
            //     console.log(data);
            //     $scope.vendorCities.push({
            //         cityId: data.val().id,
            //         cityName: data.val().city
            //     });
            // });
            $scope.vendorCities = snapshot.val();
        });
    } // Initializes Vendor Cities Dropdown In The Form
    function findLocationByCity(id) {
        $scope.vendorLocations = [];
        // return database.ref('/location/data/').orderByKey().equalTo(id).once('value', function(snapshot) {
        //     return snapshot.forEach(function(data) {
        //         return data.forEach(function(item) {
        //             console.log(item.val());
        //             $scope.vendorLocations.push({
        //                 locationName: item.val().locationName,
        //                 locationId: item.val().id
        //             });
        //         });
        //     });
        // });
        return database.ref('/location/data/'+id+'/').once('value', function(snapshot) {
            $scope.vendorLocations = snapshot.val();
            console.log(snapshot.val());
        });

    } // Initializes The Location List For The Corresponding City Clicked
    function findVendorsByLocation(city, location) {
        $scope.vendorList = [];
        return database.ref('vendors/'+city+'/'+location+'/').once('value', function(snapshot) {
            // return snapshot.forEach(function(data) {
            //     console.log(data.val());
            //     $scope.vendorList.push({
            //         vendorId: data.key,
            //         vendorName: data.val().active.vendorName
            //     });
            // });
            $scope.vendorList = snapshot.val();
        });
    } // Initializes The Vendors List For The Corresponding City Clicked
    function fillVendorDetails(id) {
        $scope.vendorID = id;
        database.ref('vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+id+'/active/services/')
        .on('value', function(snapshot) {
            // console.log(snapshot.val());
            // $scope.servics = snapshot.val();
            // $scope.vendorServices = [];
            // snapshot.forEach(function(data) {
            //     data.forEach(function(obj) {
            //         console.log(obj.val());
            //         $scope.vendorServices.push({
            //             val: obj.val(),
            //             key: obj.key
            //         });
            //     });
            // });
            $scope.vendorServices = snapshot.val();
            console.log(snapshot.val());
                
            // $scope.vendorServices = snapshot.val();
            // Left Here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        });
    } // Fill Service Table For The Corresponding Vendor
    function serviceNameById(id) {
        var temp = "";
        angular.forEach($scope.services, function(obj) {
            if(obj.serviceId == id) {
                temp = obj.serviceName;
            }
        });
        return temp;
    } // Find The Service Name For The Corresponding Service Id
    function pushServiceInMain(data) {
        console.log($scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID);
        var temp = {};
        temp = {
            serviceName: serviceNameById(data.val.serviceId),
            serviceId: data.val.serviceId,
            menuTitle: data.val.menuTitle,
            male: data.val.male,
            female: data.val.female,
            kids: data.val.kids,
            duration: data.val.duration,
            listPrice: data.val.listPrice,
            fab2uPrice: data.val.fab2uPrice,
            customerPrice: data.val.customerPrice
        }
        var key = database.ref('vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID+'/active/services/').push().key;
        var updates = {};
        updates['vendors/'+$scope.vendorCity+'/'+$scope.vendorLocation+'/'+$scope.vendorID+'/active/services/'+data.val.serviceId+'/'+key] = temp;
        database.ref().update(updates).then(function(data) {
            $scope.$apply();
        });
    } // Push Service In Firebase
    $scope.pushServiceInMain = function() {
        pushServiceInMain($scope.tvendorService);
        $scope.tvendorService = {};
        $scope.vendorServiceForm.$setPristine();
        $scope.vendorServiceForm.$setUntouched();
    }
    $scope.fillVendorDetails = function(id) {
        fillVendorDetails(id);        
    }
    $scope.findVendorsByLocation = function(city, location) {
        console.log(city);
        console.log(location);
        return $timeout(findVendorsByLocation(city, location));
    }
    $scope.getCities = function() {
        return $timeout(getCities);
    }
    $scope.findLocationByCity = function(id) {
        return $timeout(findLocationByCity(id));
    }
    // $scope.getServices = function() {
    //     // return $timeout(getServices());
    //     getServices();
    // }
    getServices();
});