var admin = angular.module('admin', ['ngRoute', 'ngMaterial', 'ngMessages']);
var config = {
    apiKey: "AIzaSyD3GO4-9oSqSxrhhF-Zcq7FZYdEFsWOGmw",
    authDomain: "temp-df1a5.firebaseapp.com",
    databaseURL: "https://temp-df1a5.firebaseio.com",
    storageBucket: "temp-df1a5.appspot.com",
  };
firebase.initializeApp(config);
var database = firebase.database();
admin.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/basic', {
        templateUrl: '../templates/basic.html',
        controller: 'adminCtrl'
      })
      .when('/edit', {
        templateUrl: '../templates/edit.html',
        controller: 'editCtrl'
      })

    .otherwise({
      redirectTo: '/basic'
    });
  }
]);

var getVendorType = function(x) {
  if (x == 1)
    return "Silver";
  else if (x == 2)
    return "Gold";
  else
    return "Platinum";

}

var getVendorGender = function(x) {
  if (x == 1)
    return "Male";
  else if (x == 2)
    return "Female";
  else if (x == 3)
    return "Unisex";
  else
    return "Kids";

}

admin.controller("adminCtrl", function($scope, $http) {
  $scope.operation = "Submit";
  $scope.states = "";
  $scope.cities = "";
  $scope.times = "";
  $scope.vendor = {
    vendor_name: null,
    vendor_type: null,
    gender_group: null,
    location_id: null,
    address_line1: null,
    address_line2: null,
    landmark: null,
    lat: null,
    lon: null,
    primary_contact_person: null,
    primary_landline_number: null,
    primary_mobile_number: null,
    primary_email_id: null,
    secondary_contact_person: null,
    secondary_landline_number: null,
    secondary_mobile_number: null,
    secondary_email_id: null,
    complaint_contact_person: null,
    complaint_contact_number: null,
    complaint_contact_email: null,
    features: {
      ac: null,
      parking: null,
      tea_coffee: null,
      cc_accepted: null,
      wifi: null
    },
    works: {
      monday: {
        start: null,
        end: null
      },
      tuesday: {
        start: null,
        end: null
      },
      wednesday: {
        start: null,
        end: null
      },
      thursday: {
        start: null,
        end: null
      },
      friday: {
        start: null,
        end: null
      },
      saturday: {
        start: null,
        end: null
      },
      sunday: {
        start: null,
        end: null
      }
    }
  };

  function submit(vendor) {
      database.ref('vendors/').push({
          vendor_name: vendor.vendor_name,
          vendor_type: vendor.vendor_type,
          gender_group: vendor.gender_group,
          location_id: 'asdas',
          address_line1: vendor.address_line1,
          address_line2: vendor.address2,
          landmark: vendor.landmark,
          lat: vendor.latitude,
          lon: vendor.longitude,
          primary_contact_person: vendor.contactpersonname,
          primary_landline_number: vendor.landlineno,
          primary_mobile_number: vendor.phoneno,
          primary_email_id: vendor.emailid,
          secondary_contact_person: vendor.secondarycontactpersonname,
          secondary_landline_number: vendor.secondarylandlineno,
          secondary_mobile_number: vendor.secondaryphoneno,
          secondary_email_id: vendor.secondaryemailid,
          complaint_contact_person: vendor.complaintpersonname,
          complaint_contact_number: vendor.escalationphoneno,
          complaint_contact_email: vendor.escalationemailid,
          features: {
            ac: vendor.ac === undefined ? null: vendor.ac,
            parking: vendor.parking === undefined ? null: vendor.parking,
            tea_coffee: vendor.tea_coffee === undefined ? null: vendor.tea_coffee,
            cc_accepted: vendor.cc_accepted === undefined ? null: vendor.cc_accepted,
            wifi: vendor.wifi === undefined ? null: vendor.wifi
          },
          works: {
            monday: {
              start: vendor.monday_start === undefined ? null: vendor.monday_start,
              end: vendor.monday_end === undefined ? null: vendor.monday_end
            },
            tuesday: {
              start: vendor.tuesday_start === undefined ? null: vendor.tuesday_start,
              end: vendor.tuesday_end === undefined ? null: vendor.tuesday_end
            },
            wednesday: {
              start: vendor.wednesday_start === undefined ? null: vendor.wednesday_start,
              end: vendor.wednesday_end === undefined ? null: vendor.wednesday_end
            },
            thursday: {
              start: vendor.thursday_start === undefined ? null: vendor.thursday_start,
              end: vendor.thursday_end === undefined ? null: vendor.thursday_end
            },
            friday: {
              start: vendor.friday_start === undefined ? null: vendor.friday_start,
              end: vendor.friday_end === undefined ? null: vendor.friday_end
            },
            saturday: {
              start: vendor.saturday_start === undefined ? null: vendor.saturday_start,
              end: vendor.saturday_end === undefined ? null: vendor.saturday_end
            },
            sunday: {
              start: vendor.sunday_start === undefined ? null: vendor.sunday_start,
              end: vendor.sunday_end === undefined ? null: vendor.sunday_end
            }
          }
      }).then(function(data) {
          console.log(data.key);
      });
  }

  $scope.master_start = function() {
    $scope.vendor.sunday_start = $scope.vendor.allstart;
    $scope.vendor.monday_start = $scope.vendor.allstart;
    $scope.vendor.tuesday_start = $scope.vendor.allstart;
    $scope.vendor.wednesday_start = $scope.vendor.allstart;
    $scope.vendor.thursday_start = $scope.vendor.allstart;
    $scope.vendor.friday_start = $scope.vendor.allstart;
    $scope.vendor.saturday_start = $scope.vendor.allstart;

  }

  $scope.master_end = function() {
    $scope.vendor.sunday_end = $scope.vendor.allend;
    $scope.vendor.monday_end = $scope.vendor.allend;
    $scope.vendor.tuesday_end = $scope.vendor.allend;
    $scope.vendor.wednesday_end = $scope.vendor.allend;
    $scope.vendor.thursday_end = $scope.vendor.allend;
    $scope.vendor.friday_end = $scope.vendor.allend;
    $scope.vendor.saturday_end = $scope.vendor.allend;

  }

  $http.get("templates/Data/times.json").success(function(response) {
    $scope.times = response.times;
    console.log(response.times);

  });

  $http.get("templates/Data/data.json").success(function(response) {
    $scope.states = response;
    console.log(response);
  });

  $scope.onClick = function() {
    console.log($scope.vendor.stat);
    angular.forEach($scope.states, function(value, key) {
      if (key == $scope.vendor.stat)
        $scope.cities = value;

    });
    console.log($scope.cities);
  }

  $scope.submit = function() {
    submit($scope.vendor);
  }
 $scope.vendors =[];
  function getVendors() {
    database.ref('vendors/').on('value', function(snapshot) {
      snapshot.forEach(function(data) {
        $scope.vendors.push(data.val());
        console.log($scope.vendors.vendor_id);
        console.log($scope.vendors);
      });
    });
  }
  getVendors();

  function submitRetrieve() {
    if($scope.operation === 'Submit') {
      angular.element(document.getElementById('vendorRetrieve')).addClass('ng-hide');
      angular.element(document.getElementById('vendorUpdateButton')).addClass('ng-hide');
      angular.element(document.getElementById('vendorSubmit')).removeClass('ng-hide');
      angular.element(document.getElementById('vendorSubmitButton')).removeClass('ng-hide');
    }
    else {
      angular.element(document.getElementById('vendorSubmit')).addClass('ng-hide');
      angular.element(document.getElementById('vendorSubmitButton')).addClass('ng-hide');
      angular.element(document.getElementById('vendorRetrieve')).removeClass('ng-hide');
      angular.element(document.getElementById('vendorUpdateButton')).removeClass('ng-hide');
    }
  }
  submitRetrieve();

  $scope.toggle = function() {
    submitRetrieve();
  }

  $scope.fillValues = function() {

  }



});

  