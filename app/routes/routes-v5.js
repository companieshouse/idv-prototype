//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v5/start-page', function (req, res) {
     
    res.redirect('type-of-acsp')
    
})


/*
 * What general type of business are you registering?
 */
router.post('/v5/type-of-acsp', function (req, res) {
  
    res.redirect('statement-relevant-officer')

}) 



/*
 * Confirm they are the relevant officer
 */
router.post('/v5/statement-relevant-officer', function (req, res) {

     
      //Relevant officer
      if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {

        //sole traders need to verify their identity
        if ((req.session.data['registering-as'] === "sole-trader")){
        
            res.redirect('sign-in')
        }
        // Otherwise ask for their name, address etc.
        else{
    
            res.redirect('sign-in')
        }
        
    }
    // Otherwise take them to a stop screen
    else{

        res.redirect('stop-not-relevant-officer')
    }
    
}) 

/*
 * You need to prove your identity
 */
router.post('/v5/before-idv', function (req, res) {
     
    res.redirect('sign-in')
    
}) 


/*
 * Sign in 
 */
router.post('/v5/sign-in', function (req, res) {
     
    if ((req.session.data['registering-as'] === "sole-trader") && req.session.data['gChangesMade'] == true ){
        

        res.redirect('name')
    }
    else if ((req.session.data['registering-as'] === "sole-trader")){
        
        // they have have done ID verification 
        req.session.data['gChangesMade'] = true;

        res.redirect('before-idv')
    }
    //limited company or corporate or PLC or partnership reg with CH
    else if ((req.session.data['registering-as'] === "ltd")| (req.session.data['registering-as'] === "corporate-body")| (req.session.data['registering-as'] === "public-limited-company")| (req.session.data['registering-as'] === "puc") | (req.session.data['registering-as'] === "partnership-ch")){

        res.redirect('company-lookup')
    }
    // partnership-not-ch | "unincorporated-body
    else{

        res.redirect('name')
    }

    
})


/*
 * sole trader - do you have a uvid 
 */
router.post('/v5/enter-uvid-code', function (req, res) {
     
   
    if ((req.session.data['enter-uvid'] === "yes")){
        
        res.redirect('name')
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('before-idv')
    }

    
})



/*
 * You need to prove your identity
 */
router.post('/v5/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the trading name
 */
router.post('/v5/after-idv', function (req, res) {
     
   
    res.redirect('name') 

}) 


/*
 * Registered with Companies House - Company lookup
 */
router.post('/v5/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v5/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code  ***have updated this to go to correspondence email as we need to collect this for firms
 */
router.post('/v5/auth-code', function (req, res) {
     
    res.redirect('director-selection')
    
})

/*
 * Director selection   
 */
router.post('/v5/director-selection', function (req, res) {
     
    res.redirect('check-director-details')
    
})

/*
 * Director details check   
 */
router.post('/v5/check-director-details', function (req, res) {
     
    res.redirect('type-of-business')
    
})

/*
 * What specific type of business are you registering?
 */
router.post('/v5/type-of-business', function (req, res) {


    //if other is selected

    if ((req.session.data['business-type'] === "other")){
        
        res.redirect('type-of-business-other')
    }
    else if ((req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('address-correspondance-lookup')
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") ){
        
        res.redirect('address-principle-lookup')
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('email-address-correspondance')
    } 

})



/*
 *
 * Principle/registered office address 
 */
 router.post('/v5/address-principle-lookup', function (req, res) {
     
    res.redirect('address-principle-confirm')
    
})

/*
 *
 * Principle address 
 */
router.post('/v5/address-principle-confirm', function (req, res) {
     
    res.redirect('address-correspondance-selector')
    
})

/*
 *
 * Correspondance address selector
 */
router.post('/v5/address-correspondance-selector', function (req, res) {
     
    if ((req.session.data['address-correspondance-selector'] === "different")){
        
        res.redirect('address-correspondance-lookup')
    }
    else{

        res.redirect('address-correspondance-confirm')

    }
    
})



/*
 *  other business type
*/

router.post('/v5/type-of-business-other', function (req, res) {

    if ((req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('address-correspondance-lookup')
    }
    else{

        res.redirect('email-address-correspondance')

    }


     
    
})   





/*
 *  Correspondence email
*/

router.post('/v5/email-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})   

/*
 *  Not registered with Companies House - Name
 */
router.post('/v5/name', function (req, res) {
     
    res.redirect('date-of-birth')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v5/date-of-birth', function (req, res) {
     
    res.redirect('nationality')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v5/nationality', function (req, res) {
     
    res.redirect('location-lives')
    
})

/*
 *  Not registered with Companies House - Home address
 */
router.post('/v5/location-lives', function (req, res) {

        //if sole trader go to correspondance address page
    if ((req.session.data['registering-as'] == "sole-trader")){
        
        res.redirect('type-of-business')
    }
    // Otherwise ask for their business name, address etc.
    else{

        res.redirect('name-of-business')
    } 
    
    
})


/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v5/name-of-business', function (req, res) {
     
    res.redirect('type-of-business')
    
})




/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
router.post('/v5/address-correspondance-lookup', function (req, res) {


     
    res.redirect('address-correspondance-confirm')
    
})


/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v5/address-correspondance-confirm', function (req, res) {
    
     
    res.redirect('email-address-correspondance')
    
})

/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup ***I've updated this to go to the AML supervisor page as I don't think correspondence email is needed for sole traders. 
 */
router.post('/v5/acsp-address-confirm', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})


/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup

router.post('/v5/acsp-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})   */



 /*
 *  AML supervisory body 
 */
 router.post('/v5/aml-supervisor', function (req, res) {
    
    res.redirect('aml-number')


})


/*
 *  AML number for first supervisor
 */
router.post('/v5/aml-number', function (req, res) {
     
    res.redirect('aml-number-2')
    
})

/*
 *  AML number for second  supervisor
 */
router.post('/v5/aml-number-2', function (req, res) {
     
    res.redirect('name-address-match-supervisor')
    
})



/*
 * Name and address match those held with the supervisor
 */
router.post('/v5/name-address-match-supervisor', function (req, res) {
     
    res.redirect('check-your-answers')
    
})


/*
 *  Terms and conditions
 
router.post('/v5/terms-and-conditions', function (req, res) {
     
    res.redirect('check-your-answers')
    
}) */

/*
 *  Check your answers
 */
router.post('/v5/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v5/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

