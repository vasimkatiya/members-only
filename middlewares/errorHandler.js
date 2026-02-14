exports.errorHandler = (err, req, res, next) => {
    console.error(err); 

    res.status(err.status || 500).send({
        message: err.message || "Something went wrong",
    });
};