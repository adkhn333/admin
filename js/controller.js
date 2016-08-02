admin.controller("adminCtrl", function($scope, $http, $rootScope, $state, $mdDialog, $timeout) {
  $scope.ifSubmit = true;
  var userId = "132214988410";
  $scope.vendorID = "";
  $scope.times = "";
  $scope.editItem = false;
  $scope.cities = [];
  $scope.locations = [];
  $scope.vendorVersion = {
    //This is the foreign Key
    versionNo: "null",
    id: "null",
    subVersion: "null",
    active: false,
    live: false,
    editable: true,
    createdBy: "null",
    createdDate: "null",
    submittedDate: "null",
    liveTime: "null",
    comments: "null",
  }
  $scope.vendorVersionComment = {
    createdBy: "null",
    userName: "null",
    createdTime: "null",
    text: "null"
  }
  $scope.vendors =[];
  /* City/Location Dummy Value */
  function save(vendor, vendorVersion) { 
    var key = database.ref().child('vendors').push().key;
    console.log(key);
    var updates = {};
    updates['vendors/'+$scope.vendor.address.cityId+'/'+$scope.vendor.address.locationId+'/'+key+'/active/'] = vendor;
    updates['vendorsVersion/'+$scope.vendor.address.cityId+'/'+$scope.vendor.address.locationId+'/'+key+'/active/'] = vendorVersion;
    database.ref().update(updates).then(function(data) {
      console.log('Successfully Submitted');
      $scope.vendor = {}; 
      $scope.vendorform.$setPristine();
      $scope.vendorform.$setUntouched();
      $scope.ifSubmit = true;
      $scope.$apply();
    });
  } //Save Form Details
  function getDateTime() {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {
          var month = '0'+month;
      }
      if(day.toString().length == 1) {
          var day = '0'+day;
      }   
      if(hour.toString().length == 1) {
          var hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
          var minute = '0'+minute;
      }
      if(second.toString().length == 1) {
          var second = '0'+second;
      }   
      var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
      return dateTime;
  } // Gets Date And Time In The Format YYYY/MM/DD  HH:MM:SS
  function getCities() {
    $scope.cities = [];
    return database.ref().child('/city/data/').once('value', function(snapshot) {
      console.log(snapshot.val());
      return snapshot.forEach(function(data) {
        console.log(data);
        $scope.cities.push({
          cityId: data.val().id,
          cityName: data.val().city
        });
      });
    });
  } // Initializes The City List From The Firebase
  function findLocationForCity(id) {
    $scope.locations = [];
    return database.ref('/location/data/').orderByKey().equalTo(id).once('value', function(snapshot) {
      return snapshot.forEach(function(data) {
        return data.forEach(function(item) {
          console.log(item.val());
          $scope.locations.push({
            locationName: item.val().locationName,
            locationId: item.val().id
          });
          console.log($scope.locations);
        });
      });
    });
  } // Initializes The Location List For The Corresponding City Clicked
  $http.get("data/times.json").success(function(response) {
    $scope.times = response.times;
    console.log(response.times);
  }); // Initializes The Time List From The JSON File
  $scope.submit = function() {
    if($scope.vendorform.$valid) {
      //Disable Submit Button Until Time Being Form Is Saving
      $scope.ifSubmit = false;

      $scope.vendor.createdBy = userId;
      $scope.vendor.createdDate = getDateTime();
      $scope.vendor.updatedDate = getDateTime();
      
      $scope.vendorVersion.createdBy = userId;
      $scope.vendorVersion.createdDate = getDateTime();
      $scope.vendorVersion.submittedDate = getDateTime();
      
      save($scope.vendor, $scope.vendorVersion);
    }    
  }
  $scope.update = function(ev) {
    $scope.vendor.updatedDate = getDateTime();
    $scope.vendorVersion.submittedDate = getDateTime();
    update($scope.vendor, $scope.vendorVersion, $scope.vendorID, ev);
  }
  $scope.fillValues = function(key) {
    $scope.vendorID = key;
    fillValues(key);
  }
  $scope.master_start = function() {
    $scope.vendor.working.sunday.start = $scope.data.allstart;
    $scope.vendor.working.monday.start = $scope.data.allstart;
    $scope.vendor.working.tuesday.start = $scope.data.allstart;
    $scope.vendor.working.wednesday.start = $scope.data.allstart;
    $scope.vendor.working.thursday.start = $scope.data.allstart;
    $scope.vendor.working.friday.start = $scope.data.allstart;
    $scope.vendor.working.saturday.start = $scope.data.allstart;
  }
  $scope.master_end = function() {
    $scope.vendor.working.sunday.end = $scope.data.allend;
    $scope.vendor.working.monday.end = $scope.data.allend;
    $scope.vendor.working.tuesday.end = $scope.data.allend;
    $scope.vendor.working.wednesday.end = $scope.data.allend;
    $scope.vendor.working.thursday.end = $scope.data.allend;
    $scope.vendor.working.friday.end = $scope.data.allend;
    $scope.vendor.working.saturday.end = $scope.data.allend;
  }
  $scope.getCities = function() {
    return $timeout(getCities);
  }
  $scope.findLocationForCity = function(id) {
    return $timeout(findLocationForCity(id));
  }
  $scope.toggle = function() {
    submitRetrieve();
    getVendors();
  }
  //save($scope.vendor, $scope.vendorVersion);
  //update({temp:"null"}, $scope.vendorVersion, '-KKN4uWo3s90uleixBo8');
});

