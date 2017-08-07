var listViewModule = angular.module('listView', ['util']);
listViewModule.component('listView', {
    bindings: {
        query: '='
    },
    templateUrl: 'list-view/listView.template.html',
    controller: ['dataSource',
        function MyyListViewControlle(dataSource) {
            this.objects = [];
            var self =this;
            dataSource.getObjects().then(function(response) {
                self.objects = response.data.objects;
            });
            this.commitChanges = function() {
                alert(JSON.stringify(this.objects));
                //$http.post('model/listview.json', this.objects);
            }
        }
    ]
});