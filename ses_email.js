/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 */

//snippet-sourcedescription:[ses_sendemail.js demonstrates how to compose an Amazon SES email and queue it for sending.]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon Simple Email Service]
//snippet-service:[ses]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide//ses-examples-sending-email.html

// snippet-start:[ses.JavaScript.email.sendEmail]
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// const { nanoid } = require('nanoid');
const env = require("dotenv");
env.config();

const awsConfig = {
    accessKeyId: "PBQSSMWADRK74PZBHOOD",
    secretAccessKey: "q3ORymIhGdUI9VYSehGD7h0/7VtZcIgsqKwUiyPGG70",
    // region: "us-east-1",
}

// Set the region 
AWS.config.update({ region: 'us-east-1' });

const SES = new AWS.SES(awsConfig);

const sendEmail = async () => {
    const email = "dcct.infobancolombia.com"
    // const shortCode = nanoid(6).toUpperCase()

    try {
        // Create sendEmail params 
        const params = {
            Destination: { /* required */
                // CcAddresses: [
                //     'EMAIL_ADDRESS',
                //     /* more items */
                // ],
                ToAddresses: [
                    'yopino@bancolombia.com.co',
                    /* more items */
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: `Código verificación</h1>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `Tu código de verificación es 12345`
                }
            },
            Source: email, /* required */
            ReplyToAddresses: [
                'yopino@bancolombia.com.co',
                /* more items */
            ],
        };

        // Create the promise and SES service object
        // const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

        // // Handle promise's fulfilled/rejected states
        // sendPromise.then(
        //     function (data) {
        //         console.log(data.MessageId);
        //     }).catch(
        //         function (err) {
        //             console.error(err, err.stack);
        //         });
        // snippet-end:[ses.JavaScript.email.sendEmail]

        const sendPromise = await SES.sendEmail(params).promise();

        sendPromise.then(
                function (data) {
                    console.log("Email enviado correctamente", data);
                }).catch(
                    function (err) {
                        console.error(err, err.stack);
                    });

    } catch (error) {
        console.log(error);
    }

}

module.exports = sendEmail