//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v10/start-page', function (req, res) {
     
    res.redirect('choose-sign-in')
    
})

/*
 * Saved application 
 */
router.post('/v10/saved-application', function (req, res) {


    // new application
    if (req.session.data['startingNew'] === 'no') {

        res.redirect('type-of-acsp')

    }
     // continue with a saved application
    else{

        res.redirect('your-filings')
    }

    
})




/*
 * What type of business are you registering?
 */
router.post('/v10/type-of-acsp', function (req, res) {

    //Relevant officer
    if (req.session.data['registering-as'] === 'other') {

        res.redirect('type-of-acsp-other')

    }
    else if ((req.session.data['registering-as'] === "sole-trader")){

        res.redirect('statement-relevant-officer') 
    
    }
    else if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){

        res.redirect('company-lookup') 

    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")) {

        res.redirect('how-are-you-aml-supervised') 

    }


}) 

/*
 * ACSP other business types 
 */
router.post('/v10/type-of-acsp-other', function (req, res) {
     
    res.redirect('statement-relevant-officer')
    
}) 



/*
 * Confirm they are the relevant officer
 */
router.post('/v10/statement-relevant-officer', function (req, res) {

     
      //Relevant officer
      if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {

        //sole traders need to verify their identity
        if ((req.session.data['registering-as'] === "sole-trader") && (req.session.data['gChangesMade'] == true )){
        
            res.redirect('name')
        }
        else if ((req.session.data['registering-as'] === "sole-trader")){
        
            res.redirect('before-idv')
        }
        else if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){
    
            res.redirect('how-are-you-aml-supervised') 
    
        }
        else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")) {
    
            res.redirect('type-of-business')
    
        }



        
        
    }
    // Otherwise take them to a stop screen
    else{

        res.redirect('stop-not-relevant-officer')
    }
    
}) 


/* //emma sort 
if ((req.session.data['registering-as'] === "sole-trader")){
        
    // they have not done ID verification 

    res.redirect('/v9/before-idv')
}
//limited company or corporate or PLC or partnership reg with CH
else if ((req.session.data['registering-as'] === "ltd")| (req.session.data['registering-as'] === "partnership-llp")|(req.session.data['registering-as'] === "corporate-body")| (req.session.data['registering-as'] === "public-limited-company")| (req.session.data['registering-as'] === "puc") | (req.session.data['registering-as'] === "partnership-ch")){

    res.redirect('company-lookup')
}
// partnership-not-ch | "unincorporated-body
else{

    res.redirect('name')
} */
 

/*FGFG
 * How are you supervised
 */
router.post('/v10/how-are-you-aml-supervised', function (req, res) {


    //if selected company and they are individually supervised
    if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){

        if ((req.session.data['how-are-you-aml-supervised'] === "individually")){
        
            res.redirect('aml-interrupt')
        }
        else{

            res.redirect('type-of-business') 

        }
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")) {

        if ((req.session.data['how-are-you-aml-supervised'] === "individually")){
        
            res.redirect('name')
        }
        else{

            res.redirect('name-of-business') 

        }
        
    }
    
     
    
}) 


// Migration of account screens 


/*
 * Choose how to sign in
 */
router.post('/v10/choose-sign-in', function (req, res) {
     
  //If they have an existing chs account
  if (req.session.data['sign-in-using'] === 'OL') {
       
    res.redirect('/v10/create-or-sign-in')
  }
  else if (req.session.data['sign-in-using'] === 'CHS') {
        
    res.redirect('/v10/chs-sign-in-email')
  }
  else if (req.session.data['sign-in-using'] === 'new') {
        
    res.redirect('/v10/create-or-sign-in')
  } 
 
    
}) 

/*
 * account interrupt
 */
router.post('/v10/chs-sign-in-email', function (req, res) {
     
    res.redirect('account-interrupt')
    
}) 


/*
 * AML interrupt
 */
router.post('/v10/account-interrupt', function (req, res) {
     
    res.redirect('create-or-sign-in')
    
}) 




/*
 * You need to prove your identity
 */
router.post('/v10/before-idv', function (req, res) {
     
    res.redirect('/v10/verify-identity-prototype')
    
}) 


/*
 * Sign in 
 */
router.post('/v10/one-login-enter-password', function (req, res) {
     
    
    res.redirect('/v10/saved-application')
    
})








/*
 * Go to the Verify your identity prototype
 */
router.get('/v10/verify-identity-prototype', function (req, res) {

    // they have have done ID verification 
    req.session.data['gChangesMade'] = true;
     
    res.redirect('https://prove-your-identity-prototype.herokuapp.com/release1-v2/pre-one-login/start?version=sole-trader')
    
}) 






/*
 * sole trader - do you have a uvid 
 */
router.post('/v10/enter-uvid-code', function (req, res) {
     
   
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
router.post('/v10/gov-login', function (req, res) {
     
    res.redirect('after-idv')
    
}) 

/*
 * You now need to tell us about the trading name
 */
router.post('/v10/after-idv', function (req, res) {
     
   
    res.redirect('name') 

}) 


/*
 * Registered with Companies House - Company lookup
 */
router.post('/v10/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v10/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code  ***have updated this to go to correspondence email as we need to collect this for firms
 */
router.post('/v10/auth-code', function (req, res) {
     
    // res.redirect('type-of-business')

   
    if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){

        res.redirect('statement-relevant-officer') 

    }else{

    }




    
})

/*
 * Director selection   
 */
router.post('/v10/director-selection', function (req, res) {
     
    
    if ((req.session.data['director-selection'] === "not-listed")){
        
        res.redirect('stop-screen-appoint-director')
        
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('check-director-details')
    }
    
    

    
})

/*
 * Director details check   
 */
router.post('/v10/check-director-details', function (req, res) {
     
    res.redirect('type-of-business')
    
})

/*
 * What specific type of business are you registering?
 */
router.post('/v10/type-of-business', function (req, res) {


    //if other is selected

     if ((req.session.data['business-type'] === "other")){
        
        res.redirect('type-of-business-other')
    }
    else if ((req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('address-correspondance-lookup')
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")){
        
        res.redirect('address-principle-lookup')
    }
    // Otherwise ask for their name, address etc.
    else if ((req.session.data['registering-as'] === "ltd")  | (req.session.data['registering-as'] === "partnership-ch") |  (req.session.data['registering-as'] === "corporate-body") |  (req.session.data['registering-as'] === "partnership-llp")  ){

        res.redirect('aml-supervisor')
        
    } 

})

/*
 *  other business type
*/

router.post('/v10/type-of-business-other', function (req, res) {

 

    if ((req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('address-correspondance-lookup')
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") ){
        
        res.redirect('address-principle-lookup')
    }
    // aml supervisor if ltd 
    else if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") |  (req.session.data['registering-as'] === "partnership-llp")  ){

        res.redirect('aml-supervisor')
        
    } 
 

})  



/*
 *
 * Principle/registered office address 
 */
 router.post('/v10/address-principle-lookup', function (req, res) {
     
    res.redirect('address-principle-confirm')
    
})

/*
 *  Principle/registered office address manually entering address
 */
router.post('/v10/address-principle-manual', function (req, res) {
    
     
    res.redirect('address-principle-confirm')
    
})



/*
 *
 * Principle address 
 */
router.post('/v10/address-principle-confirm', function (req, res) {
     
    res.redirect('address-correspondance-selector')
    
})

/*
 *
 * Correspondance address selector
 */
router.post('/v10/address-correspondance-selector', function (req, res) {
     
    if ((req.session.data['address-correspondance-selector'] === "different")){
        
        res.redirect('address-correspondance-lookup')
    }
    else{

        res.redirect('address-correspondance-confirm')

    }
    
})



 

/*
 *  Correspondence email - REMOVED from version 8
*/

router.post('/v10/email-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})   

/*
 *  Not registered with Companies House - Name
 */
router.post('/v10/name', function (req, res) {

    //sole trader 
    if ((req.session.data['registering-as'] === "sole-trader")) {
        
        res.redirect('date-of-birth')
    }
    else{

        res.redirect('name-of-business')


    }

    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v10/date-of-birth', function (req, res) {
     
    res.redirect('nationality')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v10/nationality', function (req, res) {
     
    res.redirect('location-lives')
    
})

/*
 *  Not registered with Companies House - Home address
 */
router.post('/v10/location-lives', function (req, res) {

    res.redirect('name-of-business')    
    
})


/*
 *  Not registered with Companies House - Name of business
 */
router.post('/v10/name-of-business', function (req, res) {

   
    if ((req.session.data['registering-as'] === "sole-trader")){
        
        res.redirect('type-of-business')
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") ){
        
        res.redirect('statement-relevant-officer')
    }
 

    
})

/*
 *  Verison 8 - new - Not registered with Companies House - Business/trading name
 */
router.post('/v10/name-held-with-supervisor', function (req, res) {
     
    res.redirect('type-of-business')
    
})





/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
router.post('/v10/address-correspondance-lookup', function (req, res) {



    //if house number is empty
    if (req.session.data['cor-number'] === '') {

        res.redirect('address-correspondance-list')

      } else {
        // go to the confirm address page
        res.redirect('address-correspondance-confirm')
    
      }
     
   
})

/*
 *  Not registered with Companies House - ACSP address manually entering address
 */
router.post('/v10/address-correspondance-manual', function (req, res) {
    
     
    res.redirect('address-correspondance-confirm')
    
})




/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v10/address-correspondance-confirm', function (req, res) {
    
     
    res.redirect('aml-supervisor')
    
})

/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup ***I've updated this to go to the AML supervisor page as I don't think correspondence email is needed for sole traders. 
 */
router.post('/v10/acsp-address-confirm', function (req, res) {
     
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
 router.post('/v10/aml-supervisor', function (req, res) {
    
    res.redirect('aml-number')


})


/*
 *  AML number for first supervisor
 */
router.post('/v10/aml-number', function (req, res) {
     
    res.redirect('name-address-match-supervisor')
    
})

/*
 *  AML number for second  supervisor
 */
router.post('/v10/aml-number-2', function (req, res) {
     
    res.redirect('name-address-match-supervisor')
    
})



/*
 * Name and address match those held with the supervisor
 */
router.post('/v10/name-address-match-supervisor', function (req, res) {
     
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
router.post('/v10/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v10/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})



module.exports = router

