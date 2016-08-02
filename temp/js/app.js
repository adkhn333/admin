var admin = angular.module('admin', ['ngRoute', 'ngMaterial', 'ngMessages']);
var config = {
    apiKey: "AIzaSyCAm8WiABW8aEssyzeEJz1kWoRjuZXZwfQ",
    authDomain: "roofpik-city.firebaseapp.com",
    databaseURL: "https://roofpik-city.firebaseio.com",
    storageBucket: "roofpik-city.appspot.com",
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

admin.controller("editCtrl", function($scope, $http) {
  $scope.fetchedData;
  var mp = {};
  $scope.vendor = [];
  $scope.data = [];

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

  $scope.send = function() {
    var type;
    var gender;
    console.log("Hello edit");
    if ($scope.vendor.type == "Silver")
      type = 1;
    else if ($scope.vendor.type == "Gold")
      type = 2;
    else
      type = 3;
    if ($scope.vendor.gender == "Male")
      gender = 1;
    else if ($scope.vendor.gender == "Female")
      gender = 2;
    else if ($scope.vendor.gender == "Unisex")
      gender = 3;

    else
      gender = 4;

    var vId;
    console.log($scope.vendor.secondarylandlineno);
    $http({
      url: "http://139.162.43.74/updateVendorDetails",
      method: "POST",
      params: {
        vendorId: 1,
        vendorName: $scope.vendor.name,
        trackingId: 0,
        vendorType: type,
        genderGroup: gender,
        locationId: 0,
        addressL1: $scope.vendor.address1,
        addressL2: $scope.vendor.address2,
        landmark: $scope.vendor.landmark,
        lat: $scope.vendor.latitude,
        lon: $scope.vendor.longitude,
        primaryPerson: $scope.vendor.contactpersonname,
        primaryLandline: $scope.vendor.landlineno,
        primaryMobile: $scope.vendor.phoneno,
        primaryEmail: $scope.vendor.emailid,
        secondaryPerson: $scope.vendor.secondarycontactpersonname,
        secondaryLandline: $scope.vendor.secondarylandlineno,
        secondaryMobile: $scope.vendor.secondaryphoneno,
        secondaryEmail: $scope.vendor.secondaryemailid,
        complaintPerson: $scope.vendor.complaintpersonname,
        complaintNumber: $scope.vendor.escalationphoneno,
        complaintEmail: $scope.vendor.escalationemailid,
      }
    }).success(function(response) {
      console.log(response);
      vId = response.vendorId;
      console.log(response.vendorId);
      $http({
        url: "http://139.162.43.74/updateVendorTimings",
        method: "POST",
        params: {
          vendorId: 1,
          trackingId: 0,
          sunday: $scope.data.cb0 == true ? 1 : 0,
          sundayStart: $scope.vendor.sunday_start,
          sundayEnd: $scope.vendor.sunday_end,
          monday: $scope.data.cb1 == true ? 1 : 0,
          mondayStart: $scope.vendor.monday_start,
          mondayEnd: $scope.vendor.monday_end,
          tuesday: $scope.data.cb2 == true ? 1 : 0,
          tuesdayStart: $scope.vendor.tuesday_start,
          tuesdayEnd: $scope.vendor.tuesday_end,
          wednesday: $scope.data.cb3 == true ? 1 : 0,
          wednesdayStart: $scope.vendor.wednesday_start,
          wednesdayEnd: $scope.vendor.wednesday_end,
          thursday: $scope.data.cb4 == true ? 1 : 0,
          thursdayStart: $scope.vendor.thursday_start,
          thursdayEnd: $scope.vendor.thursday_end,
          friday: $scope.data.cb5 == true ? 1 : 0,
          fridayStart: $scope.vendor.friday_start,
          fridayEnd: $scope.vendor.friday_end,
          saturday: $scope.data.cb6 == true ? 1 : 0,
          saturdayStart: $scope.vendor.saturday_start,
          saturdayEnd: $scope.vendor.saturday_end

        }
      }).success(function(response) {
        vendorId = response;
        console.log(response);
        $http({
          url: "http://139.162.43.74/updateVendorFeatures",
          method: "POST",
          params: {
            vendorId: 1,
            trackingId: 0,
            ac: $scope.vendor.ac == true ? 1 : 0,
            parking: $scope.vendor.parking == true ? 1 : 0,
            teaCoffee: $scope.vendor.tea_coffee == true ? 1 : 0,
            ccAccepted: $scope.vendor.cc_accepted == true ? 1 : 0,
            wifi: $scope.vendor.wifi == true ? 1 : 0,

          }
        }).success(function(response) {
          vendorId = response;
          console.log(response);

        })

      })

    })

  }

  $http({
    url: "http://139.162.43.74/getVendorDetailsForUpdate",
    method: "GET",
    params: {

      vendorId: 1

    }

  }).success(function(response) {
    // console.log(response.items);
    $scope.fetchedData = response;
    console.log($scope.fetchedData.items[0]);
    angular.forEach($scope.fetchedData.items[0], function(value, key) {
      mp[key] = value;

    });
    console.log(getVendorType(mp["vendorType"]));
    $scope.vendor.name = mp["vendorName"];
    $scope.vendor.type = getVendorType(mp["vendorType"]),
      $scope.vendor.gender = getVendorGender(mp["genderGroup"]),

      $scope.vendor.address1 = mp["addressL1"],
      $scope.vendor.address2 = mp["addressL2"],
      $scope.vendor.landmark = mp["landmark"],
      $scope.vendor.latitude = mp["lat"],
      $scope.vendor.longitude = mp["lon"],
      $scope.vendor.contactpersonname = mp["primaryPerson"],
      $scope.vendor.landlineno = mp["primaryLandline"],

      $scope.vendor.phoneno = mp["primaryMobile"],
      $scope.vendor.emailid = mp["primaryEmail"],
      $scope.vendor.secondarycontactpersonname = mp["secondaryPerson"],
      $scope.vendor.secondarylandlineno = mp["secondaryLandline"],
      $scope.vendor.secondaryphoneno = mp["secondaryMobile"],
      $scope.vendor.secondaryemailid = mp["secondaryEmail"],
      $scope.vendor.complaintpersonname = mp["complaintPerson"],
      $scope.vendor.escalationemailid = mp["complaintNumber"],
      $scope.vendor.escalationphoneno = mp["complaintEmail"]

  })
  $http({
    url: "http://139.162.43.74/getVendorFeaturesForUpdate",
    method: "GET",
    params: {

      vendorId: 1

    }

  }).success(function(response) {
    // console.log(response.items);
    $scope.fetchedData = response;
    console.log($scope.fetchedData.items[0]);
    angular.forEach($scope.fetchedData.items[0], function(value, key) {
      mp[key] = value;

    });

    $scope.vendor.parking = (mp["parking"] == 1 ? true : false),
      $scope.vendor.tea_coffee = (mp["teaCoffee"] == 1 ? true : false),
      $scope.vendor.cc_accepted = (mp["ccAccepted"] == 1 ? true : false),
      $scope.vendor.wifi = (mp["wifi"] == 1 ? true : false),
      $scope.vendor.ac = (mp["AC"] == 1 ? true : false)

  })
  $http({
    url: "http://139.162.43.74/getVendorTimingsForUpdate",
    method: "GET",
    params: {

      vendorId: 1

    }

  }).success(function(response) {
    // console.log(response.items);
    $scope.fetchedData = response;
    console.log($scope.fetchedData.items[0]);
    angular.forEach($scope.fetchedData.items[0], function(value, key) {
      mp[key] = value;
      console.log(value);
    });
    console.log(mp["sunday"] + "hello");

    $scope.data.cb0 = (mp["sunday"] == 1) ? true : false,
      $scope.data.cb1 = (mp["monday"] == 1) ? true : false,
      $scope.data.cb2 = (mp["tuesday"] == 1) ? true : false,
      $scope.data.cb3 = (mp["wednesday"] == 1) ? true : false,
      $scope.data.cb4 = (mp["thursday"] == 1) ? true : false,
      $scope.data.cb5 = (mp["friday"] == 1) ? true : false,
      $scope.data.cb6 = (mp["saturday"] == 1) ? true : false,
      console.log("hello" + mp["sundayStart"])
    $scope.vendor.sunday_start = (mp["sundayStart"]);
    $scope.vendor.monday_start = mp["mondayStart"];
    $scope.vendor.tuesday_start = mp["tuesdayStart"];
    $scope.vendor.wednesday_start = mp["wednesdayStart"];
    $scope.vendor.thursday_start = mp["thursdayStart"];
    $scope.vendor.friday_start = mp["fridayStart"];
    $scope.vendor.saturday_start = mp["saturdayStart"];
    $scope.vendor.sunday_end = mp["sundayEnd"];
    $scope.vendor.monday_end = mp["mondayEnd"];
    $scope.vendor.tuesday_end = mp["tuesdayEnd"];
    $scope.vendor.wednesday_end = mp["wednesdayEnd"];
    $scope.vendor.thursday_end = mp["thursdayEnd"];
    $scope.vendor.friday_end = mp["fridayEnd"];
    $scope.vendor.saturday_end = mp["saturdayEnd"];

  })

});

admin.controller("adminCtrl", function($scope, $http) {
  $scope.states = "";
  $scope.cities = "";
  $scope.times = "";
  $scope.vendor = [];

  function submit(vendor) {
      database.ref('vendors/').push({
          vendor_name: vendor.name,
          vendor_type: vendor.type,
          gender_group: vendor.gender,
          location_id: 'asdas',
          address_line1: vendor.address1,
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
          complaint_contact_email: vendor.escalationemailid
      }).then(function(data) {
          console.log(data);
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


});

  