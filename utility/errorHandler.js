const {response}=require('./response');
//for validation error
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

}

//for checking error instance
const error = (err, req, res, next) => {
    let result ;
    if (err instanceof ValidationError) {
        result =response( false,err.message,[]);
    }
    else if (err instanceof Error) {
        result =response( false, err.message,[]);

    }
    res.status(400).send(result).end();
}





module.exports = { error, ValidationError }