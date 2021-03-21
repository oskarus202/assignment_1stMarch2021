



describe('Description to be added', () => {
    /* notes by Oskar Laskowski: 
    
    still redirection causes 404 error with Cypress - despite the fact with manual
    actions it works just fine - 
    - I mean section where: "Das haben wir für Ihren heutigen Besuch geplant" is expected 
    what definitely works - is creating question - then deleting it after the check in Kiosk 
    is supposed to be finished
    (unfortunately the check in Kiosk could not be finished as after 404 is returned )
    I definitely would like to try it out with TestCafe or Puppeteer to solve this issue 
    but for now what you can  see is what I could come up with

    Plus impoartant info: 
    normally one max two actions visible as cy.method... shopuld be placed under single it (as it 
     is considered to be step for automated test case and each test case should be separately 
     held into "describe") whereas I have just a single describe and too few it so this definitely 
     could be restructured to follow best practices
    If you wish for this restructuring to happen - just give me such info 
    I will try to find some time from Monday on to perform such action. 


    Also data regarding codes for meetings - visible in the comments section 
    are valid for Sunday and probably starting from Monday -1st March 2021 03:00 
   should be replaced and such new code (for Fleet) should be placed in line:   173
        Also if you wish I may add some comments regarding each line of code applied here
        All places I could I applied explicit assertion (for example .should(exist)) so it is clearly 
        visible from Cypress Test Runner)
    
    */
    it('Logging in', () => {
        // going to the wanted URL
        cy.visit('https://daimler-account.tjekvik-staging.app/');

        //checking if the correct section of the website is shown by checking visibility of the specific elements
        cy.contains('Email').should('exist');
        cy.contains('Password').should('exist');
        cy.contains('Log in').should('exist');

        //filling in the login
        cy.get('input[id="user_email"]').type('**********');
        // login erased due to safety reasons

        //filling in the password 
        cy.get('input[id="user_password"]').type('*****');
        // password changed already for security reasons - 21.03.2021

        //clicking on Sign In button
        cy.get('input[type="submit"]').click();

        //asseting if certain elements exist - based on class as the text depend on language - I will have Polish other people English or another
        cy.get('div[class="alert alert-success alert-dismissable"]').should('exist');

        cy.contains('TjeKvik Dashboard').should('exist');
        cy.contains('Home').should('exist');
        cy.contains('Activities').should('exist');
        cy.contains('Employees').should('exist');
        cy.contains('Reports').should('exist');
        cy.contains('Help Centre').should('exist');
        cy.contains('Language').should('exist');
        cy.contains('(Log-out)').should('exist');

        cy.contains('Shops').should('exist');
        cy.contains('Autos DE (App hub)').should('exist');
        cy.contains('Daily Operations').should('exist');



        cy.contains('Appointment manager').should('exist');
        cy.contains('Checked in view').should('exist');
        cy.contains('Mobile Appointment Manager').should('exist');
        cy.contains('Mobility').should('exist');
        cy.contains('Tablet Check-In').should('exist');


        cy.contains('Tools and keydrop QR code').should('exist');
        cy.contains('Download QR code to keydrop').should('exist');
        cy.contains('Monitor view').should('exist');
        cy.contains('Checked Out View').should('exist');

        cy.contains('Admin tools').should('exist');
        cy.contains('General shop settings').should('exist');
        cy.contains('Terminals settings').should('exist');
        cy.contains('Flow specific settings (check in, check out, etc.)').should('exist');

        cy.contains('Flow specific settings (check in, check out, etc.)').click();


        // new section
        cy.contains('Check-in settings').should('exist');

    })

    it('clicking Fleet button in Questions section', () => {
        cy.contains('Fleet', { timeout: 10000 }).should('exist');


        cy.get('*[id^="questions-customer-groups-tab"]').eq(0).click();

        // cy.wait(5000);
        cy.wait(2500);

        cy.contains('Add questions step').click();

        cy.contains('Add question').click();

        cy.contains('Edit question').should('exist');
        cy.contains('Headline').should('exist');
        cy.contains('Text').should('exist');
        cy.contains('Image').should('exist');
        cy.contains('The image size must be 610x720 px').should('exist');
        cy.contains('Question category').should('exist');
        cy.contains('Options').should('exist');
        cy.contains('Show question to').should('exist');
        cy.contains('Product code').should('exist');


        cy.get('input[id="headline"]').click().type('Question001 Fleet');

        cy.get('textarea[id="text"]').click().type('When do you want to collect your car keys?');

        cy.get('select[id="question-category"]').select('Key collect');

        // cy.contains("Add").click({ force: true });
        // the above opens Create service

        cy.get('button[class="btn btn-light"]').click();
        cy.wait(1000);

        cy.get('input[name="options_attributes[0].name"]').click().type('I would like to pick up my car before 16:00');

        cy.get('select[name="options_attributes[0].category"]').select('neutral');

        cy.get('button[class="btn btn-light"]').click();

        cy.get('input[name="options_attributes[1].name"]').click().type('I have no plans for today, please call me when my car is ready.');

        cy.get('select[name="options_attributes[1].category"]').select('neutral');

        cy.get('input[value="not_waiting"]').click();

        // cy.get('div[class="modal-footer"]').contains('button[type="submit"]').click();

        // cy.get('button[type="submit"]').contains('Save').click();

        cy.get('button[class*="ladda-button m-0 btn btn-primary btn-md rounded"]').eq(2).click();
        // eq(2) as with eq(0) or eq(1) it refers to element being covered by another element


        cy.contains('Question001 Fleet').should('exist');


        cy.contains('Fleet', { timeout: 10000 }).should('exist');




        cy.wait(2500);


    })



    it('flow with kiosk', () => {
        cy.visit('https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/car_service');

        cy.contains('CHECK-IN').click();

        cy.contains('Anmelden mit Kennzeichen').click();

        cy.get('input[id="car_registration_number"]').type('BEDF6');

        cy.get('input[id="car_registration_number"]').click();
        // the above step is required so that the virtual keyboard is displayed


        /* 
        data for Sunday -28.02.2021: 
        Retail codes: 
        A14B2 
        CFB7C
        E6182
        59113
        80FF8

        Fleet: 
        ADC85 --- used at 1st iteration ---- and many others
        BEDF6 --- run with almost ready test but at 23:56
        CE4B7
        1C3BC
        45D4A
        */


        cy.wait(2000);




        cy.get('i[class*="fa-long-arrow-right"]').click();




        cy.contains('Weiter').click();
        cy.wait(3000);
        cy.contains('Weiter').click();
        cy.wait(3000);


    })
    it('flow with kiosk continued', () => {

        cy.wait(4500);


        cy.get('label[class*="btn bg-success btn-xs accept"]').click();


        cy.wait(3000);


    })


    it('flow with kiosk - final stages', () => {

        cy.contains('Weiter').click();

        cy.wait(3000);

        cy.contains('Das haben wir für Ihren heutigen Besuch geplant').should('exist');

        cy.contains('Weiter').click();


        cy.contains('Question001 Fleet').should('exist');

        cy.contains('When do you want to collect your car keys?').should('exist');

        cy.contains('I would like to pick up my car before 16:00').should('exist');

        cy.contains('I have no plans for today, please call me when my car is ready.').should('exist');


        cy.get('div[class="radio_list__check"]').eq(0).click();

        cy.contains('Weiter').click();

        cy.contains('Wo haben Sie das Fahrzeug gepartk?').should('exist');

        cy.contains('Klicken Sie bitte auf die Karte, um anzuzeigen, wo Sie Ihr Auto geparkt haben!').should('exist');
    })


    it('Deleting question added previously', () => {

        cy.visit('https://daimler-account.tjekvik-staging.app/');

        //checking if the correct section of the website is shown by checking visibility of the specific elements
        cy.contains('Email').should('exist');
        cy.contains('Password').should('exist');
        cy.contains('Log in').should('exist');

        //filling in the login
        cy.get('input[id="user_email"]').type('admin@tjekvik.com');

        //filling in the password 
        cy.get('input[id="user_password"]').type('Password1');

        //clicking on Sign In button
        cy.get('input[type="submit"]').click();

        //asseting if certain elements exist - based on class as the text depend on language - I will have Polish other people English or another
        cy.get('div[class="alert alert-success alert-dismissable"]').should('exist');

        cy.contains('TjeKvik Dashboard').should('exist');
        cy.contains('Home').should('exist');
        cy.contains('Activities').should('exist');
        cy.contains('Employees').should('exist');
        cy.contains('Reports').should('exist');
        cy.contains('Help Centre').should('exist');
        cy.contains('Language').should('exist');
        cy.contains('(Log-out)').should('exist');

        cy.contains('Shops').should('exist');
        cy.contains('Autos DE (App hub)').should('exist');
        cy.contains('Daily Operations').should('exist');



        cy.contains('Appointment manager').should('exist');
        cy.contains('Checked in view').should('exist');
        cy.contains('Mobile Appointment Manager').should('exist');
        cy.contains('Mobility').should('exist');
        cy.contains('Tablet Check-In').should('exist');


        cy.contains('Tools and keydrop QR code').should('exist');
        cy.contains('Download QR code to keydrop').should('exist');
        cy.contains('Monitor view').should('exist');
        cy.contains('Checked Out View').should('exist');

        cy.contains('Admin tools').should('exist');
        cy.contains('General shop settings').should('exist');
        cy.contains('Terminals settings').should('exist');
        cy.contains('Flow specific settings (check in, check out, etc.)').should('exist');

        cy.contains('Flow specific settings (check in, check out, etc.)').click();


        // new section
        cy.contains('Check-in settings').should('exist');



        cy.contains('Fleet', { timeout: 10000 }).should('exist');



        cy.get('*[id^="questions-customer-groups-tab"]').eq(0).click();

        // cy.wait(5000);
        cy.wait(2500);

        cy.contains('Question001 Fleet').click();

        // https://docs.cypress.io/api/commands/contains.html#Selector
        cy.get('div[class="btn-group-sm btn-group"]').contains('Delete').click();

        cy.contains('Question001 Fleet', { timeout: 10000 }).should('not.exist');

    })

})



