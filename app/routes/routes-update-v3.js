//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


 // Update journey based on check your answers and looping through components back to the check your answers page with a tag - pending update added

/*
 * Index page
 */
router.post('/v3-update/index-update', function (req, res) {

    res.redirect('start-page')
    
})

/*
 * Start page 
 */
router.post('/v3-update/start-page', function (req, res) {


    res.redirect('check-your-answers')

    
})

/*
 * Name 
 */
router.post('/v3-update/pages/name', function (req, res) {

    //set name updated to TRUE
    req.session.data['name-has-been-updated'] = true;

    res.redirect('../check-your-answers')
    
})


/*
 * Business name 
 */
router.post('/v3-update/pages/name-of-business', function (req, res) {

    //set business name updated to TRUE
    req.session.data['business-name-has-been-updated'] = true;

    res.redirect('../check-your-answers')

})



/*
 * Location they live 
 */
router.post('/v3-update/pages/location-lives', function (req, res) {

    //location-lives updated to TRUE
    req.session.data['location-has-been-updated'] = true;

    res.redirect('../check-your-answers')

})


/*
 * Principle/registered office address 
 */
router.post('/v3-update/pages/address-principle-lookup', function (req, res) {


    //if house number is empty
    if (req.session.data['principle-name'] === '') {

       res.redirect('address-principle-list')

     } else {
       // go to the confirm address page
       res.redirect('address-principle-confirm')
   
     }
    
   
})



/*
 * Location they live 
 */
router.post('/v3-update/pages/email-address-correspondance', function (req, res) {

    //location-lives updated to TRUE
    req.session.data['email-has-been-updated'] = true;

    res.redirect('../check-your-answers')

})



/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
    router.post('/v3-update/pages/address-correspondance-lookup', function (req, res) {


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
    router.post('/v3-update/pages/address-correspondance-manual', function (req, res) {
        
         
        res.redirect('address-correspondance-confirm')
        
    })
    
    
    /*
     *  Correspondance address confirm
     */
    
    router.post('/v3-update/pages/address-correspondance-confirm', function (req, res) {
        
         
        res.redirect('../check-your-answers')
        
    })
    



    /*
     *  AML supervisory body -- add
     */
    
    router.post('/v3-update/pages/aml-supervisor', function (req, res) {
        
         
        res.redirect('aml-number-MVP')
            
    })

    /*
     *  AML supervisory body -- add 
     */
    
    router.post('/v3-update/pages/aml-number-MVP', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        req.session.data['new-aml-details'] = true;

        res.redirect('../check-your-answers')
            
    })

    /*
     *  AML supervisory body -- remove 
     */
    
    router.get('/v3-update/pages/remove-aml-details', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        req.session.data['aml-1-has-been-removed'] = true;

        res.redirect('../check-your-answers')
            
    })

    /*
     *  AML supervisory body -- cancel remove 
     */
    
    router.get('/v3-update/pages/cancel-remove-aml-1', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        req.session.data['aml-1-has-been-removed'] = undefined;

        res.redirect('../check-your-answers')
            
    })
      

   






module.exports = router

