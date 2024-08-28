//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

//registration
router.use('/', require('./routes/routes-v1.js'))
router.use('/', require('./routes/routes-v2.js'))
router.use('/', require('./routes/routes-v3.js'))
router.use('/', require('./routes/routes-v4.js'))
router.use('/', require('./routes/routes-v5.js'))
router.use('/', require('./routes/routes-v6.js'))
router.use('/', require('./routes/routes-v7.js'))
router.use('/', require('./routes/routes-v8.js'))
router.use('/', require('./routes/routes-v9.js'))
router.use('/', require('./routes/routes-v10.js'))
router.use('/', require('./routes/routes-v11.js'))
router.use('/', require('./routes/routes-v12.js'))
router.use('/', require('./routes/routes-v13.js'))
router.use('/', require('./routes/routes-v14.js'))

//update 
router.use('/', require('./routes/routes-update-v1.js'))
router.use('/', require('./routes/routes-update-v2.js'))
router.use('/', require('./routes/routes-update-v3.js'))