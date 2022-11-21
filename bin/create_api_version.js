const graphql = require('graphql-request')
const util = require('util')

/**
 * Creates and returns a new API version for a given API
 * @param {*} version_name Version name or number for the new API version
 * @param {*} api_id The id of the API to create a new version for
 * @param {object} client The GraphQL Client object for reuse
 * @returns {string} The id of the newly created API version
 */
async function create_api_version(version_name, api_id, client) {
    const mutation = graphql.gql`
    mutation createApiVersions($apiVersions: [ApiVersionCreateInput!]!) {
        createApiVersions(apiVersions: $apiVersions) {
            id
        }
    }`

    const params = {
        apiVersions: {
            api: api_id,
            name: version_name,
        },
    }

    const data = await client.request(mutation, params)
    // console.log('new version: ' + util.inspect(data))
    // console.log('parsed: ' + data.createApiVersions[0].id)
    return data.createApiVersions[0].id
}

module.exports = { create_api_version }