var searchHeaderModule = angular.module('searchheader', ['util']);
searchHeaderModule.component('searchheader', {
    bindings: {
        query: '='
    },
    templateUrl: 'searchheader/searchheader.template.html',
    controller: ['dataSource',
        function SearchHeaderController(dataSource) {
            this.company = {};
            this.query = '';
            var self = this;
            dataSource.getStatic().then(function(response) {
                self.company = response.data.company;
            });
        }
    ]
});