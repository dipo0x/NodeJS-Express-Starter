class Response {
    static send(res, status, data){
        res.status(status).send(data)
    }
}
module.exports = Response