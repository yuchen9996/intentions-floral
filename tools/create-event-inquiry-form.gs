/**
 * Builds the Intentions Floral event inquiry Google Form (with a linked response
 * spreadsheet) in one click.
 *
 * How to run:
 *  1. Go to script.google.com and choose New project.
 *  2. Delete the sample code, paste this whole file, and click Save.
 *  3. Choose createEventInquiryForm in the function menu and click Run.
 *  4. Approve the permission prompts (Google may say "unverified app": it is your own script).
 *  5. Open the Execution log and copy the link that ends in /viewform.
 */
function createEventInquiryForm() {
  var form = FormApp.create('Intentions Floral: Event Inquiry');
  form.setDescription(
    'Share a few details about your event and we will follow up with a personalized quote. ' +
    'For faster service, call (917) 200-0466 or email hello@intentionsfloral.com.'
  );
  form.setConfirmationMessage(
    'Thank you! We have received your inquiry and will be in touch soon.'
  );

  form.addTextItem().setTitle('Full name').setRequired(true);
  form.addTextItem().setTitle('Email').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addTextItem().setTitle('Phone number').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Event type')
    .setChoiceValues([
      'Private dinner', 'Birthday', 'Engagement party', 'Bridal shower',
      'Proposal', 'Corporate event', 'Brand activation'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem().setTitle('Venue / city').setRequired(true)
    .setHelpText('Not sure yet? You can also share your venue layout with us.');
  form.addDateItem().setTitle('Event date').setRequired(true);
  form.addTimeItem().setTitle('Event time').setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Floral inspiration')
    .setHelpText('Paste links to images, a Pinterest board, or Instagram, or describe the look you love.');
  form.addParagraphTextItem()
    .setTitle('Request details')
    .setHelpText(
      'Tell us about your event: guest count, the pieces you would like (for example centerpieces, ' +
      'bud vases, bar arrangements), your color palette, and anything you do not want.'
    );

  var sheet = SpreadsheetApp.create('Intentions Floral: Event Inquiry Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link with customers: ' + form.getPublishedUrl());
  Logger.log('Edit the form here: ' + form.getEditUrl());
  Logger.log('Responses spreadsheet: ' + sheet.getUrl());
}
