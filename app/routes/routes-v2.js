//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v2/start-page', function (req, res) {
     
    res.redirect('sign-in')
    
}) 

/*
 * Sign in 
 */
router.post('/v2/sign-in', function (req, res) {
     
    res.redirect('who-is-registering')
    
}) 

/*
 * Who is completing this registration?
 */
router.post('/v2/who-is-registering', function (req, res) {
     
    //If it is the relevant officer, ask to confirm the statement. 
    if (req.session.data['registering-as'] === 'relevant-officer') {
        
        res.redirect('statement-relevant-officer')
    }
    // Otherwise take them to a stop screen
    else{

        res.redirect('stop-not-relevant-officer')
    }

}) 

/*
 * Confirm you are the relevant officer
 */
router.post('/v2/statement-relevant-officer', function (req, res) {
     
    res.redirect('before-idv')
    
}) 

/*
 * You need to prove your identity
 */
router.post('/v2/before-idv', function (req, res) {
     
    res.redirect('gov-login')
    
}) 

/*
 * You need to prove your identity
 */
router.post('/v2/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the authorised agent
 */
router.post('/v2/after-idv', function (req, res) {
     
    res.redirect('type-of-acsp')
    
}) 

/*
 * What type of business are you registering?
 */
router.post('/v2/type-of-acsp', function (req, res) {
    //If the company type is registered with Companies House, ask the user for the company number. 
    if (req.session.data['registering-as'] === 'corporate' ||  req.session.data['registering-as'] === 'lp-slp') {
        
        res.redirect('company-lookup')
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('acsp-name')
    }

  }) 

/*
 * Registered with Companies House - Company lookup
 */
router.post('/v2/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Auth code
 */
router.post('/v2/auth-code', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})

/*
 *  Not registered with Companies House - ACSP name 
 */
router.post('/v2/acsp-name', function (req, res) {
     
    res.redirect('acsp-address')
    
})

/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v2/acsp-address', function (req, res) {
     
    res.redirect('acsp-address-confirm')
    
})

/*
 *  Not registered with Companies House - ACSP address confirming lookup
 */
router.post('/v2/acsp-address-confirm', function (req, res) {
     
    res.redirect('legal-form')
    
})

/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v2/legal-form', function (req, res) {
     
    res.redirect('check-your-answers')
    
})




/*
 * Confirm company
 */
router.post('/v2/confirm-company', function (req, res) {
    //If the details match with the AML supervisory body
    if (req.session.data['aml-details-match'] === 'yes') {
        
        res.redirect('aml-supervisor')
    }
    // Otherwise take them to the stop screen to update details with CH or AML supervisor
    else{

        res.redirect('stop-details-must-match')
    }

  })

/*
 *  AML supervisory body
 */
router.post('/v2/aml-supervisor', function (req, res) {
     
    res.redirect('aml-number')
    
})

/*
 *  AML number
 */
router.post('/v2/aml-number', function (req, res) {
     
    res.redirect('terms-and-conditions')
    
})

/*
 *  Terms and conditions
 */
router.post('/v2/terms-and-conditions', function (req, res) {
     
    res.redirect('check-your-answers')
    
})

/*
 *  Check your answers
 */
router.post('/v2/check-your-answers', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

