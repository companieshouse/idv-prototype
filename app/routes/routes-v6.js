//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v6/start-page', function (req, res) {
     
    res.redirect('type-of-acsp')
    
})


/*
 * What general type of business are you registering?
 */
router.post('/v6/type-of-acsp', function (req, res) {
  
    res.redirect('statement-relevant-officer')

}) 



/*
 * Confirm they are the relevant officer
 */
router.post('/v6/statement-relevant-officer', function (req, res) {

     
      //Relevant officer
      if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {

        //sole traders need to verify their identity
        if ((req.session.data['registering-as'] === "sole-trader") && (req.session.data['gChangesMade'] == true )){
        
            res.redirect('name')
        }
        else if ((req.session.data['registering-as'] === "sole-trader")){
        
            res.redirect('create-or-sign-in')
        }
        // Otherwise ask for their name, address etc.
        else{
    
            res.redirect('how-are-you-aml-supervised')
        }
        
    }
    // Otherwise take them to a stop screen
    else{

        res.redirect('stop-not-relevant-officer')
    }
    
}) 

/*
 * How are you supervised
 */
router.post('/v6/how-are-you-aml-supervised', function (req, res) {


    //if selected company and they are individually supervised
    if ((req.session.data['how-are-you-aml-supervised'] === "individually")){
        
        res.redirect('aml-interrupt')
    }
    //if they select as a company - Fine
    else{

        res.redirect('create-or-sign-in')
    }
     
    
}) 

/*
 * AML interrupt
 */
router.post('/v6/aml-interrupt', function (req, res) {
     
    res.redirect('create-or-sign-in')
    
}) 




/*
 * You need to prove your identity
 */
router.post('/v6/before-idv', function (req, res) {
     
    res.redirect('https://prove-your-identity-prototype.herokuapp.com/v6/pre-one-login/create-or-sign-in')
    
}) 


/*
 * Sign in 
 */
router.post('/v6/one-login-enter-password', function (req, res) {
     
    
    if ((req.session.data['registering-as'] === "sole-trader")){
        
        // they have have done ID verification 

        res.redirect('/v6/verify-identity-prototype')
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
 * Go to the Verify your identity prototype
 */
router.get('/v6/verify-identity-prototype', function (req, res) {

    // they have have done ID verification 
    req.session.data['gChangesMade'] = true;
     
    res.redirect('https://prove-your-identity-prototype.herokuapp.com/release1-v1/pre-one-login/you-need-to-verify')
    
}) 






/*
 * sole trader - do you have a uvid 
 */
router.post('/v6/enter-uvid-code', function (req, res) {
     
   
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
router.post('/v6/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the trading name
 */
router.post('/v6/after-idv', function (req, res) {
     
   
    res.redirect('name') 

}) 


/*
 * Registered with Companies House - Company lookup
 */
router.post('/v6/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v6/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code  ***have updated this to go to correspondence email as we need to collect this for firms
 */
router.post('/v6/auth-code', function (req, res) {
     
    res.redirect('director-selection')
    
})

/*
 * Director selection   
 */
router.post('/v6/director-selection', function (req, res) {
     
    res.redirect('check-director-details')
    
})

/*
 * Director details check   
 */
router.post('/v6/check-director-details', function (req, res) {
     
    res.redirect('type-of-business')
    
})

/*
 * What specific type of business are you registering?
 */
router.post('/v6/type-of-business', function (req, res) {


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
 router.post('/v6/address-principle-lookup', function (req, res) {
     
    res.redirect('address-principle-confirm')
    
})

/*
 *
 * Principle address 
 */
router.post('/v6/address-principle-confirm', function (req, res) {
     
    res.redirect('address-correspondance-selector')
    
})

/*
 *
 * Correspondance address selector
 */
router.post('/v6/address-correspondance-selector', function (req, res) {
     
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

router.post('/v6/type-of-business-other', function (req, res) {

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

router.post('/v6/email-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})   

/*
 *  Not registered with Companies House - Name
 */
router.post('/v6/name', function (req, res) {
     
    res.redirect('date-of-birth')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v6/date-of-birth', function (req, res) {
     
    res.redirect('nationality')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v6/nationality', function (req, res) {
     
    res.redirect('location-lives')
    
})

/*
 *  Not registered with Companies House - Home address
 */
router.post('/v6/location-lives', function (req, res) {

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
router.post('/v6/name-of-business', function (req, res) {
     
    res.redirect('type-of-business')
    
})




/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
router.post('/v6/address-correspondance-lookup', function (req, res) {



    //if house number is empty
    if (req.session.data['cor-number'] === '') {

        res.redirect('address-correspondance-list')

      } else {
        // go to the confirm address page
        res.redirect('address-correspondance-confirm')
    
      }
     
   
})


/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v6/address-correspondance-confirm', function (req, res) {
    
     
    res.redirect('email-address-correspondance')
    
})

/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup ***I've updated this to go to the AML supervisor page as I don't think correspondence email is needed for sole traders. 
 */
router.post('/v6/acsp-address-confirm', function (req, res) {
     
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
 router.post('/v6/aml-supervisor', function (req, res) {
    
    res.redirect('aml-number')


})


/*
 *  AML number for first supervisor
 */
router.post('/v6/aml-number', function (req, res) {
     
    res.redirect('aml-number-2')
    
})

/*
 *  AML number for second  supervisor
 */
router.post('/v6/aml-number-2', function (req, res) {
     
    res.redirect('name-address-match-supervisor')
    
})



/*
 * Name and address match those held with the supervisor
 */
router.post('/v6/name-address-match-supervisor', function (req, res) {
     
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
router.post('/v6/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v6/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

