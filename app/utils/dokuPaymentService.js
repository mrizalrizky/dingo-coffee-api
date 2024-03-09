const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const moment = require('moment')

exports.generateRequestId = () => {
    const requestId = crypto.randomBytes(64).toString('hex')
    return requestId
}

exports.generateDigest = (jsonBody) => {
    const digest = CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(jsonBody)))
    return digest
    // let jsonStringHash256 = crypto.createHash('sha256').update(jsonBody,"utf-8").digest();

    // let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    // return bufferFromJsonStringHash256.toString('base64'); 
}

exports.generateSignature = (clientId, requestId, requestTarget, requestTimestamp, digest, secret) => {
    let componentSignature = "Client-Id:" + clientId;
    componentSignature += "\n";
    componentSignature += "Request-Id:" + requestId;
    componentSignature += "\n";
    componentSignature += "Request-Timestamp:" + requestTimestamp;
    componentSignature += "\n";
    componentSignature += "Request-Target:" + requestTarget;

    if (digest) {
        componentSignature += "\n";
        componentSignature += "Digest:" + digest;
    }

    console.log('COMPONENTTT', componentSignature);

    const hmac256Value = crypto.createHmac('sha256', secret)
                    .update(componentSignature.toString()).digest()

    const bufferFromHMACValue = Buffer.from(hmac256Value)
    const signature = 'HMACSHA256='+bufferFromHMACValue.toString('base64')
    return signature
}

exports.getHeaders = (requestTarget, requestBody = null) => {
    const clientId = process.env.DPOS_DOKU_CLIENT_ID
    const requestId = this.generateRequestId()
    const secretKey = process.env.DPOS_DOKU_SECRET_KEY
    const requestTimestamp = moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
    const formattedBody = JSON.stringify(requestBody).replace(/"/g, '\\"')
    const digest = requestBody ? this.generateDigest(formattedBody) : null
    const signature = this.generateSignature(clientId, requestId, requestTarget, requestTimestamp, digest, secretKey)
    
    const headers = {
        'Client-Id': clientId,
        'Request-Id': requestId,
        'Request-Timestamp': requestTimestamp,
        'Signature': signature,
    }

    return headers
}

exports.generateCheckSum = (orderAmount, clientId, invoiceNum, ovoId, secretKey) => {
    const appendValues = `${orderAmount}${clientId}${invoiceNum}${ovoId}${secretKey}`
    return crypto.createHash('sha256').update(appendValues).digest('hex')
}