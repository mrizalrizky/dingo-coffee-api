const moment = require('moment')
const axios = require('axios')
const service = require('../utils/messageHandler')
const { getHeaders, generateCheckSum} = require('../utils/dokuPaymentService')

const dokuApiUrl = process.env.DPOS_DOKU_API_URL
const errResponse = new Error()

const checkoutOrder = async (req, res) => {
    try {
        console.log('REQ.BODY', req.body);
        const { order_id, gross_amount } = req.body
        const payment = fetch(`${process.env.DPOS_MIDTRANS_SNAP_API_URL}/transactions`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(process.env.DPOS_MIDTRANS_SERVER_KEY)}`
            },
            body: JSON.stringify({
                transaction_details: {
                    "order_id": order_id,
                    "gross_amount": gross_amount
                },
            })
        })
        .then(response => response.json())
        .then(data => {
            res.send(data)
        })
    } catch (error) {
        service.throwError(res, error)
    }
}



const checkStatus = (req, res) => {
    try {
        const { invoice_number } = req.params
        const payment = fetch(`${process.env.DPOS_MIDTRANS_API_URL}/${invoice_number}/status`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(process.env.DPOS_MIDTRANS_SERVER_KEY)}`
            },
        })
        .then(response => response.json())
        .then(data => {
            res.send(data)
        })

    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    checkoutOrder,
    checkStatus,
    // payWithOvoWallet,
    // payWithLinkaja,
}