const oauth2 = require("simple-oauth2");

class OAuthClient {
    /**
     * TODO: this functions on simple-oauth2 v2.0.0
     * Consider updating and refactoring to v5.0.0
     */
    constructor({ oauthOptions }) {
        this.client = oauth2.create(oauthOptions);
        this.token = null;
    }

    async getToken() {
        try {
            if (this.token === null || this.token.expired()) {
                const token = await this.client.clientCredentials.getToken();
                this.token = this.client.accessToken.create(token);
            }
            return this._reduceToken(this.token);
        } catch (err) {
            console.error(`Failed to retrieve oauth token: ${err.message}`);
            throw err;
        }
    }

    _reduceToken(token) {
        return token.token.access_token;
    }
}

module.exports = OAuthClient;
