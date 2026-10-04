/**
 * Builds the Intentions Floral wedding inquiry Google Form (with a linked response
 * spreadsheet) in one click.
 *
 * How to run:
 *  1. Go to script.google.com and choose New project.
 *  2. Delete the sample code, paste this whole file, and click Save.
 *  3. Choose createWeddingInquiryForm in the function menu and click Run.
 *  4. Approve the permission prompts (Google may say "unverified app": it is your own script).
 *  5. Open View > Logs (or Execution log) and copy the form links it prints.
 */
function createWeddingInquiryForm() {
  var form = FormApp.create('Intentions Floral: Wedding Inquiry');
  form.setDescription(
    'Tell us about your wedding and the florals you are dreaming of. ' +
    'We will follow up with a personalized quote.'
  );
  form.setConfirmationMessage(
    'Thank you! We have received your inquiry and will be in touch soon.'
  );

  // ---- Section 1: About you ----
  form.addSectionHeaderItem().setTitle('About you');
  form.addTextItem().setTitle('Full name').setRequired(true);
  form.addTextItem().setTitle('Email').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addTextItem().setTitle('Phone number').setRequired(true);
  form.addTextItem().setTitle("Partner's name");
  form.addMultipleChoiceItem().setTitle('How did you hear about us?')
    .setChoiceValues(['Instagram', 'Referral', 'Google'])
    .showOtherOption(true);

  // ---- Section 2: Your wedding ----
  form.addPageBreakItem().setTitle('Your wedding');
  form.addDateItem().setTitle('Wedding date').setRequired(true);
  form.addTextItem()
    .setTitle('Ceremony and reception venue(s) / city')
    .setHelpText(
      'Not sure yet? You can also share your venue or reception layout with us, ' +
      'and we will put together a design for you.'
    )
    .setRequired(true);
  form.addMultipleChoiceItem().setTitle('Approximate guest count')
    .setChoiceValues(['Under 10', '10-25', '26-50', '51-100', '100+']);
  var pathQuestion = form.addMultipleChoiceItem()
    .setTitle('What are you looking for?')
    .setRequired(true);

  // ---- Section 3: Intimate / micro ----
  var microPage = form.addPageBreakItem().setTitle('Intimate and micro weddings');
  form.addMultipleChoiceItem().setTitle('What is your ceremony style?')
    .setChoiceValues(['Courthouse', 'Outdoor', 'Venue', 'Backyard'])
    .showOtherOption(true);
  form.addGridItem()
    .setTitle('Which flowers do you need, and how many of each?')
    .setHelpText('Choose 0 for anything you do not need.')
    .setRows([
      'Bridal bouquet', 'Bridesmaid bouquets', 'Boutonniere(s)', 'Corsage(s)',
      'Ceremony arrangement', 'Table pieces'
    ])
    .setColumns(['0', '1', '2', '3', '4', '5', '6+']);
  form.addParagraphTextItem()
    .setTitle('Anything else you need? Please list the item and quantity.');
  form.addMultipleChoiceItem().setTitle('Delivery or pickup?')
    .setChoiceValues(['Delivery to the venue', 'Delivery to my home', 'Pickup']);
  form.addTextItem().setTitle('Delivery address and preferred time window');

  // ---- Section 4: A la carte ----
  var cartePage = form.addPageBreakItem().setTitle('A la carte wedding florals');
  form.addGridItem()
    .setTitle('Which products would you like, and how many of each?')
    .setHelpText('Choose 0 for anything you do not need.')
    .setRows([
      'Bridal bouquet', 'Bridesmaid bouquets', 'Boutonnieres', 'Corsages', 'Flower crown',
      'Ceremony arrangements', 'Aisle florals', 'Reception centerpieces', 'Bud vases',
      'Cake flowers', 'Welcome sign florals'
    ])
    .setColumns(['0', '1', '2', '3', '4', '5', '6-10', '11-20', '20+']);
  form.addParagraphTextItem()
    .setTitle('Anything else you need? Please list the item and quantity.');
  form.addTextItem().setTitle('Delivery or pickup? Address and preferred time window');
  form.addMultipleChoiceItem().setTitle('Do you need setup?')
    .setChoiceValues(['Yes', 'No', 'Not sure']);

  // ---- Section 5: Full service ----
  var fullPage = form.addPageBreakItem().setTitle('Full-service wedding florals');
  form.addCheckboxItem().setTitle('Which parts of the day need florals?')
    .setChoiceValues(['Ceremony', 'Cocktail hour', 'Reception', 'All of them']);
  form.addMultipleChoiceItem()
    .setTitle('Do you want installations (arch, backdrop, hanging pieces)?')
    .setChoiceValues(['Yes', 'No', 'Not sure']);
  form.addParagraphTextItem().setTitle('Installation details, if any');
  form.addTextItem().setTitle('Setup time and breakdown time');

  // ---- Section 6: Vision (everyone) ----
  var visionPage = form.addPageBreakItem().setTitle('Your vision');
  form.addParagraphTextItem().setTitle('Describe your style in a few words');
  form.addTextItem().setTitle('Color palette, and any colors to avoid');
  form.addTextItem().setTitle('Favorite flowers, and any you dislike or are allergic to');
  form.addParagraphTextItem()
    .setTitle('Inspiration')
    .setHelpText('Paste a Pinterest board, Instagram, or photo link.');
  form.addMultipleChoiceItem().setTitle('What is your floral budget?')
    .setChoiceValues([
      'Under $500', '$500-$1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000+', 'Not sure yet'
    ]);
  form.addParagraphTextItem().setTitle('Anything else we should know?');
  form.addCheckboxItem()
    .setTitle('Terms')
    .setChoiceValues([
      'I understand that availability and market conditions may mean small variations. ' +
      'The final design and any price adjustment will be shared with me for approval ' +
      'before payment, and payment upfront is needed to begin work.'
    ])
    .setRequired(true);

  // ---- Branching: each path continues to the shared vision section ----
  microPage.setGoToPage(visionPage);
  cartePage.setGoToPage(visionPage);
  fullPage.setGoToPage(visionPage);

  pathQuestion.setChoices([
    pathQuestion.createChoice('Intimate or micro wedding florals', microPage),
    pathQuestion.createChoice('A la carte wedding florals', cartePage),
    pathQuestion.createChoice('Full-service florals, including setup and breakdown', fullPage)
  ]);

  // ---- Save responses to a spreadsheet ----
  var sheet = SpreadsheetApp.create('Intentions Floral: Wedding Inquiry Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link with customers: ' + form.getPublishedUrl());
  Logger.log('Edit the form here: ' + form.getEditUrl());
  Logger.log('Responses spreadsheet: ' + sheet.getUrl());
}
