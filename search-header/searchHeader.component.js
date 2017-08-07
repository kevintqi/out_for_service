var searchHeaderModule = angular.module('searchHeader', ['util']);
searchHeaderModule.component('searchHeader', {
    bindings: {
        query: '='
    },
    templateUrl: 'search-header/searchHeader.template.html',
    controller: ['dataSource',
        function SearchHeaderController(dataSource) {
            this.company = {};
            this.query = '';
            var self = this;
            dataSource.getCompany().then(function(response) {
                self.company = response.data.company;
            });
        }
    ]
});