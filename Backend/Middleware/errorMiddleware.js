export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 900;
    res
        .status(statusCode)
        .send({
            message: err.message,
            stack: err.stack,
        })

}
