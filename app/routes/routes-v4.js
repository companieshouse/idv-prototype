//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v4/start-page', function (req, res) {
     
    res.redirect('type-of-acsp')
    
})


/*
 * What general type of business are you registering?
 */
router.post('/v4/type-of-acsp', function (req, res) {
  
    res.redirect('type-of-business')

}) 

/*
 * What specific type of business are you registering?
 */
router.post('/v4/type-of-business', function (req, res) {
  
    res.redirect('statement-relevant-officer')

})




/*
 * Confirm they are the relevant officer
 */
router.post('/v4/statement-relevant-officer', function (req, res) {
     
      //If it is the relevant officer, ask to confirm the statement. 
      if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {
        
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
router.post('/v4/before-idv', function (req, res) {
     
    res.redirect('sign-in')
    
}) 


/*
 * You need to prove your identity
 */
router.post('/v4/sign-in', function (req, res) {
     
    res.redirect('gov-login')
    
})


/*
 * You need to prove your identity
 */
router.post('/v4/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the authorised agent
 */
router.post('/v4/after-idv', function (req, res) {
     
    //If the company type is registered with Companies House, ask the user for the company number. 
    if ((req.session.data['registering-as'] === "partnership") ||  (req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('acsp-name') 
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('company-lookup')
    }

}) 


/*
 * Registered with Companies House - Company lookup
 */
router.post('/v4/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v4/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code
 */
router.post('/v4/auth-code', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})

/*
 *  Not registered with Companies House - ACSP name 
 */
router.post('/v4/acsp-name', function (req, res) {
     
    res.redirect('acsp-address')
    
})

/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v4/acsp-address', function (req, res) {
     
    res.redirect('acsp-address-confirm')
    
})

/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup
 */
router.post('/v3/acsp-address-confirm', function (req, res) {
     
    res.redirect('acsp-address-correspondance')
    
})


/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup
 */
router.post('/v4/acsp-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})



 /*
 *  AML supervisory body 
 */
 router.post('/v4/aml-supervisor', function (req, res) {
    
    res.redirect('name-address-match-supervisor')


})


/*
 * Name and address match those held with the supervisor
 */
router.post('/v4/name-address-match-supervisor', function (req, res) {
     
    res.redirect('aml-number')
    
})

/*
 *  AML number
 */
router.post('/v4/aml-number', function (req, res) {
     
    res.redirect('terms-and-conditions')
    
})

/*
 *  Terms and conditions
 */
router.post('/v4/terms-and-conditions', function (req, res) {
     
    res.redirect('check-your-answers')
    
})

/*
 *  Check your answers
 */
router.post('/v4/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v4/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

