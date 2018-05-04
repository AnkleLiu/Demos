/**
 * Created by Uncle Liu on 2017/12/28.
 */
const jsonResponse = (request, response, dict) => {
    response.json(dict)
}

module.exports = {
    jsonResponse: jsonResponse,
}