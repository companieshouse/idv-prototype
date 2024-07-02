//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


 // ************************ version 1 of update ********************************


/*
 * index page
 */
router.post('/v1-update/index-update', function (req, res) {

    res.redirect('start-page')
    
})




/*
 * Start page 
 */
router.post('/v1-update/update-start-page', function (req, res) {

    res.redirect('choose-data-to-update')
    
})

/*
 * Start page 
 */
router.post('/v1-update/choose-data-to-update', function (req, res) {


    res.redirect('update-form')
    
})

/*
 * Start page 
 */
router.post('/v1-update/update-form', function (req, res) {


    res.redirect('check-your-answers')
    
})


/*
 * Start page 
 */
router.post('/v1-update/check-your-answers', function (req, res) {

    res.redirect('confirmation')
    
})




module.exports = router

