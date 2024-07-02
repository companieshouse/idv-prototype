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
router.post('/v2-update/index-update', function (req, res) {

    res.redirect('start-page')
    
})




/*
 * Start page 
 */
router.post('/v2-update/update-start-page', function (req, res) {

    if ((req.session.data['prototype-set-up'] === "sole-trader")){
        
        res.redirect('sole-trader-form')
    }
    else if ((req.session.data['prototype-set-up'] === "limited")){
    
        res.redirect('limited-form')
    }
    // Otherwise ask for their name, address etc.
    else if((req.session.data['prototype-set-up'] === "partnerships")){

        res.redirect('partnership-form')
    }
    
})


/*
 * Start page 
 */
router.post('/v2-update/update-form', function (req, res) {


    res.redirect('check-your-answers')
    
})


/*
 * Start page 
 */
router.post('/v2-update/check-your-answers', function (req, res) {

    res.redirect('confirmation')
    
})




module.exports = router

