admin.factory('Toast', function($mdToast) {
    var Toast = {};
    Toast = {
        showToast: function(status) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(status)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    };
    return Toast;
})