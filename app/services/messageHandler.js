const messageHandler = {
    jsonSuccess: (successCode, successMsg, data) => {
        return {
            "success_response": {
                code: `BPOS-${successCode}`,
                message: successMsg
                
            },
            "data": data ?? null
        }
    },

    jsonFailed: (errorCode, errorMsg) => {
        return {
            "error_response": {
                code: `BPOS-${errorCode}`,
                message: errorMsg
            }
        }
    },
    
    throwError: (res, error) => {
        return res.status(
            error.code || 500
        ).send(
            messageHandler.jsonFailed(error.code || 500, error.message || 'Internal Server Error')
        )
    }
}

module.exports = messageHandler