//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v3/start-page', function (req, res) {
     
    res.redirect('sign-in')
    
}) 

/*
 * Sign in 
 */
router.post('/v3/sign-in', function (req, res) {
     
    res.redirect('statement-relevant-officer')
    
}) 

/*
 * Who is completing this registration?
 */
router.post('/v3/statement-relevant-officer', function (req, res) {
     
    //If it is the relevant officer, ask to confirm the statement. 
    if (req.session.data['registering-as'] === 'relevant-officer') {
        
        res.redirect('before-idv')
    }
    // Otherwise take them to a stop screen
    else{

        res.redirect('stop-not-relevant-officer')
    }

}) 


/*
 * You need to prove your identity
 */
router.post('/v3/before-idv', function (req, res) {
     
    res.redirect('gov-login')
    
}) 

/*
 * You need to prove your identity
 */
router.post('/v3/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the authorised agent
 */
router.post('/v3/after-idv', function (req, res) {
     
    res.redirect('type-of-acsp')
    
}) 

/*
 * What type of business are you registering?
 */
router.post('/v3/type-of-acsp', function (req, res) {
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
router.post('/v3/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v3/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code
 */
router.post('/v3/auth-code', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})

/*
 *  Not registered with Companies House - ACSP name 
 */
router.post('/v3/acsp-name', function (req, res) {
     
    res.redirect('acsp-address')
    
})

/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v3/acsp-address', function (req, res) {
     
    res.redirect('acsp-address-confirm')
    
})

/*
 *  Not registered with Companies House - ACSP address confirming lookup
 */
router.post('/v3/acsp-address-confirm', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})

 /*
 *  AML supervisory body 
 */
 router.post('/v3/aml-supervisor', function (req, res) {
    
    res.redirect('name-address-match-supervisor')


})


/*
 * Name and address match those held with the supervisor
 */
router.post('/v3/name-address-match-supervisor', function (req, res) {
     
    res.redirect('aml-number')
    
})

/*
 *  AML number
 */
router.post('/v3/aml-number', function (req, res) {
     
    res.redirect('terms-and-conditions')
    
})

/*
 *  Terms and conditions
 */
router.post('/v3/terms-and-conditions', function (req, res) {
     
    res.redirect('check-your-answers')
    
})

/*
 *  Check your answers
 */
router.post('/v3/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v3/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

