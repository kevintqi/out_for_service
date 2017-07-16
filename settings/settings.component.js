var settingsModule = angular.module('settings', []);
settingsModule.component('settings', {
    templateUrl: 'settings/settings.template.html',
    controller: ['$http',
        function MySettingsController($http) {
            this.showLanguage = true;
            this.settings = {language: 'en'};
            this.saveSettings = function() {
                alert(JSON.stringify(this.settings));
                $http.post('model/settings.json', this.settings);
            }
        }
    ]
});