class Response {
    static send(res, status, data){
        res.json({
            status,
            data,
        })
    }
}
module.exports = Response