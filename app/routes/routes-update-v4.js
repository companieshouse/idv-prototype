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
router.post('/v4-update/index-update', function (req, res) {

    res.redirect('start-page')
    
})

/*
 * Start page 
 */
router.post('/v4-update/start-page', function (req, res) {


    res.redirect('check-your-answers')

    
})

/*
 * Name 
 */
router.post('/v4-update/pages/name', function (req, res) {

    //set name updated to TRUE
    req.session.data['name-has-been-updated'] = true;

    res.redirect('date-of-change')
    
})

router.post('/v4-update/pages/date-of-change', function (req, res) {

    res.redirect('../check-updates')
    
})


router.post('/v4-update/check-updates', function (req, res) {

        if (req.session.data['checkBeforeSubmit'] === "yes") {
    
            res.redirect('check-your-answers')
    
          } else if (req.session.data['checkBeforeSubmit'] === "no") {
            // go to the confirm address page
            res.redirect('confirmation')
        
          }
   
   
  
    
})


/*
 * Business name 
 */
router.post('/v4-update/pages/name-of-business', function (req, res) {

    //set business name updated to TRUE
    req.session.data['business-name-has-been-updated'] = true;

    res.redirect('date-of-change-business-name')

})


router.post('/v4-update/pages/date-of-change-business-name', function (req, res) {

    res.redirect('../check-updates')
    
})



/*
 * Location they live 
 */
router.post('/v4-update/pages/location-lives', function (req, res) {

    //location-lives updated to TRUE
    req.session.data['location-has-been-updated'] = true;

    res.redirect('date-of-change-home')

})


router.post('/v4-update/pages/date-of-change-home', function (req, res) {

    res.redirect('../check-updates')
    
})



/*
 * Principle/registered office address 
 */
router.post('/v4-update/pages/address-principle-lookup', function (req, res) {


    //if house number is empty
    if (req.session.data['principle-name'] === '') {

       res.redirect('address-principle-list')

     } else {
       // go to the confirm address page
       res.redirect('address-principle-confirm')
   
     }
    
   
})


    /*
     *  business address list 
     */
    router.post('/v4-update/pages/address-principle-list', function (req, res) {
        
         
        res.redirect('address-principle-confirm')
        
    })




/*
 * Location they live 
 */
router.post('/v4-update/pages/email-address-correspondance', function (req, res) {

    //location-lives updated to TRUE
    req.session.data['email-has-been-updated'] = true;

    res.redirect('../check-updates')

})



router.post('/v4-update/pages/address-principle-confirm', function (req, res) {

    req.session.data['registered-office-address-has-been-updated'] = true;


    res.redirect('../check-updates')
    
})






/*
 * correspondance address lookup
    //if number and postcode added address-correspondance-confirm
 
    // only postcode  address-correspondance-list
 */
    router.post('/v4-update/pages/address-correspondance-lookup', function (req, res) {


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
    router.post('/v4-update/pages/address-correspondance-manual', function (req, res) {
        
         
        res.redirect('address-correspondance-confirm')
        
    })
    
    
    /*
     *  Correspondance address confirm
     */
    
    router.post('/v4-update/pages/address-correspondance-confirm', function (req, res) {
        

        req.session.data['cor-address-has-been-updated'] = true;
       
        res.redirect('date-of-change-correspondance-address')
        
    })


    router.post('/v4-update/pages/date-of-change-correspondance-address', function (req, res) {

        res.redirect('../check-updates')
        
    })
        


    /*
 * registered office address lookup
    //if number and postcode added address-confirm
 
    // only postcode  address-list
 */
    router.post('/v4-update/pages/address-registered-office-lookup', function (req, res) {


        //if house number is empty
        if (req.session.data['cor-number'] === '') {
    
            res.redirect('address-registered-office-list')
    
          } else {
            // go to the confirm address page
            res.redirect('address-registered-office-confirm')
        
          }
         
       
    })

    /*
     *  RO list 
     */
        router.post('/v4-update/pages/address-registered-office-list', function (req, res) {
        
         
            res.redirect('address-registered-office-confirm')
            
        })
    
    /*
     *  Not registered with Companies House - ACSP address manually entering address
     */
    router.post('/v4-update/pages/address-registered-office-manual', function (req, res) {
        
         
        res.redirect('address-registered-office-confirm')
        
    })
    
    
    /*
     *  Correspondance address confirm
     */
    
    router.post('/v4-update/pages/address-registered-office-confirm', function (req, res) {
        

        req.session.data['registered-office-address-has-been-updated'] = true;
       
        res.redirect('date-of-change-registered-office-address')
        
    })


    router.post('/v4-update/pages/date-of-change-registered-office-address', function (req, res) {

        res.redirect('../check-updates')
        
    })


    router.post('/v4-update/pages/date-of-change-correspondance-email', function (req, res) {

        res.redirect('../check-your-answers')
        
    })


        




    /*
     *  AML supervisory body -- add
     */
    
    router.post('/v4-update/pages/aml-supervisor', function (req, res) {
        
         
        res.redirect('aml-number-MVP')
            
    })

    router.post('/v4-update/pages/aml-number-MVP', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        res.redirect('date-of-change-AML')
            
    })

    /*
     *  AML supervisory body -- add 
     */
    
    router.post('/v4-update/pages/date-of-change-aml', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        req.session.data['new-aml-details'] = true;

        res.redirect('../check-updates')
            
    })

 

    /*
     *  AML supervisory body -- remove 
     */
    
    router.post('/v4-update/pages/date-of-removal-aml', function (req, res)      
    {
        req.session.data['aml-1-has-been-removed'] = true;

        res.redirect('../check-updates')
            
    })




    /*
     *  AML supervisory body -- cancel remove 
     */
    
    router.get('/v4-update/pages/cancel-remove-aml-1', function (req, res) {
        

        // The users has added new AML details - set the flag to TRUE 
        // New entry into check your answers with a added tag 

        req.session.data['aml-1-has-been-removed'] = undefined;

        res.redirect('../check-your-answers')
            
    })
      

   
  /*
     *  Check your answers
     */
    
  router.post('/v4-update/check-your-answers', function (req, res) {
        

    res.redirect('check-updates')
        
})
  






module.exports = router

