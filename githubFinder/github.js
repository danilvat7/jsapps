/*jshint esversion: 6 */

class GitHub {
    constructor() {
        this.client_id = 'fe366030f7ca3dd8cf26';
        this.client_secret = 'ec8ccf732963c7bcbb0b8daadd11b388fbe520c6';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();

        return {
            profile
        }
    }
}