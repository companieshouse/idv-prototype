//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.use('/', require('./routes/routes-v1.js'))
router.use('/', require('./routes/routes-v2.js'))
router.use('/', require('./routes/routes-v3.js'))
router.use('/', require('./routes/routes-v4.js'))