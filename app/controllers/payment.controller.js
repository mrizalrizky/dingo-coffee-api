const moment = require('moment')
const axios = require('axios')
const service = require('../services/messageHandler')
const { getHeaders, generateCheckSum} = require('../services/dokuPaymentService')

const dokuApiUrl = process.env.DPOS_DOKU_API_URL
const errResponse = new Error()

const checkoutOrder = async (req, res) => {
    try {
        const { invoice_number, invoice_amount } = req.body
        const targetEndpoint = `/checkout/v1/payment`
        const fullEndpoint = `${dokuApiUrl}${targetEndpoint}`

        const allowedPayments = ['EMONEY_OVO', 'QRIS', 'EMONEY_DANA', 'JENIUS_PAY', 'VIRTUAL_ACCOUNT_BCA']
        const body = {
            order: {
                invoice_number: invoice_number,
                amount: invoice_amount,
            },
            payment: {
                payment_due_date: 60,
                payment_method_types: allowedPayments
            },
        }
        console.log('bodyyy', body);

        const headers = getHeaders(targetEndpoint, body)
        console.log('headers', headers);
        const options = {
            method: 'POST',
            headers: headers,
            body: body
        }

        const data = fetch(fullEndpoint, options)
        .then(response => response.json())
        .then(data2 => {
            res.send(data2)
        })

    } catch (error) {
        service.throwError(res, error)
    }
}

const checkStatus = (req, res) => {
    try {
        const { invoice_number } = req.params
        const targetEndpoint = `/orders/v1/status/${invoice_number}`
        const fullEndpoint = `${dokuApiUrl}${targetEndpoint}`

        const headers = getHeaders(targetEndpoint)
        const options = {
            method: 'GET',
            headers: headers
        }

        const data = fetch(fullEndpoint, options)
        .then(response => response.json())
        .then(data2 => {
            res.send(data2)
        })

    } catch (error) {
        service.throwError(res, error)
    }
}

const payWithOvoWallet = (req, res) => {
    try {
        const { ovo_number, invoice_number, invoice_amount } = req.body
        const targetEndpoint = `/ovo-emoney/v1/payment`
        const fullEndpoint = `${dokuApiUrl}${targetEndpoint}`

        const checkSum = generateCheckSum(invoice_amount, process.env.DPOS_DOKU_CLIENT_ID, invoice_number, ovo_number, process.env.DPOS_DOKU_SECRET_KEY)

        const body = {
            order: {
                invoice_number: invoice_number,
                amount: invoice_amount
            },
            ovo_info: {
                ovo_id: ovo_number
            },
            client: {
                id: process.env.DPOS_DOKU_CLIENT_ID
            },
            security: {
                check_sum: checkSum
            }
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        const data = fetch(fullEndpoint, options)
        .then(response => response.json())
        .then(data2 => {
            console.log('DATA2', data2);
            const newData = {
                order: { ...data2.order },
                ovo_info: { ...data2.ovo_info },
                ovo_configuration: { ...data2.ovo_configuration },
                ovo_payment: { ...data2.ovo_payment }
            }
            res.send(newData)
        })
        
    } catch (error) {
        service.throwError(res, error)
    }
}

const payWithLinkaja = (req, res) => {
    try {
        const { invoice_number, invoice_amount, callback_url, line_items } = req.body
        const targetEndpoint = `/linkaja-emoney/v2/ServiceRequestPayment`
        const fullEndpoint = `${dokuApiUrl}${targetEndpoint}`
        
        const body = {
            order: {
                invoice_number: invoice_number,
                amount: invoice_amount,
                callback_url: callback_url,
                line_items: line_items
            }
        }

        const headers = getHeaders(targetEndpoint, body)

        const options = {
            method: 'POST',
            headers: headers,
            body: body
        }

        const data = fetch(fullEndpoint, options)
        .then(response => response.json())
        .then(data2 => {
            res.send(data2)
        })
        
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    checkoutOrder,
    checkStatus,
    payWithOvoWallet,
    payWithLinkaja,
}