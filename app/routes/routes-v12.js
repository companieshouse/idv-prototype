//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

/*
 * Start page
 */
router.post('/v12/start-page', function (req, res) {
     
    res.redirect('account-interrupt')
    
})


/*
 * We have changed the way you sign in to Companies House 
 */
router.post('/v12/account-interrupt', function (req, res) {
     
    res.redirect('create-or-sign-in')
    
}) 

/*
 * GOV.UK One Login
 */
router.post('/v12/create-or-sign-in', function (req, res) {
     
    res.redirect('one-login-sign-in')
    
}) 


/*
 *  GOV.UK One Login
 */
router.post('/v12/one-login-enter-password', function (req, res) {
     
    
    res.redirect('/v12/enter-code')
    
})

/*
 * GOV.UK One Login
 */
router.post('/v12/enter-code', function (req, res) {


    /*
    * Check to see if the account is verified 
    */
    if (req.session.data['verified-their-id'] == true ) {
        
        res.redirect('saved-application')
    }
    else{

        res.redirect('before-idv')

    }



    /*
      * Important to know where to start each of the journeys
      */

/* 
        if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {

            //sole traders need to verify their identity
            if ((req.session.data['registering-as'] === "sole-trader") && (req.session.data['verified-their-id'] == true )){
            
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
 */

})


/*
 * You need to prove your identity
 */
router.post('/v12/before-idv', function (req, res) {
     
    res.redirect('/v12/verify-identity-prototype')
    
}) 

/*
 * Go to the Verify your identity prototype
 */
router.get('/v12/verify-identity-prototype', function (req, res) {

    // they have have done ID verification 
    req.session.data['verified-their-id'] = true;
     
    res.redirect('https://prove-your-identity-prototype.herokuapp.com/release1-v2/pre-one-login/start?version=sole-trader')
    
}) 


/*
 * sole trader - do you have a uvid 
 */
router.post('/v12/enter-uvid-code', function (req, res) {
     
   
    if ((req.session.data['enter-uvid'] === "yes")){
        
        res.redirect('name')
    }
    // Otherwise ask for their name, address etc.
    else{

        res.redirect('before-idv')
    }

    
})





/*
 * Saved application 
 */
router.post('/v12/saved-application', function (req, res) {


    // new application
    if (req.session.data['startingNew'] === 'yes') {

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
router.post('/v12/type-of-acsp', function (req, res) {


     //Relevant officer
     if (req.session.data['registering-as'] === 'other') {

        res.redirect('type-of-acsp-other')

    }
    else if ((req.session.data['registering-as'] === "sole-trader")){

        res.redirect('statement-relevant-officer') 
    
    }
    
    /*
     * IDV Flow change - Needs to be moved 
     */
    else if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){

        res.redirect('company-lookup') 

    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch")){

        res.redirect('how-are-you-aml-supervised') 

    }


    




    
/* IMPORTANT TO KEEP TO REVIEW NEW IDV FLOWS 
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
    else if ((req.session.data['registering-as'] === "partnership-not-ch")){

        res.redirect('how-are-you-aml-supervised') 

    }
 */

}) 

/*
 * ACSP other business types 
 */
router.post('/v12/type-of-acsp-other', function (req, res) {


    res.redirect('statement-relevant-officer') 

    /* IMPORTANT TO KEEP TO REVIEW STARTING POINTS OF IDV FLOWS 
     if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")) {

        res.redirect('how-are-you-aml-supervised') 

    }
    else{

    } */
    
}) 

// **** HERE ****

/*
 * Confirm they are the relevant officer
 */
router.post('/v12/statement-relevant-officer', function (req, res) {


      //Relevant officer
      if (req.session.data['confirm-relevant-person'] === 'relevant-officer') {

        //sole traders need to verify their identity
        if ((req.session.data['registering-as'] === "sole-trader")){
        
            res.redirect('name')
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
router.post('/v12/how-are-you-aml-supervised', function (req, res) {


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

        if ((req.session.data['how-are-you-aml-supervised'] === "individually") | (req.session.data['how-are-you-aml-supervised'] === "both")){
        
            res.redirect('name')
        }
        else{

            res.redirect('name-of-business') 

        }
        
    }
    
     
    
}) 











/*
 * Registered with Companies House - Company lookup
 */
router.post('/v12/company-lookup', function (req, res) {
     
    res.redirect('confirm-company')
    
})

/*
 * Confirm company
 */
router.post('/v12/confirm-company', function (req, res) {
   
    res.redirect('auth-code')
    
})

/*
 * Auth code  ***have updated this to go to correspondence email as we need to collect this for firms
 */
router.post('/v12/auth-code', function (req, res) {
     
 
    if ((req.session.data['registering-as'] === "ltd") | (req.session.data['registering-as'] === "partnership-ch") | (req.session.data['registering-as'] === "partnership-llp")){

        res.redirect('statement-relevant-officer') 

    }else{

    }





    
})

/*
 * Director selection   
 */
router.post('/v12/director-selection', function (req, res) {
     
    
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
router.post('/v12/check-director-details', function (req, res) {
     
    res.redirect('type-of-business')
    
})

/*
 * What specific type of business are you registering?
 */
router.post('/v12/type-of-business', function (req, res) {


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

router.post('/v12/type-of-business-other', function (req, res) {

 

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
 router.post('/v12/address-principle-lookup', function (req, res) {


     //if house number is empty
     if (req.session.data['principle-name'] === '') {

        res.redirect('address-principle-list')

      } else {
        // go to the confirm address page
        res.redirect('address-principle-confirm')
    
      }
     

    
})

/*
 *  Principle/registered office address list
 */
router.post('/v12/address-principle-list', function (req, res) {
    
     
    res.redirect('address-principle-confirm')
    
})







/*
 *  Principle/registered office address manually entering address
 */
router.post('/v12/address-principle-manual', function (req, res) {
    
     
    res.redirect('address-principle-confirm')
    
})



/*
 *
 * Principle address 
 */
router.post('/v12/address-principle-confirm', function (req, res) {
     
    res.redirect('address-correspondance-selector')
    
})

/*
 *
 * Correspondance address selector
 */
router.post('/v12/address-correspondance-selector', function (req, res) {
     
    if ((req.session.data['address-correspondance-selector'] === "different")){
        
        res.redirect('address-correspondance-lookup')
    }
    else{

        res.redirect('aml-supervisor')

    }
    
})



 

/*
 *  Correspondence email - REMOVED from version 8
*/

router.post('/v12/email-address-correspondance', function (req, res) {
     
    res.redirect('aml-supervisor')
    
})   




/* ******* Sole trader ******* */


/*
 *  Not registered with Companies House - Name
 */
router.post('/v12/name', function (req, res) {

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
router.post('/v12/date-of-birth', function (req, res) {
     
    res.redirect('nationality')
    
})

/*
 *  Not registered with Companies House - Date of birth
 */
router.post('/v12/nationality', function (req, res) {
     
    res.redirect('location-lives')
    
})

/*
 *  Not registered with Companies House - Home address
 */
router.post('/v12/location-lives', function (req, res) {

    res.redirect('name-of-business')    
    
})


/*
 *  Not registered with Companies House - Name of business
 */
router.post('/v12/name-of-business', function (req, res) {
    
    if ((req.session.data['registering-as'] === "sole-trader")){
            
        res.redirect('type-of-business')
    }
    else if ((req.session.data['registering-as'] === "partnership-not-ch") | (req.session.data['registering-as'] === "unincorporated-body") | (req.session.data['registering-as'] === "corporate-body")){
            
            res.redirect('statement-relevant-officer')
    }
    

})

/*
 *   Not registered with Companies House - Business/trading name
 */
router.post('/v12/name-held-with-supervisor', function (req, res) {
     
    res.redirect('type-of-business')
    
})




/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
router.post('/v12/address-correspondance-lookup', function (req, res) {



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
router.post('/v12/address-correspondance-manual', function (req, res) {
    
     
    res.redirect('address-correspondance-confirm')
    
})




/*
 *  Not registered with Companies House - ACSP address 
 */
router.post('/v12/address-correspondance-confirm', function (req, res) {
    
     
    res.redirect('aml-supervisor')
    
})

/*
 *  Not registered with Companies House - ACSP correspondace address confirming lookup ***I've updated this to go to the AML supervisor page as I don't think correspondence email is needed for sole traders. 
 */
router.post('/v12/acsp-address-confirm', function (req, res) {
     
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
 router.post('/v12/aml-supervisor', function (req, res) {
    
    res.redirect('aml-number-MVP')


})


/*
 *  AML number for first supervisor
 */
router.post('/v12/aml-number-MVP', function (req, res) {
     
    res.redirect('name-address-match-supervisor-mvp')
    
})

/*
 *  AML number for second  supervisor
 */
router.post('/v12/aml-number-2', function (req, res) {
     
    res.redirect('name-address-match-supervisor')
    
})



/*
 * Name and address match those held with the supervisor
 */
router.post('/v12/name-address-match-supervisor-mvp', function (req, res) {
     
    res.redirect('terms-and-conditions')
    
})


/*
 *  Terms and conditions
 */
router.post('/v12/terms-and-conditions', function (req, res) {
     
    res.redirect('check-your-answers')
    
}) 

/*
 *  Check your answers
 */
router.post('/v12/check-your-answers', function (req, res) {
     
    res.redirect('payment')
    
})

/*
 *  Payment
 */
router.post('/v12/payment', function (req, res) {
     
    res.redirect('confirmation')
    
})




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

