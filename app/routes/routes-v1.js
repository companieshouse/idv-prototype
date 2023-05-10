//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


/*
 * Register an ACSP 
 */
  router.post('/register-an-acsp/who-is-making-filing-check', function (req, res) {
    
    if (req.session.data['registering-as'] === 'corporate') {
        
        res.redirect('../company-lookup')
    }
    else if (req.session.data['registering-as'] === 'firm') {
        
        res.redirect('/register-an-acsp/acsp-name')
    }
    else if (req.session.data['registering-as'] === 'individual') {
        
        res.redirect('/register-an-acsp/acsp-name')
    }
    
  }) 



  module.exports = router