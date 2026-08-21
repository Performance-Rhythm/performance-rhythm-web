// ============================================================================
// PERFORMANCE RHYTHM WORKSHOP SURVEY SYSTEM - WORKING CHECKBOXES
// Multi-select checkboxes with proper filtering
// ============================================================================

const CONFIG = {
  // Current production workbook. Using an ID prevents same-named test copies
  // from receiving dashboard and chart updates.
  spreadsheetId: '1N5s99wi3-lMRiRJEqomV7h1rG9yEXCgKQSzxQ5Bqknw',
  folderName: 'Performance Rhythm Workshop Surveys',
  spreadsheetName: 'Performance Rhythm Workshop Survey Responses',
  preFormName: 'Performance Rhythm — Pre-Workshop Check-In',
  postFormName: 'Performance Rhythm — Post-Workshop Check-In',
  followupEnrollmentFormName: 'Performance Rhythm — Optional Follow-Up Enrollment',
  followupFormName: 'Performance Rhythm — Progress Follow-Up',
  followupDays: [7, 14, 30],
  words: ['Quartz', 'Prism', 'Thistle', 'Beacon', 'Granite', 'Orchid', 'Nebula', 'Mosaic', 'Glacier', 'Saffron', 'Obsidian', 'Willow'],
  numbers: Array.from({ length: 30 }, (_, i) => String(i + 1))
};

function generateWorkshopTimes() {
  const times = [];
  for (let hour = 5; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
      const displayMin = minute.toString().padStart(2, '0');
      times.push(`${displayHour}:${displayMin} ${ampm}`);
    }
  }
  return times;
}

CONFIG.workshopTimes = generateWorkshopTimes();

function setupWorkshopSurveys() {
  const folder = getOrCreateFolder_(CONFIG.folderName);
  const ss = SpreadsheetApp.create(CONFIG.spreadsheetName);
  PropertiesService.getScriptProperties().setProperty('SURVEY_SPREADSHEET_ID', ss.getId());
  CONFIG.spreadsheetId = ss.getId();
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  
  const pre = createPreForm_(ss);
  const post = createPostForm_(ss);
  
  DriveApp.getFileById(pre.getId()).moveTo(folder);
  DriveApp.getFileById(post.getId()).moveTo(folder);
  
  setupReportingSheets_(ss, pre, post);
  
  const config = getOrCreateSheet_(ss, 'Config');
  config.clear();
  config.appendRow(['Created', new Date()]);
  config.appendRow(['Pre Form Edit URL', pre.getEditUrl()]);
  config.appendRow(['Pre Form Public URL', pre.getPublishedUrl()]);
  config.appendRow(['Post Form Edit URL', post.getEditUrl()]);
  config.appendRow(['Post Form Public URL', post.getPublishedUrl()]);
  config.appendRow(['Spreadsheet URL', ss.getUrl()]);
  config.appendRow(['Pre QR URL', qrUrl_(pre.getPublishedUrl())]);
  config.appendRow(['Post QR URL', qrUrl_(post.getPublishedUrl())]);
  
  Logger.log('✓ Forms and sheets created');
}

function createPreForm_(ss) {
  const form = FormApp.create(CONFIG.preFormName);
  form.setDescription('Anonymous check-in: ~1 minute. Performance Rhythm reports aggregate group shifts only.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  if (typeof form.setRequireLogin === 'function') form.setRequireLogin(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  
  form.addSectionHeaderItem()
    .setTitle('Workshop Session Information')
    .setHelpText('The workshop date and start time help us connect your response to the correct Performance Rhythm session and report accurate group results. They are used only to organize responses, not to identify you.');
  form.addDateItem().setTitle('What date did this workshop start?').setRequired(true);
  form.addListItem().setTitle('What time did this workshop start?').setChoiceValues(CONFIG.workshopTimes).setRequired(true);
  
  form.addSectionHeaderItem()
    .setTitle('Anonymous Matching')
    .setHelpText('Choose a favorite word and number you will remember, then use the same combination on the post-workshop survey. This anonymous code lets us compare your before-and-after responses without collecting your name or email address.');
  form.addListItem().setTitle('Choose your favorite word').setChoiceValues(CONFIG.words).setRequired(true);
  form.addListItem().setTitle('Choose your unique number').setChoiceValues(CONFIG.numbers).setRequired(true);
  
  form.addSectionHeaderItem().setTitle('About Your Role');
  form.addMultipleChoiceItem().setTitle('Which department do you work in?').setChoiceValues(['Sales', 'Marketing', 'Customer Success', 'Customer Support', 'Engineering/IT', 'Product', 'Operations', 'Finance', 'Human Resources', 'Executive/Leadership', 'Other']).setRequired(false);
  form.addParagraphTextItem().setTitle('What are the most stressful aspects of your job?').setRequired(false);
  
  form.addScaleItem().setTitle('How stressed do you feel right now?').setBounds(1, 10).setLabels('Not stressed', 'Extremely stressed').setRequired(true);
  form.addScaleItem().setTitle('How much physical tension do you notice in your body right now?').setBounds(1, 10).setLabels('No tension', 'Extreme tension').setRequired(true);
  form.addScaleItem().setTitle('How calm and settled do you feel right now?').setBounds(1, 10).setLabels('Not calm', 'Completely calm').setRequired(true);
  form.addScaleItem().setTitle('How mentally clear and focused do you feel right now?').setBounds(1, 10).setLabels('Not clear', 'Completely clear').setRequired(true);
  form.addScaleItem().setTitle('How able do you feel to respond thoughtfully rather than react automatically?').setBounds(1, 10).setLabels('Not able', 'Completely able').setRequired(true);
  
  form.addMultipleChoiceItem().setTitle('What is your past experience with breathwork and meditation?').setChoiceValues(['New to both practices', 'Familiar with meditation', 'Familiar with breathwork', 'Experienced with both practices', 'Extensive practice with both']).setRequired(false);
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return form;
}

function createPostForm_(ss) {
  const form = FormApp.create(CONFIG.postFormName);
  form.setDescription('Anonymous check-in: ~1 minute. Performance Rhythm reports aggregate group shifts only.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  if (typeof form.setRequireLogin === 'function') form.setRequireLogin(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  
  form.addSectionHeaderItem()
    .setTitle('Workshop Session Information')
    .setHelpText('The workshop date and start time help us connect your response to the correct Performance Rhythm session and report accurate group results. They are used only to organize responses, not to identify you.');
  form.addDateItem().setTitle('What date did this workshop start?').setRequired(true);
  form.addListItem().setTitle('What time did this workshop start?').setChoiceValues(CONFIG.workshopTimes).setRequired(true);
  
  form.addSectionHeaderItem()
    .setTitle('Anonymous Matching')
    .setHelpText('Please choose the same favorite word and number you selected on the pre-workshop survey. This anonymous code lets us match your before-and-after responses and measure change without collecting your name, email address, or other identifying information.');
  form.addListItem().setTitle('Choose your favorite word').setChoiceValues(CONFIG.words).setRequired(true);
  form.addListItem().setTitle('Choose your unique number').setChoiceValues(CONFIG.numbers).setRequired(true);
  
  form.addScaleItem().setTitle('How stressed do you feel right now?').setBounds(1, 10).setLabels('Not stressed', 'Extremely stressed').setRequired(true);
  form.addScaleItem().setTitle('How much physical tension do you notice in your body right now?').setBounds(1, 10).setLabels('No tension', 'Extreme tension').setRequired(true);
  form.addScaleItem().setTitle('How calm and settled do you feel right now?').setBounds(1, 10).setLabels('Not calm', 'Completely calm').setRequired(true);
  form.addScaleItem().setTitle('How mentally clear and focused do you feel right now?').setBounds(1, 10).setLabels('Not clear', 'Completely clear').setRequired(true);
  form.addScaleItem().setTitle('How able do you feel to respond thoughtfully rather than react automatically?').setBounds(1, 10).setLabels('Not able', 'Completely able').setRequired(true);
  form.addScaleItem().setTitle('How confident do you feel using one practical regulation tool on your own privately?').setBounds(1, 10).setLabels('Not confident', 'Very confident').setRequired(true);
  form.addParagraphTextItem().setTitle('What was the most useful insight or shift from today\'s session?').setRequired(false);
  form.addParagraphTextItem().setTitle('Comments or suggestions').setRequired(false);
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return form;
}

function setupReportingSheets_(ss, preForm, postForm) {
  let report = ss.getSheetByName('Live Dashboard');
  if (report) ss.deleteSheet(report);
  
  report = ss.insertSheet('Live Dashboard', 0);
  report.setColumnWidth(1, 350);
  report.setColumnWidth(2, 200);
  report.setColumnWidth(4, 310);
  report.setColumnWidth(5, 150);
  
  report.appendRow(['Performance Rhythm Workshop — Live Results Dashboard']);
  report.appendRow(['']);
  report.appendRow(['📊 SELECT WORKSHOPS (check multiple)']);
  report.appendRow(['']);
  for (let i = 0; i < 20; i++) report.appendRow(['', '']);
  
  let matched = ss.getSheetByName('Matched Results');
  if (matched) ss.deleteSheet(matched);
  
  matched = ss.insertSheet('Matched Results', 1);
  matched.appendRow(['Filter: See Live Dashboard for workshop selection']);
  matched.appendRow(['']);
  matched.appendRow([
    'Session ID',
    'Pre Stress', 'Post Stress', 'Stress Change', 'Stress % Change',
    'Pre Tension', 'Post Tension', 'Tension Change', 'Tension % Change',
    'Pre Calm', 'Post Calm', 'Calm Change', 'Calm % Change',
    'Pre Clarity', 'Post Clarity', 'Clarity Change', 'Clarity % Change',
    'Pre Response', 'Post Response', 'Response Change', 'Response % Change',
    'Pre State Score', 'Post State Score', 'State Score Change'
  ]);
  
  let charts = ss.getSheetByName('Charts');
  if (charts) ss.deleteSheet(charts);
  
  charts = ss.insertSheet('Charts', 2);
  charts.appendRow(['Performance Rhythm Workshop — Results Charts & Visualizations']);
  charts.appendRow(['Workshop Session(s):', 'Selected workshops will appear here']);
  charts.appendRow(['']);
  
  for (let i = 0; i < 60; i++) {
    charts.appendRow(['']);
  }
}

function getOrCreateFolder_(name) {
  const existing = DriveApp.getFoldersByName(name);
  return existing.hasNext() ? existing.next() : DriveApp.createFolder(name);
}

function getOrCreateSheet_(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function qrUrl_(url) {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(url);
}

function getSurveySpreadsheet_() {
  const id = CONFIG.spreadsheetId || PropertiesService.getScriptProperties().getProperty('SURVEY_SPREADSHEET_ID');
  if (!id) throw new Error('Survey spreadsheet ID is not configured.');
  return SpreadsheetApp.openById(id);
}

function formatDateForSession(dateObj) {
  if (!dateObj) return null;
  let parsed = dateObj;
  if (typeof parsed.getFullYear !== 'function') {
    const text = String(parsed).trim();
    const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const mdy = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (iso) parsed = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    else if (mdy) parsed = new Date(Number(mdy[3]), Number(mdy[1]) - 1, Number(mdy[2]));
    else parsed = new Date(text);
  }
  if (!parsed || typeof parsed.getFullYear !== 'function' || isNaN(parsed.getTime())) return null;
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function roundTimeToNearestHour(timeInput) {
  let hour, minute;
  let timeStr = String(timeInput);
  const timeMatch = timeStr.match(/(\d{2}):(\d{2}):(\d{2})/);
  if (timeMatch) {
    hour = parseInt(timeMatch[1]);
    minute = parseInt(timeMatch[2]);
  } else {
    const ampmMatch = timeStr.match(/(\d{1,2}):(\d{2})\s(AM|PM)/i);
    if (!ampmMatch) return null;
    hour = parseInt(ampmMatch[1]);
    minute = parseInt(ampmMatch[2]);
    const ampm = ampmMatch[3].toUpperCase();
    if (ampm === 'PM' && hour !== 12) hour += 12;
    else if (ampm === 'AM' && hour === 12) hour = 0;
  }
  if (minute >= 30) hour = (hour + 1) % 24;
  return String(hour).padStart(2, '0') + ':00';
}

function createSessionKey(dateObj, timeStr) {
  const dateStr = formatDateForSession(dateObj);
  const roundedTime = roundTimeToNearestHour(timeStr);
  if (!dateStr || !roundedTime) return null;
  return `${dateStr}-${roundedTime}`;
}

function getUniqueSessionsFromData(ss) {
  ss = ss || getSurveySpreadsheet_();
  const preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  
  if (!preSheet || preSheet.getLastRow() < 2) return [];
  
  const data = preSheet.getDataRange().getValues();
  const sessions = new Set();
  
  for (let i = 1; i < data.length; i++) {
    const date = data[i][1];
    const time = data[i][2];
    const sessionKey = createSessionKey(date, time);
    if (sessionKey) sessions.add(sessionKey);
  }
  
  return Array.from(sessions).sort();
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Performance Rhythm')
    .addItem('Choose workshops', 'showWorkshopSelector')
    .addItem('Refresh dashboard', 'refreshDashboard')
    .addSeparator()
    .addItem('Workshop names', 'openWorkshopNames')
    .addSeparator()
    .addItem('Set up voluntary follow-ups', 'setupVoluntaryFollowupSystem')
    .addItem('Refresh follow-up dashboard', 'refreshFollowupDashboard')
    .addToUi();
}

function ensureWorkshopNamesSheet_(ss) {
  const sheet = getOrCreateSheet_(ss, 'Workshop Names');
  if (sheet.getLastRow() === 0) {
    sheet.getRange('A1:E1').setValues([['Include', 'Session ID', 'Company', 'Session Name', 'Display Label']]);
    sheet.getRange('A2:B2').setValues([[true, 'All Workshops']]);
    sheet.getRange('A2').insertCheckboxes();
    sheet.getRange('A3:E3').setValues([['Include', 'Session ID', 'Company', 'Session Name', 'Display Label']]);
  }
  const existing = {};
  if (sheet.getLastRow() > 3) {
    sheet.getRange(4, 1, sheet.getLastRow() - 3, 5).getValues().forEach(row => {
      if (row[1]) existing[String(row[1])] = true;
    });
  }
  const missing = getUniqueSessionsFromData(ss).filter(id => !existing[id]).map(id => [true, id, '', '', '']);
  if (missing.length) {
    const start = sheet.getLastRow() + 1;
    sheet.getRange(start, 1, missing.length, 5).setValues(missing);
    sheet.getRange(start, 1, missing.length, 1).insertCheckboxes();
  }
  sheet.setFrozenRows(3);
  sheet.getRange('A1:E1').merge().setValue('Workshop Selection & Names').setFontSize(15).setFontWeight('bold');
  sheet.getRange('B2').setValue('All Workshops');
  sheet.getRange('A3:E3').setFontWeight('bold').setBackground('#EDEDED');
  sheet.setColumnWidth(1, 80);
  sheet.setColumnWidth(2, 190);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 240);
  sheet.setColumnWidth(5, 280);
  return sheet;
}

function getWorkshopLabels_(ss) {
  const sheet = ensureWorkshopNamesSheet_(ss);
  const labels = {};
  if (sheet.getLastRow() < 4) return labels;
  sheet.getRange(4, 1, sheet.getLastRow() - 3, 5).getDisplayValues().forEach(row => {
    const id = row[1];
    if (!id) return;
    const company = row[2].trim();
    const session = row[3].trim();
    const custom = row[4].trim();
    labels[id] = custom || [company, session].filter(Boolean).join(' — ') || id;
  });
  return labels;
}

function getSelectedSessions_(ss) {
  const sheet = ensureWorkshopNamesSheet_(ss);
  const sessions = getUniqueSessionsFromData(ss);
  if (sheet.getRange('A2').getValue() === true) return sessions;
  if (sheet.getLastRow() < 4) return [];
  const selected = new Set(sheet.getRange(4, 1, sheet.getLastRow() - 3, 2).getValues()
    .filter(row => row[0] === true).map(row => String(row[1])));
  return sessions.filter(id => selected.has(id));
}

function showWorkshopSelector() {
  const html = HtmlService.createHtmlOutputFromFile('WorkshopSelector')
    .setTitle('Choose workshops');
  SpreadsheetApp.getUi().showSidebar(html);
}

function getWorkshopSelectorData() {
  const ss = getSurveySpreadsheet_();
  const selected = new Set(getSelectedSessions_(ss));
  const labels = getWorkshopLabels_(ss);
  return getUniqueSessionsFromData(ss).map(id => ({ id: id, label: labels[id] || id, selected: selected.has(id) }));
}

function applyWorkshopSelection(selectedIds) {
  const ss = getSurveySpreadsheet_();
  const valid = getUniqueSessionsFromData(ss);
  const selected = new Set((selectedIds || []).filter(id => valid.indexOf(id) !== -1));
  const sheet = ensureWorkshopNamesSheet_(ss);
  if (sheet.getLastRow() >= 4) {
    const ids = sheet.getRange(4, 2, sheet.getLastRow() - 3, 1).getValues();
    sheet.getRange(4, 1, ids.length, 1).setValues(ids.map(row => [selected.has(String(row[0]))]));
  }
  sheet.getRange('A2').setValue(selected.size === valid.length && valid.length > 0);
  calculateDashboard(ss);
  createCharts(ss);
  return { selected: selected.size, total: valid.length };
}

function refreshDashboard() {
  const ss = getSurveySpreadsheet_();
  ensureWorkshopNamesSheet_(ss);
  calculateDashboard(ss);
  createCharts(ss);
  ss.getSheetByName('Live Dashboard').hideColumns(10, 6);
}

function onSurveyFormSubmit(e) {
  const responseSheet = e && e.range ? e.range.getSheet().getName() : '';
  if (responseSheet === 'Follow-Up Enrollment Responses') {
    processFollowupEnrollment_(e);
    return;
  }
  if (responseSheet === 'Follow-Up Responses') {
    processFollowupResponse_(e);
    refreshFollowupDashboard();
    return;
  }
  if (responseSheet === 'Post Responses') capturePostSurveyFollowupOptIn_(e);
  matchResponsesToCalculateStateScores();
}

/** Moves voluntary follow-up enrollment onto the existing post-workshop form. */
function moveFollowupOptInToPostSurvey() {
  const ss = getSurveySpreadsheet_();
  const postForm = FormApp.openById('1IGw-mc8E5CN4jW6wbm-VSnYcyxo9JX_W8iCXdBk4seI');
  const interestTitle = 'Would you be interested in tracking your stress levels and progress over the next two months?';
  const emailTitle = 'If yes, what email address should we use for your private follow-up links?';
  const existingTitles = new Set(postForm.getItems().map(item => item.getTitle()));

  if (!existingTitles.has(interestTitle)) {
    postForm.addSectionHeaderItem()
      .setTitle('Optional Progress Follow-Up')
      .setHelpText('If you choose to participate, we will email you brief progress check-ins approximately 7, 14, and 30 days after your workshop. Your email will be kept out of company reports. Your responses can be connected to your original anonymous workshop code so you do not need to enroll through another form.');
    postForm.addMultipleChoiceItem().setTitle(interestTitle)
      .setChoiceValues(['Yes, I would like to participate', 'No, thank you']).setRequired(true);
  }
  if (!existingTitles.has(emailTitle)) {
    postForm.addTextItem().setTitle(emailTitle)
      .setHelpText('Optional. Enter an email only if you selected yes above. Your address is stored separately from reporting data and is used only for Performance Rhythm follow-up messages.')
      .setValidation(FormApp.createTextValidation().requireTextIsEmail().build()).setRequired(false);
  }
  postForm.setConfirmationMessage('Thank you. Your post-workshop response has been recorded. If you volunteered for progress tracking, we will send brief private check-ins approximately 7, 14, and 30 days after your workshop.');

  const props = PropertiesService.getScriptProperties();
  const enrollmentId = props.getProperty('FOLLOWUP_ENROLLMENT_FORM_ID');
  if (enrollmentId) {
    try {
      const enrollmentForm = FormApp.openById(enrollmentId);
      enrollmentForm.setAcceptingResponses(false);
    } catch (error) {
      Logger.log('Legacy enrollment form could not be closed: ' + error.message);
    }
  }

  const enrollmentResponses = ss.getSheetByName('Follow-Up Enrollment Responses');
  if (enrollmentResponses && !enrollmentResponses.isSheetHidden()) enrollmentResponses.hideSheet();
  const config = ss.getSheetByName('Config');
  if (config && config.getLastRow()) {
    const configRows = config.getRange(1, 1, config.getLastRow(), 2).getDisplayValues();
    configRows.forEach((row, index) => {
      if (row[0] === 'Follow-Up Enrollment Public URL') {
        config.getRange(index + 1, 1, 1, 2).setValues([['Legacy enrollment form', 'Retired — follow-up opt-in is now on the post-workshop survey']]);
      }
      if (row[0] === 'Follow-Up Enrollment QR URL') {
        config.getRange(index + 1, 1, 1, 2).setValues([['Legacy enrollment QR', 'Do not use']]);
      }
    });
  }
  installSurveySubmitTrigger_();
  Logger.log('Post-survey follow-up opt-in is active; the separate enrollment form is retired.');
}

function capturePostSurveyFollowupOptIn_(e) {
  const interestTitle = 'Would you be interested in tracking your stress levels and progress over the next two months?';
  const emailTitle = 'If yes, what email address should we use for your private follow-up links?';
  const named = e.namedValues || {};
  const interest = String((named[interestTitle] || [''])[0]).toLowerCase();
  const email = String((named[emailTitle] || [''])[0]).trim().toLowerCase();
  if (interest.indexOf('yes') !== 0 || !email) return;

  const workshopDate = (named['What date did this workshop start?'] || [''])[0];
  const workshopTime = (named['What time did this workshop start?'] || [''])[0];
  const word = (named['Choose your favorite word'] || [''])[0];
  const number = (named['Choose your unique number'] || [''])[0];
  const sessionId = createSessionKey(workshopDate, workshopTime);
  if (!sessionId || !word || !number) return;

  const ss = getSurveySpreadsheet_();
  setupFollowupContactsSheet_(ss);
  const contacts = ss.getSheetByName('Follow-Up Contacts');
  const participantId = Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
  const existing = contacts.getLastRow() > 1
    ? contacts.getRange(2, 1, contacts.getLastRow() - 1, 10).getValues() : [];
  const duplicate = existing.some(row => String(row[1]).toLowerCase() === email && String(row[2]) === sessionId);
  if (!duplicate) contacts.appendRow([participantId, email, sessionId, word, number, new Date(), true, '', '', '']);

  // Remove the volunteered email from the reporting response sheet after it
  // has been moved to the protected contact table.
  if (e.range) {
    const sheet = e.range.getSheet();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
    const emailColumn = headers.indexOf(emailTitle) + 1;
    if (emailColumn > 0) sheet.getRange(e.range.getRow(), emailColumn).clearContent();
  }
}

/**
 * Creates the two-form voluntary follow-up pathway. The enrollment form keeps
 * contact details outside the anonymous pre/post response tables; reporting
 * uses only the generated participant ID and workshop session ID.
 */
function setupVoluntaryFollowupSystem() {
  const ss = getSurveySpreadsheet_();
  const folder = getOrCreateFolder_(CONFIG.folderName);
  const props = PropertiesService.getScriptProperties();

  let enrollmentForm;
  let followupForm;
  try { enrollmentForm = FormApp.openById(props.getProperty('FOLLOWUP_ENROLLMENT_FORM_ID')); } catch (error) {}
  try { followupForm = FormApp.openById(props.getProperty('FOLLOWUP_FORM_ID')); } catch (error) {}

  if (!enrollmentForm) {
    const before = new Set(ss.getSheets().map(sheet => sheet.getSheetId()));
    enrollmentForm = createFollowupEnrollmentForm_(ss);
    SpreadsheetApp.flush();
    const responseSheet = ss.getSheets().find(sheet => !before.has(sheet.getSheetId()));
    if (!responseSheet) throw new Error('The follow-up enrollment response tab was not created.');
    responseSheet.setName('Follow-Up Enrollment Responses');
    DriveApp.getFileById(enrollmentForm.getId()).moveTo(folder);
    props.setProperty('FOLLOWUP_ENROLLMENT_FORM_ID', enrollmentForm.getId());
  }

  if (!followupForm) {
    const before = new Set(ss.getSheets().map(sheet => sheet.getSheetId()));
    followupForm = createFollowupForm_(ss);
    SpreadsheetApp.flush();
    const responseSheet = ss.getSheets().find(sheet => !before.has(sheet.getSheetId()));
    if (!responseSheet) throw new Error('The follow-up response tab was not created.');
    responseSheet.setName('Follow-Up Responses');
    DriveApp.getFileById(followupForm.getId()).moveTo(folder);
    props.setProperty('FOLLOWUP_FORM_ID', followupForm.getId());
  }

  setupFollowupContactsSheet_(ss);
  setupFollowupDashboard_(ss);
  recordFollowupConfig_(ss, enrollmentForm, followupForm);
  installSurveySubmitTrigger_();
  refreshFollowupDashboard();
  Logger.log('Voluntary follow-up forms and reporting are ready. Email reminders are not activated until explicitly approved.');
}

function createFollowupEnrollmentForm_(ss) {
  const form = FormApp.create(CONFIG.followupEnrollmentFormName);
  form.setDescription('Optional confidential follow-up program. If you enroll, Performance Rhythm will use your email only to send brief progress surveys approximately 7, 14, and 30 days after your workshop. Your email and individual answers will not appear in company reports.');
  form.setCollectEmail(false).setLimitOneResponsePerUser(false).setAllowResponseEdits(false).setShowLinkToRespondAgain(false);
  if (typeof form.setRequireLogin === 'function') form.setRequireLogin(false);
  form.addSectionHeaderItem().setTitle('Workshop and anonymous response matching')
    .setHelpText('Use the same workshop date, time, favorite word, and number from your workshop surveys. This lets us connect your progress over time. Because you are voluntarily providing an email, your enrolled responses are confidential rather than fully anonymous.');
  form.addDateItem().setTitle('What date did your workshop start?').setRequired(true);
  form.addListItem().setTitle('What time did your workshop start?').setChoiceValues(CONFIG.workshopTimes).setRequired(true);
  form.addListItem().setTitle('Choose the same favorite word used on your workshop surveys').setChoiceValues(CONFIG.words).setRequired(true);
  form.addListItem().setTitle('Choose the same number used on your workshop surveys').setChoiceValues(CONFIG.numbers).setRequired(true);
  form.addTextItem().setTitle('Email address for follow-up reminders').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addMultipleChoiceItem().setTitle('I voluntarily agree to receive Performance Rhythm follow-up surveys by email approximately 7, 14, and 30 days after my workshop.')
    .setChoiceValues(['Yes, I agree']).setRequired(true);
  form.setConfirmationMessage('Thank you. Your follow-up enrollment has been recorded. Your email will be kept out of company reports.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return form;
}

function createFollowupForm_(ss) {
  const form = FormApp.create(CONFIG.followupFormName);
  form.setDescription('A brief confidential progress check. Performance Rhythm reports company results only in aggregate. Your email address is not collected on this form.');
  form.setCollectEmail(false).setLimitOneResponsePerUser(false).setAllowResponseEdits(false).setShowLinkToRespondAgain(false);
  if (typeof form.setRequireLogin === 'function') form.setRequireLogin(false);
  form.addSectionHeaderItem().setTitle('Progress check information')
    .setHelpText('The participant and workshop codes below are filled in by your private reminder link so your progress can be connected over time without placing your email in this response sheet.');
  form.addTextItem().setTitle('Participant ID').setRequired(true);
  form.addTextItem().setTitle('Workshop Session ID').setRequired(true);
  form.addMultipleChoiceItem().setTitle('Follow-up checkpoint').setChoiceValues(['Day 7', 'Day 14', 'Day 30']).setRequired(true);

  const frequency = ['Multiple times a day', 'Daily', 'A few times a week', 'Once a week', 'Less than once a week', 'Never'];
  form.addMultipleChoiceItem().setTitle('During the four weeks before your first Performance Rhythm workshop, how often did you typically use breathwork or meditation?').setChoiceValues(frequency).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Since your first Performance Rhythm workshop, how often have you typically used breathwork or meditation?').setChoiceValues(frequency).setRequired(true);
  form.addMultipleChoiceItem().setTitle('When you practice, approximately how long is a typical session?')
    .setChoiceValues(['Less than 5 minutes', '5–9 minutes', '10–14 minutes', '15–20 minutes', 'More than 20 minutes']).setRequired(true);
  form.addScaleItem().setTitle('Thinking about the four weeks before the workshop, what was your typical stress level at work?').setBounds(1, 10).setLabels('Very low', 'Extremely high').setRequired(true);
  form.addScaleItem().setTitle('Over the past seven days, what has your typical stress level at work been?').setBounds(1, 10).setLabels('Very low', 'Extremely high').setRequired(true);

  form.addSectionHeaderItem().setTitle('Workplace impact')
    .setHelpText('These questions help us understand whether the practices are creating useful, lasting changes during the workday.');
  form.addScaleItem().setTitle('How confident are you that you can use a breathing or meditation tool when stress rises?').setBounds(1, 10).setLabels('Not confident', 'Extremely confident').setRequired(true);
  form.addScaleItem().setTitle('How much have these tools helped you recover more quickly after a stressful moment at work?').setBounds(1, 10).setLabels('Not at all', 'A great deal').setRequired(true);
  form.addScaleItem().setTitle('How much have these tools helped you regain mental clarity and focus at work?').setBounds(1, 10).setLabels('Not at all', 'A great deal').setRequired(true);
  form.addScaleItem().setTitle('How much have these tools helped you respond thoughtfully rather than react automatically at work?').setBounds(1, 10).setLabels('Not at all', 'A great deal').setRequired(true);
  form.addMultipleChoiceItem().setTitle('During the past seven days, on how many workdays did you intentionally use one of these tools?')
    .setChoiceValues(['0 days', '1 day', '2 days', '3 days', '4 days', '5 or more days']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('What has been the biggest barrier to practicing consistently?')
    .setChoiceValues(['No significant barrier', 'I forget', 'Not enough time', 'Hard to use during the workday', 'Unsure which tool to use', 'The tools have not felt helpful yet', 'Other']).setRequired(false);
  form.addParagraphTextItem().setTitle('What is the most meaningful change you have noticed, if any?').setRequired(false);
  form.addParagraphTextItem().setTitle('What additional support would help you continue using these tools?').setRequired(false);
  form.addMultipleChoiceItem().setTitle('Should we stop sending you future follow-up reminders?').setChoiceValues(['No', 'Yes']).setRequired(true);
  form.setConfirmationMessage('Thank you. Your progress response has been recorded.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return form;
}

function setupFollowupContactsSheet_(ss) {
  const sheet = getOrCreateSheet_(ss, 'Follow-Up Contacts');
  const headers = ['Participant ID', 'Email', 'Session ID', 'Favorite Word', 'Number', 'Enrolled', 'Active', 'Day 7 Sent', 'Day 14 Sent', 'Day 30 Sent'];
  if (!sheet.getLastRow()) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.setHiddenGridlines(true);
  sheet.setTabColor('#D97742');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#243746').setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.setColumnWidths(1, headers.length, 145);
  sheet.setColumnWidth(2, 260);
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  if (!protections.length) sheet.protect().setDescription('Confidential follow-up contact information');
}

function processFollowupEnrollment_(e) {
  const ss = getSurveySpreadsheet_();
  const row = e.values || [];
  const workshopDate = row[1];
  const workshopTime = row[2];
  const word = row[3];
  const number = row[4];
  const email = String(row[5] || '').trim().toLowerCase();
  if (!email) return;
  const sessionId = createSessionKey(workshopDate, workshopTime);
  const participantId = Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
  const contacts = getOrCreateSheet_(ss, 'Follow-Up Contacts');
  contacts.appendRow([participantId, email, sessionId, word, number, new Date(), true, '', '', '']);
}

function processFollowupResponse_(e) {
  const row = e.values || [];
  const participantId = String(row[1] || '').trim();
  const stop = String(row[17] || '').trim().toLowerCase() === 'yes';
  if (!participantId || !stop) return;
  const contacts = getSurveySpreadsheet_().getSheetByName('Follow-Up Contacts');
  if (!contacts || contacts.getLastRow() < 2) return;
  const ids = contacts.getRange(2, 1, contacts.getLastRow() - 1, 1).getDisplayValues();
  const index = ids.findIndex(item => item[0] === participantId);
  if (index !== -1) contacts.getRange(index + 2, 7).setValue(false);
}

function buildFollowupUrl_(form, participantId, sessionId, day) {
  const response = form.createResponse();
  const byTitle = {};
  form.getItems().forEach(item => byTitle[item.getTitle()] = item);
  response.withItemResponse(byTitle['Participant ID'].asTextItem().createResponse(participantId));
  response.withItemResponse(byTitle['Workshop Session ID'].asTextItem().createResponse(sessionId));
  response.withItemResponse(byTitle['Follow-up checkpoint'].asMultipleChoiceItem().createResponse('Day ' + day));
  return response.toPrefilledUrl();
}

/** Creates the editable question bank and response table for the branded web follow-up. */
function setupProgressWebApp() {
  const ss = getSurveySpreadsheet_();
  const questions = getOrCreateSheet_(ss, 'Follow-Up Questions');
  const headers = ['Active', 'Order', 'Key (do not edit)', 'Question shown to attendee', 'Type', 'Options (separate with |)', 'Required', 'Checkpoints', 'Reporting category'];
  if (!questions.getLastRow()) {
    const frequency = 'Multiple times a day|Daily|A few times a week|Once a week|Less than once a week|Never';
    const defaults = [
      [true, 1, 'baseline_frequency', 'During the four weeks before your first Performance Rhythm workshop, how often did you typically use breathwork or meditation?', 'SELECT', frequency, true, '7,14,30', 'Practice adoption'],
      [true, 2, 'current_frequency', 'Since your first Performance Rhythm workshop, how often have you typically used breathwork or meditation?', 'SELECT', frequency, true, '7,14,30', 'Practice adoption'],
      [true, 3, 'session_minutes', 'When you practice, approximately how long is a typical session?', 'SELECT', 'Less than 5 minutes|5–9 minutes|10–14 minutes|15–20 minutes|More than 20 minutes', true, '7,14,30', 'Practice adoption'],
      [true, 4, 'baseline_stress', 'Thinking about the four weeks before the workshop, what was your typical stress level at work?', 'SCALE', 'Very low|Extremely high', true, '7,14,30', 'Stress'],
      [true, 5, 'current_stress', 'Over the past seven days, what has your typical stress level at work been?', 'SCALE', 'Very low|Extremely high', true, '7,14,30', 'Stress'],
      [true, 6, 'confidence', 'How confident are you that you can use a breathing or meditation tool when stress rises?', 'SCALE', 'Not confident|Extremely confident', true, '7,14,30', 'Self-efficacy'],
      [true, 7, 'recovery', 'How much have these tools helped you recover more quickly after a stressful moment at work?', 'SCALE', 'Not at all|A great deal', true, '7,14,30', 'Workplace impact'],
      [true, 8, 'clarity', 'How much have these tools helped you regain mental clarity and focus at work?', 'SCALE', 'Not at all|A great deal', true, '7,14,30', 'Workplace impact'],
      [true, 9, 'thoughtful_response', 'How much have these tools helped you respond thoughtfully rather than react automatically at work?', 'SCALE', 'Not at all|A great deal', true, '7,14,30', 'Workplace impact'],
      [true, 10, 'workdays_used', 'During the past seven days, on how many workdays did you intentionally use one of these tools?', 'SELECT', '0 days|1 day|2 days|3 days|4 days|5 or more days', true, '7,14,30', 'Practice adoption'],
      [true, 11, 'barrier', 'What has been the biggest barrier to practicing consistently?', 'SELECT', 'No significant barrier|I forget|Not enough time|Hard to use during the workday|Unsure which tool to use|The tools have not felt helpful yet|Other', false, '7,14,30', 'Barriers'],
      [true, 12, 'meaningful_change', 'What is the most meaningful change you have noticed, if any?', 'TEXTAREA', '', false, '7,14,30', 'Written feedback'],
      [true, 13, 'support_needed', 'What additional support would help you continue using these tools?', 'TEXTAREA', '', false, '7,14,30', 'Written feedback'],
      [true, 14, 'stop_reminders', 'Would you like us to stop sending future follow-up reminders?', 'YES_NO', 'No|Yes', true, '7,14,30', 'Preference']
    ];
    questions.getRange(1, 1, 1, headers.length).setValues([headers]);
    questions.getRange(2, 1, defaults.length, headers.length).setValues(defaults);
    questions.getRange(2, 1, defaults.length, 1).insertCheckboxes();
    questions.getRange(2, 7, defaults.length, 1).insertCheckboxes();
  }
  questions.setFrozenRows(1);
  questions.setHiddenGridlines(true);
  questions.setTabColor('#D97742');
  questions.getRange(1, 1, 1, headers.length).setBackground('#243746').setFontColor('#FFFFFF').setFontWeight('bold').setWrap(true);
  questions.setColumnWidth(1, 75); questions.setColumnWidth(2, 65); questions.setColumnWidth(3, 175);
  questions.setColumnWidth(4, 520); questions.setColumnWidth(5, 105); questions.setColumnWidth(6, 430);
  questions.setColumnWidth(7, 85); questions.setColumnWidth(8, 120); questions.setColumnWidth(9, 180);
  questions.getRange(2, 4, Math.max(1, questions.getLastRow() - 1), 6).setWrap(true).setVerticalAlignment('top');
  const keyRange = questions.getRange(2, 3, Math.max(1, questions.getMaxRows() - 1), 1);
  const keyProtectionExists = questions.getProtections(SpreadsheetApp.ProtectionType.RANGE)
    .some(protection => protection.getDescription() === 'Stable reporting keys — do not edit');
  if (!keyProtectionExists) {
    keyRange.protect().setDescription('Stable reporting keys — do not edit').setWarningOnly(true);
  }

  const responses = getOrCreateSheet_(ss, 'Progress Responses');
  if (!responses.getLastRow()) responses.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Participant ID', 'Workshop Session ID', 'Checkpoint', 'Submitted from']]);
  responses.setFrozenRows(1); responses.setHiddenGridlines(true); responses.setTabColor('#6E93AA');
  responses.getRange(1, 1, 1, Math.max(5, responses.getLastColumn())).setBackground('#243746').setFontColor('#FFFFFF').setFontWeight('bold');
  ensureProgressResponseColumns_(responses, getAllFollowupQuestions_());

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('FOLLOWUP_TOKEN_SECRET')) props.setProperty('FOLLOWUP_TOKEN_SECRET', Utilities.getUuid() + Utilities.getUuid());
  const legacyFormId = props.getProperty('FOLLOWUP_FORM_ID');
  if (legacyFormId) {
    try { FormApp.openById(legacyFormId).setAcceptingResponses(false); } catch (error) { Logger.log(error.message); }
  }
  const legacyResponses = ss.getSheetByName('Follow-Up Responses');
  if (legacyResponses && !legacyResponses.isSheetHidden()) legacyResponses.hideSheet();
  refreshFollowupDashboard();
  Logger.log('Progress web app data model is ready. Deploy the script as a web app to publish it.');
}

function getAllFollowupQuestions_() {
  const sheet = getSurveySpreadsheet_().getSheetByName('Follow-Up Questions');
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues().map(row => ({
    active: row[0] === true, order: Number(row[1]) || 999, key: String(row[2]).trim(), question: String(row[3]).trim(),
    type: String(row[4]).trim().toUpperCase(), options: String(row[5] || '').split('|').map(v => v.trim()).filter(Boolean),
    required: row[6] === true, checkpoints: String(row[7] || '7,14,30').split(',').map(v => Number(v.trim())), category: String(row[8] || '')
  })).filter(item => item.key && item.question).sort((a, b) => a.order - b.order);
}

function getFollowupQuestions_(day) {
  return getAllFollowupQuestions_().filter(item => item.active && item.checkpoints.indexOf(Number(day)) !== -1);
}

function ensureProgressResponseColumns_(sheet, questions) {
  const headers = sheet.getRange(1, 1, 1, Math.max(5, sheet.getLastColumn())).getDisplayValues()[0];
  const missing = questions.map(item => item.key).filter(key => headers.indexOf(key) === -1);
  if (missing.length) sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
}

function getFollowupWebAppUrl_() {
  return PropertiesService.getScriptProperties().getProperty('FOLLOWUP_WEB_APP_URL') || ScriptApp.getService().getUrl() || '';
}

function setFollowupWebAppUrl(url) {
  if (!/^https:\/\/script\.google\.com\//.test(String(url || ''))) throw new Error('Enter the deployed Apps Script web app URL.');
  PropertiesService.getScriptProperties().setProperty('FOLLOWUP_WEB_APP_URL', String(url));
}

function createProgressWebAppLink_(appUrl, participantId, sessionId, day) {
  const payload = {p: participantId, s: sessionId, d: Number(day), exp: Date.now() + 1000 * 60 * 60 * 24 * 75};
  const encoded = Utilities.base64EncodeWebSafe(JSON.stringify(payload)).replace(/=+$/, '');
  const secret = PropertiesService.getScriptProperties().getProperty('FOLLOWUP_TOKEN_SECRET');
  const signature = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(encoded, secret)).replace(/=+$/, '');
  return appUrl + (appUrl.indexOf('?') === -1 ? '?' : '&') + 'token=' + encodeURIComponent(encoded + '.' + signature);
}

function verifyProgressToken_(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) throw new Error('This progress link is invalid.');
  const secret = PropertiesService.getScriptProperties().getProperty('FOLLOWUP_TOKEN_SECRET');
  const expected = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(parts[0], secret)).replace(/=+$/, '');
  if (expected !== parts[1]) throw new Error('This progress link is invalid.');
  const payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString());
  if (!payload.p || !payload.s || [7, 14, 30].indexOf(Number(payload.d)) === -1 || Date.now() > Number(payload.exp)) throw new Error('This progress link has expired.');
  return payload;
}

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('FollowupApp');
  template.token = String(e && e.parameter && e.parameter.token || '');
  return template.evaluate().setTitle('Performance Rhythm Progress Check').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Private server-to-server endpoint used by performancerhythm.com.
 * The website supplies a shared token stored in Script Properties; no Sheet
 * data, form edit links, contact details, or follow-up links are returned.
 */
function doPost(e) {
  try {
    const request = JSON.parse(String(e && e.postData && e.postData.contents || '{}'));
    const expectedToken = PropertiesService.getScriptProperties().getProperty('WORKSHOP_API_KEY');
    if (!expectedToken || !constantTimeEquals_(String(request.authorizationToken || ''), expectedToken)) {
      return workshopApiJson_({ok: false, error: 'Not authorized.'});
    }

    const configuredSpreadsheetId = CONFIG.spreadsheetId || PropertiesService.getScriptProperties().getProperty('SURVEY_SPREADSHEET_ID');
    if (!configuredSpreadsheetId || String(request.spreadsheetId || '') !== configuredSpreadsheetId) {
      return workshopApiJson_({ok: false, error: 'Survey workspace mismatch.'});
    }

    if (request.action === 'healthCheck') {
      const healthSpreadsheet = getSurveySpreadsheet_();
      workshopPublicUrls_(healthSpreadsheet);
      return workshopApiJson_({ok: true, service: 'workshop-surveys'});
    }
    if (request.action !== 'createWorkshop') return workshopApiJson_({ok: false, error: 'Unsupported action.'});

    const company = cleanWorkshopApiText_(request.company, 120, 'company');
    const sessionName = cleanWorkshopApiText_(request.sessionName, 160, 'session name');
    const workshopDate = String(request.workshopDate || '');
    const startTime = String(request.startTime || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(workshopDate) || !isValidWorkshopDate_(workshopDate)) {
      throw new Error('Enter a valid workshop date.');
    }
    if (!/^([01]\d|2[0-3]):(00|15|30|45)$/.test(startTime)) {
      throw new Error('Start time must use a 15-minute increment.');
    }

    const ss = getSurveySpreadsheet_();
    const displayTime = workshopApiDisplayTime_(startTime);
    const sessionId = createSessionKey(workshopDate, displayTime);
    if (!sessionId) throw new Error('Unable to create the workshop session ID.');
    const urls = workshopPublicUrls_(ss);
    if (request.validateOnly === true) {
      return workshopApiJson_({
        ok: true,
        workshop: {
          id: sessionId,
          preSurveyUrl: urls.preSurveyUrl,
          postSurveyUrl: urls.postSurveyUrl,
          liveDashboardUrl: urls.liveDashboardUrl
        },
        validatedOnly: true
      });
    }

    registerWorkshopName_(ss, sessionId, company, sessionName);
    return workshopApiJson_({
      ok: true,
      workshop: {
        id: sessionId,
        preSurveyUrl: urls.preSurveyUrl,
        postSurveyUrl: urls.postSurveyUrl,
        liveDashboardUrl: urls.liveDashboardUrl
      }
    });
  } catch (error) {
    return workshopApiJson_({ok: false, error: String(error && error.message || 'Unable to create the workshop.')});
  }
}

function workshopApiJson_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function constantTimeEquals_(left, right) {
  left = String(left || '');
  right = String(right || '');
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index++) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function cleanWorkshopApiText_(value, maxLength, label) {
  const text = String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 2 || text.length > maxLength) throw new Error('Enter a valid ' + label + '.');
  return text;
}

function isValidWorkshopDate_(value) {
  const parts = value.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.getFullYear() === parts[0] && date.getMonth() === parts[1] - 1 && date.getDate() === parts[2];
}

function workshopApiDisplayTime_(value) {
  const parts = value.split(':').map(Number);
  const hour = parts[0];
  return (hour % 12 || 12) + ':' + String(parts[1]).padStart(2, '0') + ' ' + (hour < 12 ? 'AM' : 'PM');
}

function registerWorkshopName_(ss, sessionId, company, sessionName) {
  const sheet = ensureWorkshopNamesSheet_(ss);
  let targetRow = -1;
  if (sheet.getLastRow() >= 4) {
    const ids = sheet.getRange(4, 2, sheet.getLastRow() - 3, 1).getDisplayValues();
    const index = ids.findIndex(row => String(row[0]) === sessionId);
    if (index !== -1) targetRow = index + 4;
  }
  if (targetRow === -1) {
    targetRow = Math.max(4, sheet.getLastRow() + 1);
    sheet.getRange(targetRow, 1).insertCheckboxes().setValue(true);
  }
  sheet.getRange(targetRow, 2, 1, 4).setValues([[sessionId, company, sessionName, company + ' — ' + sessionName]]);
}

function workshopPublicUrls_(ss) {
  const config = ss.getSheetByName('Config');
  const values = config && config.getLastRow() ? config.getRange(1, 1, config.getLastRow(), 2).getDisplayValues() : [];
  const byKey = {};
  values.forEach(row => { if (row[0]) byKey[String(row[0])] = String(row[1] || ''); });
  const preSurveyUrl = byKey['Pre Form Public URL'];
  const postSurveyUrl = byKey['Post Form Public URL'];
  const dashboard = ss.getSheetByName('Live Dashboard');
  if (!/^https:\/\//.test(preSurveyUrl) || !/^https:\/\//.test(postSurveyUrl) || !dashboard) {
    throw new Error('Survey links or live dashboard are not configured.');
  }
  return {
    preSurveyUrl: preSurveyUrl,
    postSurveyUrl: postSurveyUrl,
    liveDashboardUrl: ss.getUrl() + '#gid=' + dashboard.getSheetId()
  };
}

function getFollowupPayload(token) {
  const payload = verifyProgressToken_(token);
  const contacts = getSurveySpreadsheet_().getSheetByName('Follow-Up Contacts');
  if (!contacts || contacts.getLastRow() < 2) throw new Error('This follow-up invitation is no longer active.');
  const rows = contacts.getRange(2, 1, contacts.getLastRow() - 1, 7).getValues();
  const contact = rows.find(row => String(row[0]) === String(payload.p) && String(row[2]) === String(payload.s));
  if (!contact || contact[6] !== true) throw new Error('This follow-up invitation is no longer active.');
  const labels = getWorkshopLabels_(getSurveySpreadsheet_());
  return {day: Number(payload.d), workshop: labels[payload.s] || payload.s, questions: getFollowupQuestions_(payload.d)};
}

function submitProgressFollowup(token, answers) {
  const payload = verifyProgressToken_(token);
  const questions = getFollowupQuestions_(payload.d);
  const provided = answers || {};
  questions.forEach(item => {
    if (item.required && String(provided[item.key] == null ? '' : provided[item.key]).trim() === '') throw new Error('Please answer: ' + item.question);
  });
  const ss = getSurveySpreadsheet_();
  const sheet = getOrCreateSheet_(ss, 'Progress Responses');
  ensureProgressResponseColumns_(sheet, getAllFollowupQuestions_());
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const existing = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getDisplayValues() : [];
  if (existing.some(row => row[1] === String(payload.p) && row[3] === 'Day ' + payload.d)) return {ok: true, duplicate: true};
  const base = {'Timestamp': new Date(), 'Participant ID': payload.p, 'Workshop Session ID': payload.s, 'Checkpoint': 'Day ' + payload.d, 'Submitted from': 'Private email link'};
  const row = headers.map(header => Object.prototype.hasOwnProperty.call(base, header) ? base[header] : (provided[header] == null ? '' : provided[header]));
  sheet.appendRow(row);
  if (String(provided.stop_reminders || '').toLowerCase() === 'yes') {
    const contacts = ss.getSheetByName('Follow-Up Contacts');
    const ids = contacts.getRange(2, 1, contacts.getLastRow() - 1, 1).getDisplayValues();
    const index = ids.findIndex(item => item[0] === String(payload.p));
    if (index !== -1) contacts.getRange(index + 2, 7).setValue(false);
  }
  refreshFollowupDashboard();
  return {ok: true, duplicate: false};
}

/** Sends only reminders that are due. Install the trigger separately after approval. */
function sendDueFollowupEmails() {
  const ss = getSurveySpreadsheet_();
  const contacts = ss.getSheetByName('Follow-Up Contacts');
  const appUrl = getFollowupWebAppUrl_();
  if (!contacts || contacts.getLastRow() < 2 || !appUrl) {
    throw new Error('The follow-up web app URL is not configured. Deploy the web app before enabling email reminders.');
  }
  const rows = contacts.getRange(2, 1, contacts.getLastRow() - 1, 10).getValues();
  const today = new Date();
  rows.forEach((row, index) => {
    if (row[6] !== true) return;
    const sessionDateText = String(row[2] || '').slice(0, 10);
    const sessionDate = /^\d{4}-\d{2}-\d{2}$/.test(sessionDateText)
      ? new Date(sessionDateText + 'T12:00:00') : new Date(row[5]);
    CONFIG.followupDays.forEach((day, dayIndex) => {
      const sentColumnIndex = 7 + dayIndex;
      if (row[sentColumnIndex]) return;
      const due = new Date(sessionDate);
      due.setDate(due.getDate() + day);
      if (today < due) return;
      const url = createProgressWebAppLink_(appUrl, row[0], row[2], day);
      MailApp.sendEmail({
        to: row[1],
        subject: 'Your Performance Rhythm ' + day + '-day progress check',
        htmlBody: '<p>Thank you for voluntarily participating in Performance Rhythm follow-up.</p>' +
          '<p>This brief progress check helps us understand how the workshop tools are being used over time.</p>' +
          '<p><a style="display:inline-block;background:#6E93AA;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold" href="' + url + '">Complete your ' + day + '-day progress check</a></p>' +
          '<p>Your individual answers and email address will not appear in company reports.</p>' +
          '<p>Performance Rhythm<br>contact@performancerhythm.com</p>',
        name: 'Performance Rhythm'
      });
      contacts.getRange(index + 2, sentColumnIndex + 1).setValue(new Date());
    });
  });
}

/** Sends a complete set of safe, working preview emails without affecting live reporting. */
function sendFollowupTestEmails() {
  const recipient = 'contact@performancerhythm.com';
  const participantId = 'TEST-CONTACT-PR';
  const sessionId = 'TEST-EMAIL-PREVIEW';
  const ss = getSurveySpreadsheet_();
  const contacts = getOrCreateSheet_(ss, 'Follow-Up Contacts');
  const appUrl = getFollowupWebAppUrl_();
  if (!appUrl) throw new Error('The follow-up web app URL is not configured.');

  const ids = contacts.getLastRow() > 1
    ? contacts.getRange(2, 1, contacts.getLastRow() - 1, 1).getDisplayValues()
    : [];
  const existingIndex = ids.findIndex(row => row[0] === participantId);
  const contactRow = [participantId, recipient, sessionId, 'Test', 1, new Date(), true, new Date(), new Date(), new Date()];
  if (existingIndex === -1) contacts.appendRow(contactRow);
  else contacts.getRange(existingIndex + 2, 1, 1, contactRow.length).setValues([contactRow]);

  CONFIG.followupDays.forEach(day => {
    const url = createProgressWebAppLink_(appUrl, participantId, sessionId, day);
    MailApp.sendEmail({
      to: recipient,
      subject: '[TEST] Your Performance Rhythm ' + day + '-day progress check',
      htmlBody: '<p><strong>This is a test of the Performance Rhythm follow-up system.</strong></p>' +
        '<p>This message previews the email an opted-in participant receives at the ' + day + '-day checkpoint.</p>' +
        '<p><a style="display:inline-block;background:#6E93AA;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold" href="' + url + '">Open the ' + day + '-day test progress check</a></p>' +
        '<p>The private link already knows the participant, workshop, and checkpoint. Test submissions are excluded from live management reporting.</p>' +
        '<p>Performance Rhythm<br>contact@performancerhythm.com</p>',
      name: 'Performance Rhythm'
    });
  });
  Logger.log('Sent 7-, 14-, and 30-day test emails to ' + recipient + '.');
}

function installFollowupEmailTrigger() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendDueFollowupEmails') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('sendDueFollowupEmails').timeBased().everyDays(1).atHour(8).create();
}

function recordFollowupConfig_(ss, enrollmentForm, followupForm) {
  const config = getOrCreateSheet_(ss, 'Config');
  const existing = config.getDataRange().getDisplayValues();
  const keys = new Set(existing.map(row => row[0]));
  const additions = [
    ['Follow-Up Enrollment Public URL', enrollmentForm.getPublishedUrl()],
    ['Follow-Up Enrollment QR URL', qrUrl_(enrollmentForm.getPublishedUrl())],
    ['Follow-Up Survey Public URL', followupForm.getPublishedUrl()],
    ['Follow-Up Survey QR URL', qrUrl_(followupForm.getPublishedUrl())]
  ].filter(row => !keys.has(row[0]));
  if (additions.length) config.getRange(config.getLastRow() + 1, 1, additions.length, 2).setValues(additions);
}

function setupFollowupDashboard_(ss) {
  let sheet = ss.getSheetByName('Follow-Up Dashboard');
  if (!sheet) sheet = ss.insertSheet('Follow-Up Dashboard', 2);
  sheet.clear();
  sheet.getCharts().forEach(chart => sheet.removeChart(chart));
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(4);
  sheet.setTabColor('#6E93AA');
  sheet.setColumnWidths(1, 8, 145);
  sheet.setColumnWidth(1, 260);
  sheet.getRange('A1:H2').merge().setValue('PERFORMANCE RHYTHM — FOLLOW-UP IMPACT')
    .setBackground('#243746').setFontColor('#FFFFFF').setFontSize(20).setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange('A3:H3').merge().setValue('Sustained practice adoption and workplace impact at 7, 14, and 30 days')
    .setBackground('#FFFFFF').setFontColor('#6E93AA').setFontSize(12).setFontWeight('bold');
}

function frequencyScore_(value) {
  return ({'Never': 0, 'Less than once a week': 1, 'Once a week': 2, 'A few times a week': 3, 'Daily': 4, 'Multiple times a day': 5})[value];
}

function refreshFollowupDashboard() {
  const ss = getSurveySpreadsheet_();
  setupFollowupDashboard_(ss);
  const dashboard = ss.getSheetByName('Follow-Up Dashboard');
  const responses = ss.getSheetByName('Progress Responses');
  const data = responses && responses.getLastRow() ? responses.getDataRange().getValues() : [];
  const responseHeaders = data.length ? data[0].map(String) : [];
  const participantIndex = responseHeaders.indexOf('Participant ID');
  const rows = data.length > 1
    ? data.slice(1).filter(row => participantIndex < 0 || !/^TEST-/i.test(String(row[participantIndex] || '')))
    : [];
  const column = key => responseHeaders.indexOf(key);
  dashboard.getRange('A5:H35').clearContent().clearFormat();
  dashboard.getRange('A5:H5').merge().setValue(rows.length ? rows.length + ' follow-up responses received' : 'No follow-up responses yet')
    .setBackground('#EAF1F5').setFontColor('#243746').setFontWeight('bold').setFontSize(13);
  const header = ['Checkpoint', 'Responses', 'Before frequency', 'Current frequency', 'Before stress', 'Current stress', 'Confidence', 'Workday use'];
  dashboard.getRange(7, 1, 1, header.length).setValues([header]).setBackground('#6E93AA').setFontColor('#FFFFFF').setFontWeight('bold');
  const checkpoints = ['Day 7', 'Day 14', 'Day 30'];
  const table = checkpoints.map(checkpoint => {
    const subset = rows.filter(row => row[column('Checkpoint')] === checkpoint);
    const avg = (key, converter) => {
      const index = column(key);
      if (!subset.length || index < 0) return '';
      const numbers = subset.map(row => Number(converter ? converter(row[index]) : row[index])).filter(value => !isNaN(value));
      return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : '';
    };
    return [checkpoint, subset.length, avg('baseline_frequency', frequencyScore_), avg('current_frequency', frequencyScore_), avg('baseline_stress'), avg('current_stress'), avg('confidence'), avg('workdays_used', value => parseInt(value, 10) || 0)];
  });
  dashboard.getRange(8, 1, table.length, header.length).setValues(table);
  dashboard.getRange('C8:H10').setNumberFormat('0.0');
  dashboard.getRange('A12:H12').merge().setValue('MANAGEMENT VIEW')
    .setBackground('#D97742').setFontColor('#FFFFFF').setFontWeight('bold');
  dashboard.getRange('A13:H13').merge().setValue('Track adoption, typical workplace stress, confidence using the tools, and workday use across each follow-up checkpoint. Written responses remain available below for anonymous themes and examples.');
  dashboard.getRange('A13:H13').setWrap(true).setVerticalAlignment('top');
  if (rows.length) {
    const checkpointIndex = column('Checkpoint');
    const changeIndex = column('meaningful_change');
    const supportIndex = column('support_needed');
    const comments = rows.filter(row => (changeIndex >= 0 && row[changeIndex]) || (supportIndex >= 0 && row[supportIndex]))
      .map(row => [row[checkpointIndex], changeIndex >= 0 ? row[changeIndex] || '' : '', supportIndex >= 0 ? row[supportIndex] || '' : '']);
    dashboard.getRange('A25:C25').setValues([['Checkpoint', 'Most meaningful change', 'Additional support requested']])
      .setBackground('#6E93AA').setFontColor('#FFFFFF').setFontWeight('bold');
    if (comments.length) dashboard.getRange(26, 1, comments.length, 3).setValues(comments).setWrap(true).setVerticalAlignment('top');
  }
  if (rows.length) {
    const chart1 = dashboard.newChart().setChartType(Charts.ChartType.LINE)
      .addRange(dashboard.getRange('A7:A10')).addRange(dashboard.getRange('C7:D10'))
      .setPosition(15, 1, 0, 0).setOption('title', 'Practice frequency: before workshop vs follow-up')
      .setOption('legend', {position: 'bottom'}).setOption('colors', ['#D97742', '#6E93AA']).setOption('vAxis', {minValue: 0, maxValue: 5}).build();
    const chart2 = dashboard.newChart().setChartType(Charts.ChartType.LINE)
      .addRange(dashboard.getRange('A7:A10')).addRange(dashboard.getRange('E7:G10'))
      .setPosition(15, 5, 0, 0).setOption('title', 'Stress reduction and confidence over time')
      .setOption('legend', {position: 'bottom'}).setOption('colors', ['#D97742', '#6E93AA', '#243746']).setOption('vAxis', {minValue: 0, maxValue: 10}).build();
    dashboard.insertChart(chart1);
    dashboard.insertChart(chart2);
  } else {
    dashboard.getRange('A15:H20').merge().setValue('Charts will appear here automatically after the first follow-up response.')
      .setBackground('#F6F8FA').setFontColor('#6E93AA').setFontSize(14).setFontStyle('italic')
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
  }
}

function installSurveySubmitTrigger_() {
  const ss = getSurveySpreadsheet_();
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onSurveyFormSubmit') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('onSurveyFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
}

/**
 * Recreates missing Forms without disturbing historical responses. The old
 * response tabs are retained as archives and their rows are copied into the
 * new form-linked destinations so reporting remains continuous.
 */
function rebuildSurveyFormsAndLinks() {
  const ss = getSurveySpreadsheet_();
  const folder = getOrCreateFolder_(CONFIG.folderName);
  const oldPre = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  const oldPost = ss.getSheetByName('Post Responses') || ss.getSheetByName('Form Responses 2');
  if (!oldPre || !oldPost) throw new Error('Historical pre/post response tabs were not found.');

  const preArchiveName = 'Historical Pre Responses';
  const postArchiveName = 'Historical Post Responses';
  const priorPreArchive = ss.getSheetByName(preArchiveName);
  const priorPostArchive = ss.getSheetByName(postArchiveName);
  if (priorPreArchive && priorPreArchive.getSheetId() !== oldPre.getSheetId()) ss.deleteSheet(priorPreArchive);
  if (priorPostArchive && priorPostArchive.getSheetId() !== oldPost.getSheetId()) ss.deleteSheet(priorPostArchive);
  oldPre.setName(preArchiveName);
  oldPost.setName(postArchiveName);

  const beforePreIds = new Set(ss.getSheets().map(s => s.getSheetId()));
  const preForm = createPreForm_(ss);
  SpreadsheetApp.flush();
  const newPre = ss.getSheets().find(s => !beforePreIds.has(s.getSheetId()));
  if (!newPre) throw new Error('The new pre-workshop response tab was not created.');
  newPre.setName('Pre Responses');
  if (oldPre.getLastRow() > 1) {
    const rows = oldPre.getRange(2, 1, oldPre.getLastRow() - 1, oldPre.getLastColumn()).getValues();
    newPre.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }

  const beforePostIds = new Set(ss.getSheets().map(s => s.getSheetId()));
  const postForm = createPostForm_(ss);
  SpreadsheetApp.flush();
  const newPost = ss.getSheets().find(s => !beforePostIds.has(s.getSheetId()));
  if (!newPost) throw new Error('The new post-workshop response tab was not created.');
  newPost.setName('Post Responses');
  if (oldPost.getLastRow() > 1) {
    const rows = oldPost.getRange(2, 1, oldPost.getLastRow() - 1, oldPost.getLastColumn()).getValues();
    newPost.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }

  DriveApp.getFileById(preForm.getId()).moveTo(folder);
  DriveApp.getFileById(postForm.getId()).moveTo(folder);
  preForm.setAcceptingResponses(true);
  postForm.setAcceptingResponses(true);

  const config = getOrCreateSheet_(ss, 'Config');
  config.clear();
  config.getRange(1, 1, 8, 2).setValues([
    ['Rebuilt', new Date()],
    ['Pre Form Edit URL', preForm.getEditUrl()],
    ['Pre Form Public URL', preForm.getPublishedUrl()],
    ['Post Form Edit URL', postForm.getEditUrl()],
    ['Post Form Public URL', postForm.getPublishedUrl()],
    ['Spreadsheet URL', ss.getUrl()],
    ['Pre QR URL', qrUrl_(preForm.getPublishedUrl())],
    ['Post QR URL', qrUrl_(postForm.getPublishedUrl())]
  ]);
  config.getRange('A1:A8').setFontWeight('bold');
  config.setColumnWidth(1, 190);
  config.setColumnWidth(2, 700);

  installSurveySubmitTrigger_();
  matchResponsesToCalculateStateScores();
  Logger.log('PRE_PUBLIC=' + preForm.getPublishedUrl());
  Logger.log('POST_PUBLIC=' + postForm.getPublishedUrl());
  Logger.log('PRE_EDIT=' + preForm.getEditUrl());
  Logger.log('POST_EDIT=' + postForm.getEditUrl());
}

function makeCurrentSurveyFormsPublic() {
  const preForm = FormApp.openById('1r5OZMhLh6H64OayKg2R29ZdEXVHgQS1BG21e47YTM-U');
  const postForm = FormApp.openById('1IGw-mc8E5CN4jW6wbm-VSnYcyxo9JX_W8iCXdBk4seI');
  [preForm, postForm].forEach(form => {
    form.setCollectEmail(false);
    form.setLimitOneResponsePerUser(false);
    if (typeof form.setRequireLogin === 'function') form.setRequireLogin(false);
    form.setAllowResponseEdits(false);
    form.setAcceptingResponses(true);
  });
  Logger.log('Pre public: ' + preForm.getPublishedUrl());
  Logger.log('Post public: ' + postForm.getPublishedUrl());
  Logger.log('Both forms accept anonymous responses without one-response login restrictions.');
}

/**
 * One-time upgrade for the current post-workshop Form. Safe to run again:
 * it adds the optional comments question only when it is missing.
 */
function addCommentsToCurrentPostSurvey() {
  const ss = getSurveySpreadsheet_();
  const form = FormApp.openById('1IGw-mc8E5CN4jW6wbm-VSnYcyxo9JX_W8iCXdBk4seI');
  const title = 'Comments or suggestions';
  const exists = form.getItems().some(item => item.getTitle() === title);
  if (!exists) form.addParagraphTextItem().setTitle(title).setRequired(false);
  calculateDashboard(ss);
  createCharts(ss);
  Logger.log(exists ? 'Comments question already existed.' : 'Comments question added to the post-workshop survey.');
}

function openWorkshopNames() {
  const ss = getSurveySpreadsheet_();
  const sheet = ensureWorkshopNamesSheet_(ss);
  ss.setActiveSheet(sheet);
}

function setupCheckboxes(ss) {
  ss = ss || getSurveySpreadsheet_();
  const dashboard = ss.getSheetByName('Live Dashboard');
  
  if (!dashboard) return;
  
  const sessions = getUniqueSessionsFromData(ss);
  const previous = {};
  const selectionRows = Math.max(0, Math.min(dashboard.getMaxRows() - 3, 197));
  if (selectionRows) {
    dashboard.getRange(4, 1, selectionRows, 2).getValues().forEach(row => {
      const key = String(row[0] || '').replace(/^☐\s*/, '').replace(/^☑\s*/, '');
      if (key && typeof row[1] === 'boolean') previous[key] = row[1];
    });
    dashboard.getRange(4, 1, selectionRows, 2).clearContent().clearDataValidations();
  }
  
  const allWasSelected = previous['All Workshops'];
  const hasPriorSelection = Object.keys(previous).length > 0;
  dashboard.getRange('A4:B4').setValues([['☑ All Workshops', hasPriorSelection ? allWasSelected : true]]);
  dashboard.getRange('B4').insertCheckboxes();
  
  dashboard.appendRow(['']);
  
  let row = 6;
  sessions.forEach(session => {
    const checked = hasPriorSelection ? previous[session] === true : true;
    dashboard.getRange(`A${row}:B${row}`).setValues([[`☐ ${session}`, checked]]);
    dashboard.getRange(`B${row}`).insertCheckboxes();
    row++;
  });
  
  Logger.log('✓ Checkboxes created for ' + sessions.length + ' sessions');
}

function onEdit(e) {
  onDashboardEdit(e);
}

/** Installable edit-trigger handler for this standalone Apps Script project. */
function onDashboardEdit(e) {
  if (!e || !e.source || !e.range) return;
  const sheet = e.range.getSheet();
  const range = e.range;
  if (sheet.getName() === 'Workshop Names') {
    const ss = e.source;
    const lock = LockService.getDocumentLock();
    if (!lock.tryLock(10000)) return;
    try {
      const sessions = getUniqueSessionsFromData(ss);
      if (range.getColumn() === 1 && range.getRow() === 2) {
        if (sheet.getLastRow() >= 4) sheet.getRange(4, 1, sheet.getLastRow() - 3, 1).setValue(range.getValue() === true);
      } else if (range.getColumn() === 1 && range.getRow() >= 4) {
        const allSelected = sessions.length > 0 && sheet.getRange(4, 1, sessions.length, 1).getValues().every(row => row[0] === true);
        sheet.getRange('A2').setValue(allSelected);
      }
      calculateDashboard(ss);
      createCharts(ss);
    } finally {
      lock.releaseLock();
    }
    return;
  }
  if (sheet.getName() !== 'Live Dashboard' || range.getColumn() !== 2 || range.getRow() < 4) return;

  const ss = e.source;
  const sessions = getUniqueSessionsFromData(ss);
  const lastSelectionRow = 5 + sessions.length;
  if (range.getRow() > lastSelectionRow) return;

  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(10000)) return;
  try {
    if (range.getRow() === 4) {
      syncAllWorkshopsCheckbox(ss);
    } else {
      const allSelected = sessions.length > 0 &&
        sheet.getRange(6, 2, sessions.length, 1).getValues().every(row => row[0] === true);
      sheet.getRange('B4').setValue(allSelected);
    }
    calculateDashboard(ss);
    createCharts(ss);
  } finally {
    lock.releaseLock();
  }
}

function installDashboardEditTrigger() {
  const ss = getSurveySpreadsheet_();
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onDashboardEdit' || trigger.getHandlerFunction() === 'onEdit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('onDashboardEdit').forSpreadsheet(ss).onEdit().create();
  Logger.log('✓ Dashboard edit trigger installed for: ' + ss.getUrl());
}

function syncAllWorkshopsCheckbox(ss) {
  const dashboard = ss.getSheetByName('Live Dashboard');
  if (!dashboard) return;
  
  const allChecked = dashboard.getRange('B4').getValue();
  const sessions = getUniqueSessionsFromData(ss);
  
  let row = 6;
  sessions.forEach(() => {
    dashboard.getRange(`B${row}`).setValue(allChecked);
    row++;
  });
  
  Logger.log('✓ Synced workshops: ' + (allChecked ? 'all checked' : 'all unchecked'));
}

function matchResponsesToCalculateStateScores() {
  const ss = getSurveySpreadsheet_();
  let preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  let postSheet = ss.getSheetByName('Post Responses') || ss.getSheetByName('Form Responses 2');
  const matchedSheet = ss.getSheetByName('Matched Results');
  
  if (!preSheet || !postSheet || !matchedSheet) {
    Logger.log('✗ Sheets not found');
    return;
  }
  
  const preData = preSheet.getDataRange().getValues();
  const postData = postSheet.getDataRange().getValues();
  
  const preResponses = {};
  for (let i = 1; i < preData.length; i++) {
    const date = preData[i][1];
    const time = preData[i][2];
    const word = preData[i][3];
    const number = preData[i][4];
    if (!date || !time || !word || !number) continue;
    
    const sessionKey = createSessionKey(date, time);
    if (!sessionKey) continue;
    
    const matchKey = `${sessionKey}_${word}_${number}`;
    preResponses[matchKey] = {
      sessionKey,
      stress: parseFloat(preData[i][7]) || 0,
      tension: parseFloat(preData[i][8]) || 0,
      calm: parseFloat(preData[i][9]) || 0,
      clarity: parseFloat(preData[i][10]) || 0,
      response: parseFloat(preData[i][11]) || 0
    };
  }
  
  const matches = [];
  for (let i = 1; i < postData.length; i++) {
    const date = postData[i][1];
    const time = postData[i][2];
    const word = postData[i][3];
    const number = postData[i][4];
    if (!date || !time || !word || !number) continue;
    
    const sessionKey = createSessionKey(date, time);
    if (!sessionKey) continue;
    
    const matchKey = `${sessionKey}_${word}_${number}`;
    
    if (preResponses[matchKey]) {
      const pre = preResponses[matchKey];
      const post = {
        stress: parseFloat(postData[i][5]) || 0,
        tension: parseFloat(postData[i][6]) || 0,
        calm: parseFloat(postData[i][7]) || 0,
        clarity: parseFloat(postData[i][8]) || 0,
        response: parseFloat(postData[i][9]) || 0
      };
      
      const preStateScore = ((10 - pre.stress) + (10 - pre.tension) + pre.calm + pre.clarity + pre.response) / 5;
      const postStateScore = ((10 - post.stress) + (10 - post.tension) + post.calm + post.clarity + post.response) / 5;
      
      const stressPercentChange = pre.stress === 0 ? 0 : (post.stress - pre.stress) / pre.stress;
      const tensionPercentChange = pre.tension === 0 ? 0 : (post.tension - pre.tension) / pre.tension;
      const calmPercentChange = pre.calm === 0 ? 0 : (post.calm - pre.calm) / pre.calm;
      const clarityPercentChange = pre.clarity === 0 ? 0 : (post.clarity - pre.clarity) / pre.clarity;
      const responsePercentChange = pre.response === 0 ? 0 : (post.response - pre.response) / pre.response;
      
      matches.push([
        sessionKey,
        pre.stress.toFixed(1), post.stress.toFixed(1), (post.stress - pre.stress).toFixed(1), stressPercentChange,
        pre.tension.toFixed(1), post.tension.toFixed(1), (post.tension - pre.tension).toFixed(1), tensionPercentChange,
        pre.calm.toFixed(1), post.calm.toFixed(1), (post.calm - pre.calm).toFixed(1), calmPercentChange,
        pre.clarity.toFixed(1), post.clarity.toFixed(1), (post.clarity - pre.clarity).toFixed(1), clarityPercentChange,
        pre.response.toFixed(1), post.response.toFixed(1), (post.response - pre.response).toFixed(1), responsePercentChange,
        preStateScore.toFixed(2), postStateScore.toFixed(2), (postStateScore - preStateScore).toFixed(2)
      ]);
    }
  }
  
  if (matches.length > 0) {
    if (matchedSheet.getLastRow() > 3) {
      matchedSheet.deleteRows(4, matchedSheet.getLastRow() - 3);
    }
    matchedSheet.getRange(4, 1, matches.length, matches[0].length).setValues(matches);
    formatMatchedResultsPercentages();
    Logger.log('✓ Matched ' + matches.length + ' pairs.');
  } else {
    Logger.log('✗ No pairs matched.');
  }
  
  ensureWorkshopNamesSheet_(ss);
  calculateDashboard(ss);
  createCharts(ss);
}

function calculateDashboard(ss) {
  const preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  const postSheet = ss.getSheetByName('Post Responses') || ss.getSheetByName('Form Responses 2');
  const report = ss.getSheetByName('Live Dashboard');
  
  if (!preSheet || !postSheet || !report) return;
  
  const preData = preSheet.getDataRange().getValues();
  const postData = postSheet.getDataRange().getValues();
  
  const checkedSessions = new Set(getSelectedSessions_(ss));
  
  Logger.log('Checked sessions: ' + Array.from(checkedSessions).join(', '));
  
  // Filter pre data
  const preValues = [];
  for (let i = 1; i < preData.length; i++) {
    const date = preData[i][1];
    const time = preData[i][2];
    const sessionKey = createSessionKey(date, time);
    
    if (!checkedSessions.has(sessionKey)) continue;
    
    const stress = parseFloat(preData[i][7]);
    const tension = parseFloat(preData[i][8]);
    const calm = parseFloat(preData[i][9]);
    const clarity = parseFloat(preData[i][10]);
    const response = parseFloat(preData[i][11]);
    
    if (!isNaN(stress) && !isNaN(tension) && !isNaN(calm) && !isNaN(clarity) && !isNaN(response)) {
      preValues.push([stress, tension, calm, clarity, response]);
    }
  }
  
  // Filter post data
  const postValues = [];
  for (let i = 1; i < postData.length; i++) {
    const date = postData[i][1];
    const time = postData[i][2];
    const sessionKey = createSessionKey(date, time);
    
    if (!checkedSessions.has(sessionKey)) continue;
    
    const stress = parseFloat(postData[i][5]);
    const tension = parseFloat(postData[i][6]);
    const calm = parseFloat(postData[i][7]);
    const clarity = parseFloat(postData[i][8]);
    const response = parseFloat(postData[i][9]);
    
    if (!isNaN(stress) && !isNaN(tension) && !isNaN(calm) && !isNaN(clarity) && !isNaN(response)) {
      postValues.push([stress, tension, calm, clarity, response]);
    }
  }
  
  Logger.log('Filtered: Pre=' + preValues.length + ', Post=' + postValues.length);
  
  const avg = (arr, idx) => arr.length ? arr.reduce((sum, row) => sum + row[idx], 0) / arr.length : 0;
  const pct = (pre, post) => pre === 0 ? 0 : (post - pre) / pre;
  
  const preMeasures = [
    avg(preValues, 0),
    avg(preValues, 1),
    avg(preValues, 2),
    avg(preValues, 3),
    avg(preValues, 4)
  ];
  
  const postMeasures = [
    avg(postValues, 0),
    avg(postValues, 1),
    avg(postValues, 2),
    avg(postValues, 3),
    avg(postValues, 4)
  ];
  
  const preState = ((10 - preMeasures[0]) + (10 - preMeasures[1]) + preMeasures[2] + preMeasures[3] + preMeasures[4]) / 5;
  const postState = ((10 - postMeasures[0]) + (10 - postMeasures[1]) + postMeasures[2] + postMeasures[3] + postMeasures[4]) / 5;
  
  // The chart occupies the top of the combined dashboard. Metrics begin on
  // row 22 and the selector summary sits beside them.
  report.getRange('N3:O100').clearContent().clearFormat();

  const matchedSheet = ss.getSheetByName('Matched Results');
  let matchedCount = 0;
  if (matchedSheet && matchedSheet.getLastRow() >= 4) {
    const matchedSessions = matchedSheet.getRange(4, 1, matchedSheet.getLastRow() - 3, 1).getValues();
    matchedCount = matchedSessions.filter(row => checkedSessions.has(String(row[0]))).length;
  }

  // Build dashboard rows in the fixed D:E reporting panel.
  const dashboardData = [
    ['RESPONSE COUNTS', ''],
    ['Pre-Workshop Responses', preValues.length],
    ['Post-Workshop Responses', postValues.length],
    ['Matched Pairs', matchedCount],
    ['', ''],
    ['PRE-WORKSHOP AVERAGES (1-10 scale)', ''],
    ['Average Stress', preMeasures[0]],
    ['Average Tension', preMeasures[1]],
    ['Average Calm', preMeasures[2]],
    ['Average Clarity', preMeasures[3]],
    ['Average Response Capacity', preMeasures[4]],
    ['Average State Score', preState],
    ['', ''],
    ['POST-WORKSHOP AVERAGES (1-10 scale)', ''],
    ['Average Stress', postMeasures[0]],
    ['Average Tension', postMeasures[1]],
    ['Average Calm', postMeasures[2]],
    ['Average Clarity', postMeasures[3]],
    ['Average Response Capacity', postMeasures[4]],
    ['Average State Score', postState],
    ['', ''],
    ['ABSOLUTE CHANGE (Post - Pre)', ''],
    ['Stress Change', postMeasures[0] - preMeasures[0]],
    ['Tension Change', postMeasures[1] - preMeasures[1]],
    ['Calm Change', postMeasures[2] - preMeasures[2]],
    ['Clarity Change', postMeasures[3] - preMeasures[3]],
    ['Response Capacity Change', postMeasures[4] - preMeasures[4]],
    ['State Score Change', postState - preState],
    ['', ''],
    ['PERCENTAGE CHANGE (%)', ''],
    ['Stress % Change', pct(preMeasures[0], postMeasures[0])],
    ['Tension % Change', pct(preMeasures[1], postMeasures[1])],
    ['Calm % Change', pct(preMeasures[2], postMeasures[2])],
    ['Clarity % Change', pct(preMeasures[3], postMeasures[3])],
    ['Response Capacity % Change', pct(preMeasures[4], postMeasures[4])]
  ];
  
  report.getRange(3, 14, dashboardData.length, 2).setValues(dashboardData);
  report.getRange('O33:O37').setNumberFormat('0.0%');
  report.getRange('N3:O3').setFontWeight('bold').setBackground('#D9EAF7');
  ['N8:O8', 'N16:O16', 'N24:O24', 'N32:O32'].forEach(a1 => {
    report.getRange(a1).setFontWeight('bold').setBackground('#EDEDED');
  });

  // Anonymous written feedback follows the dashboard and uses the same
  // workshop filter as the chart and numerical results.
  const writtenHeaderPattern = /(stressful aspects|insight|comment|suggestion|feedback|write[- ]?in)|^Column \d+$/i;
  const writtenIndexes = headers => headers
    .map((header, index) => ({ index, title: String(header || '').trim() }))
    .filter(field => writtenHeaderPattern.test(field.title));
  const displayQuestion = title => /^Column \d+$/i.test(title) ? 'Additional response' : title;
  const preWrittenFields = writtenIndexes(preData[0]);
  const postWrittenFields = writtenIndexes(postData[0]);
  const preFeedback = [];
  const postFeedback = [];
  for (let i = 1; i < preData.length; i++) {
    const sessionKey = createSessionKey(preData[i][1], preData[i][2]);
    if (!checkedSessions.has(sessionKey)) continue;
    preWrittenFields.forEach(field => {
      const answer = String(preData[i][field.index] || '').trim();
      if (answer) preFeedback.push(displayQuestion(field.title) + ': ' + answer);
    });
  }
  for (let i = 1; i < postData.length; i++) {
    const sessionKey = createSessionKey(postData[i][1], postData[i][2]);
    if (!checkedSessions.has(sessionKey)) continue;
    postWrittenFields.forEach(field => {
      const answer = String(postData[i][field.index] || '').trim();
      if (answer) postFeedback.push(displayQuestion(field.title) + ': ' + answer);
    });
  }
  report.getRange('A25:F500').breakApart().clearContent().clearFormat();
  report.getRange('A41:F41').merge().setBackground('#D9EAF7').setFontWeight('bold');
  report.getRange('A41').setValue('ANONYMOUS WRITTEN FEEDBACK');
  report.getRange('A43:C43').merge().setBackground('#EDEDED').setFontWeight('bold').setWrap(true);
  report.getRange('D43:F43').merge().setBackground('#EDEDED').setFontWeight('bold').setWrap(true);
  report.getRange('A43').setValue('PRE-WORKSHOP WRITE-IN RESPONSES');
  report.getRange('D43').setValue('POST-WORKSHOP WRITE-IN RESPONSES');
  const feedbackRows = Math.max(preFeedback.length, postFeedback.length, 1);
  const feedbackData = [];
  for (let i = 0; i < feedbackRows; i++) {
    feedbackData.push([
      preFeedback[i] ? '• ' + preFeedback[i] : (i === 0 && !preFeedback.length ? 'No written responses' : ''),
      '', '',
      postFeedback[i] ? '• ' + postFeedback[i] : (i === 0 && !postFeedback.length ? 'No written responses' : ''),
      ''
    ]);
  }
  for (let i = 0; i < feedbackRows; i++) {
    const row = 44 + i;
    report.getRange(row, 1, 1, 3).merge().setValue(feedbackData[i][0]);
    report.getRange(row, 4, 1, 3).merge().setValue(feedbackData[i][3]);
  }
  report.getRange(44, 1, feedbackRows, 6).setWrap(true).setVerticalAlignment('top');
  report.getRange(44, 1, feedbackRows, 3).setBackground('#FAFAFA');
  report.getRange(44, 4, feedbackRows, 3).setBackground('#FAFAFA');

  // Data-quality summary uses anonymous session + word + number keys. It
  // measures matching without excluding unmatched or duplicate write-ins.
  const buildQuality = (rows, scoreIndexes) => {
    const counts = {};
    let incomplete = 0;
    for (let i = 1; i < rows.length; i++) {
      const sessionKey = createSessionKey(rows[i][1], rows[i][2]);
      if (!checkedSessions.has(sessionKey)) continue;
      const word = String(rows[i][3] || '').trim().toLowerCase();
      const number = String(rows[i][4] || '').trim();
      const completeScores = scoreIndexes.every(index => !isNaN(parseFloat(rows[i][index])));
      if (!word || !number || !completeScores) incomplete++;
      if (!word || !number) continue;
      const key = sessionKey + '|' + word + '|' + number;
      counts[key] = (counts[key] || 0) + 1;
    }
    const keys = Object.keys(counts);
    const duplicates = keys.reduce((sum, key) => sum + Math.max(0, counts[key] - 1), 0);
    return { keys: new Set(keys), duplicates: duplicates, incomplete: incomplete };
  };
  const preQuality = buildQuality(preData, [7, 8, 9, 10, 11]);
  const postQuality = buildQuality(postData, [5, 6, 7, 8, 9]);
  const matchedKeys = Array.from(preQuality.keys).filter(key => postQuality.keys.has(key));
  const unmatchedPre = Math.max(0, preQuality.keys.size - matchedKeys.length);
  const unmatchedPost = Math.max(0, postQuality.keys.size - matchedKeys.length);
  const matchCoverage = Math.max(preQuality.keys.size, postQuality.keys.size)
    ? matchedKeys.length / Math.max(preQuality.keys.size, postQuality.keys.size)
    : 0;
  const duplicateCount = preQuality.duplicates + postQuality.duplicates;
  const incompleteCount = preQuality.incomplete + postQuality.incomplete;
  const qualityStatus = matchCoverage >= 0.8 && incompleteCount === 0 ? 'GOOD' :
    (matchCoverage >= 0.6 ? 'REVIEW' : 'NEEDS ATTENTION');

  report.getRange('A38:F40').breakApart().clearContent().clearFormat();
  report.getRange('A38:F38').merge().setValue('DATA QUALITY');
  report.getRange('A39:F39').setValues([[
    'Match coverage', matchCoverage,
    'Unmatched pre', unmatchedPre,
    'Unmatched post', unmatchedPost
  ]]);
  report.getRange('A40:F40').setValues([[
    'Potential duplicates', duplicateCount,
    'Incomplete records', incompleteCount,
    'Status', qualityStatus
  ]]);
  report.getRange('B39').setNumberFormat('0%');
  
  Logger.log('✓ Dashboard calculated');
}

function createCharts(ss) {
  const report = ss.getSheetByName('Live Dashboard');
  if (!report) return;

  report.getCharts().forEach(chart => report.removeChart(chart));
  const selectedList = getSelectedSessions_(ss);
  const labels = getWorkshopLabels_(ss);
  const selectedLabels = selectedList.map(id => labels[id] || id);

  report.getRange('A2:F4').breakApart().clearContent().clearFormat();
  report.getRange('A22:E22').clearContent().clearFormat();
  report.getRange('A2:F2').setBackground('#D9EAF7').setFontWeight('bold');
  report.getRange('A2:F2').setWrap(true).setVerticalAlignment('middle');
  report.setRowHeight(2, 42);
  report.getRange('A2').setValue('WORKSHOP FILTER');
  report.getRange('B2:C2').merge().setValue(selectedLabels.length ? selectedLabels.join(', ') : 'No workshops selected');
  report.getRange('D2').setValue('RESPONSES');
  report.getRange('E2:F2').merge().setValue(
    (parseFloat(report.getRange('O4').getValue()) || 0) + ' before / ' +
    (parseFloat(report.getRange('O5').getValue()) || 0) + ' after / ' +
    (parseFloat(report.getRange('O6').getValue()) || 0) + ' matched'
  );

  const preStress = parseFloat(report.getRange('O9').getValue()) || 0;
  const preTension = parseFloat(report.getRange('O10').getValue()) || 0;
  const preCalm = parseFloat(report.getRange('O11').getValue()) || 0;
  const preClarity = parseFloat(report.getRange('O12').getValue()) || 0;
  const preResponse = parseFloat(report.getRange('O13').getValue()) || 0;

  const postStress = parseFloat(report.getRange('O17').getValue()) || 0;
  const postTension = parseFloat(report.getRange('O18').getValue()) || 0;
  const postCalm = parseFloat(report.getRange('O19').getValue()) || 0;
  const postClarity = parseFloat(report.getRange('O20').getValue()) || 0;
  const postResponse = parseFloat(report.getRange('O21').getValue()) || 0;
  
  Logger.log('Chart data: Pre Stress=' + preStress + ', Post Stress=' + postStress);
  
  const chartData = [
    ['', 'Before Workshop', 'After Workshop'],
    ['Stress', preStress, postStress],
    ['Tension', preTension, postTension],
    ['Calm', preCalm, postCalm],
    ['Clarity', preClarity, postClarity],
    ['Ability to Respond Thoughtfully', preResponse, postResponse]
  ];
  
  report.getRange('J1:L20').clearContent().clearFormat();
  report.getRange(1, 10, chartData.length, 3).setValues(chartData);

  const changeLabel = (name, before, after) => {
    if (!before) return name + ': no baseline';
    const change = Math.round(Math.abs((after - before) / before) * 100);
    const direction = after > before ? 'increase' : (after < before ? 'decrease' : 'no change');
    return direction === 'no change' ? name + ': no change' : change + '% ' + direction + ' in ' + name.toLowerCase();
  };
  const callouts = [
    changeLabel('Stress', preStress, postStress),
    changeLabel('Tension', preTension, postTension),
    changeLabel('Calm', preCalm, postCalm),
    changeLabel('Clarity', preClarity, postClarity),
    changeLabel('Ability to Respond Thoughtfully', preResponse, postResponse)
  ];
  report.getRange('B4:F4').setValues([callouts])
    .setFontWeight('bold').setHorizontalAlignment('center').setWrap(true)
    .setBackground('#F3F6F8');
  report.setRowHeight(4, 42);
  report.setColumnWidth(1, 105);
  for (let column = 2; column <= 6; column++) report.setColumnWidth(column, 160);

  const chartTitle = selectedLabels.length === 0
    ? 'Pre vs Post — No workshops selected'
    : 'Pre vs Post — ' + (selectedLabels.length === 1 ? selectedLabels[0] : selectedLabels.length + ' workshops');
  const chart = report.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(report.getRange(1, 10, chartData.length, 3))
    .setNumHeaders(1)
    .setPosition(6, 1, 0, 0)
    .setOption('title', chartTitle)
    .setOption('width', 960)
    .setOption('height', 390)
    .setOption('colors', ['#D97742', '#5E8AA8'])
    .setOption('fontName', 'Arial')
    .setOption('backgroundColor', '#FFFFFF')
    .setOption('titleTextStyle', { color: '#243746', fontSize: 18, bold: true })
    .setOption('useFirstRowAsHeaders', true)
    .setOption('useFirstColumnAsDomain', true)
    .setOption('hAxis', { title: 'Metrics', textStyle: { color: '#4B5563' }, titleTextStyle: { color: '#4B5563' } })
    .setOption('vAxis', { title: 'Score (1-10)', minValue: 0, maxValue: 10, gridlines: { color: '#E7E2DD' }, textStyle: { color: '#4B5563' }, titleTextStyle: { color: '#4B5563' } })
    .setOption('legend', { position: 'bottom', textStyle: { color: '#374151', fontSize: 12 } })
    .build();
  
  report.insertChart(chart);

  // Prior breathwork/meditation experience is a pre-survey measure and uses
  // the same selected-workshop filter as every other dashboard element.
  const preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  const experienceCounts = {};
  if (preSheet) {
    const preData = preSheet.getDataRange().getValues();
    const experienceTitle = 'What is your past experience with breathwork and meditation?';
    const experienceIndex = preData.length ? preData[0].indexOf(experienceTitle) : -1;
    const selectedSessions = new Set(selectedList);
    if (experienceIndex >= 0) {
      for (let i = 1; i < preData.length; i++) {
        const sessionKey = createSessionKey(preData[i][1], preData[i][2]);
        const answer = String(preData[i][experienceIndex] || '').trim();
        if (selectedSessions.has(sessionKey) && answer) {
          experienceCounts[answer] = (experienceCounts[answer] || 0) + 1;
        }
      }
    }
  }
  const experienceRows = Object.keys(experienceCounts)
    .sort((a, b) => experienceCounts[b] - experienceCounts[a] || a.localeCompare(b))
    .map(answer => [answer, experienceCounts[answer]]);
  if (!experienceRows.length) experienceRows.push(['No responses', 0]);
  const experienceData = [['Prior experience', 'Attendees']].concat(experienceRows);
  report.getRange('R1:S20').clearContent().clearFormat();
  report.getRange(1, 18, experienceData.length, 2).setValues(experienceData);
  report.hideColumns(18, 2);

  const experienceChart = report.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(report.getRange(1, 18, experienceData.length, 2))
    .setNumHeaders(1)
    .setPosition(22, 1, 0, 0)
    .setOption('title', 'Attendee Experience Before the Workshop')
    .setOption('subtitle', selectedLabels.length === 1 ? selectedLabels[0] : selectedLabels.length + ' selected workshops')
    .setOption('width', 960)
    .setOption('height', 320)
    .setOption('colors', ['#6E93AA'])
    .setOption('fontName', 'Arial')
    .setOption('backgroundColor', '#FFFFFF')
    .setOption('titleTextStyle', { color: '#243746', fontSize: 18, bold: true })
    .setOption('useFirstRowAsHeaders', true)
    .setOption('useFirstColumnAsDomain', true)
    .setOption('hAxis', { title: 'Number of attendees', minValue: 0, format: '0', gridlines: { color: '#E7E2DD' }, textStyle: { color: '#4B5563' }, titleTextStyle: { color: '#4B5563' } })
    .setOption('vAxis', { textStyle: { color: '#374151', fontSize: 11 } })
    .setOption('legend', { position: 'none' })
    .build();
  report.insertChart(experienceChart);

  applyDashboardBranding_(report);
  createCompanyReport_(ss);
  
  Logger.log('✓ Charts created');
}

/** Builds a presentation-ready report for the currently selected workshops. */
function createCompanyReport_(ss) {
  const dashboard = ss.getSheetByName('Live Dashboard');
  if (!dashboard) return;
  let report = ss.getSheetByName('Client Report');
  if (!report) report = ss.insertSheet('Client Report', 1);
  report.clear();
  report.getCharts().forEach(chart => report.removeChart(chart));
  report.setHiddenGridlines(true);
  report.setFrozenRows(4);
  report.setTabColor('#6E93AA');

  const selectedIds = getSelectedSessions_(ss);
  const labels = getWorkshopLabels_(ss);
  const namesSheet = ss.getSheetByName('Workshop Names');
  const companyById = {};
  if (namesSheet && namesSheet.getLastRow() >= 4) {
    namesSheet.getRange(4, 2, namesSheet.getLastRow() - 3, 4).getDisplayValues().forEach(row => {
      companyById[String(row[0])] = String(row[1] || '').trim();
    });
  }
  const companies = Array.from(new Set(selectedIds.map(id => companyById[id]).filter(Boolean)));
  const clientName = companies.length === 1 ? companies[0] : (companies.length > 1 ? 'Combined Company Report' : 'Client Name');
  const workshopLabel = selectedIds.length
    ? selectedIds.map(id => labels[id] || id).join(', ')
    : 'No workshops selected';

  const metrics = [
    ['Stress', Number(dashboard.getRange('O9').getValue()) || 0, Number(dashboard.getRange('O17').getValue()) || 0],
    ['Tension', Number(dashboard.getRange('O10').getValue()) || 0, Number(dashboard.getRange('O18').getValue()) || 0],
    ['Calm', Number(dashboard.getRange('O11').getValue()) || 0, Number(dashboard.getRange('O19').getValue()) || 0],
    ['Clarity', Number(dashboard.getRange('O12').getValue()) || 0, Number(dashboard.getRange('O20').getValue()) || 0],
    ['Ability to Respond Thoughtfully', Number(dashboard.getRange('O13').getValue()) || 0, Number(dashboard.getRange('O21').getValue()) || 0]
  ];
  const preCount = Number(dashboard.getRange('O4').getValue()) || 0;
  const postCount = Number(dashboard.getRange('O5').getValue()) || 0;
  const matchedCount = Number(dashboard.getRange('O6').getValue()) || 0;
  const matchCoverage = Number(dashboard.getRange('B39').getValue()) || 0;

  report.getRange('A1:B4').merge().setValue('COMPANY LOGO\nDROP IMAGE HERE')
    .setBackground('#FFFFFF').setFontColor('#7D8B92').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true)
    .setBorder(true, true, true, true, true, true, '#B8A18D', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  report.getRange('C1:H2').merge().setValue('WORKSHOP IMPACT REPORT')
    .setBackground('#243746').setFontColor('#FFFFFF').setFontSize(22).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  report.getRange('C3:H3').merge().setValue(clientName)
    .setBackground('#E5EEF3').setFontColor('#355F78').setFontSize(16).setFontWeight('bold')
    .setHorizontalAlignment('center');
  report.getRange('C4:H4').merge().setValue(workshopLabel)
    .setBackground('#F6F3EF').setFontColor('#243746').setFontWeight('bold')
    .setHorizontalAlignment('center').setWrap(true);

  report.getRange('A6:H6').merge().setValue('EXECUTIVE SUMMARY')
    .setBackground('#243746').setFontColor('#FFFFFF').setFontWeight('bold');
  report.getRange('A7:H8').merge().setValue(
    preCount + ' attendees completed the pre-workshop survey, ' + postCount +
    ' completed the post-workshop survey, and ' + matchedCount +
    ' anonymous pairs were matched (' + Math.round(matchCoverage * 100) + '% coverage).'
  ).setBackground('#FFFFFF').setFontColor('#243746').setWrap(true).setVerticalAlignment('middle');

  report.getRange('A10:H10').merge().setValue('KEY OUTCOMES')
    .setBackground('#6E93AA').setFontColor('#FFFFFF').setFontWeight('bold');
  report.getRange('A11:D11').setValues([['Metric', 'Before', 'After', 'Percent change']])
    .setBackground('#243746').setFontColor('#FFFFFF').setFontWeight('bold');
  const outcomeRows = metrics.map(row => [row[0], row[1], row[2], row[1] ? (row[2] - row[1]) / row[1] : 0]);
  report.getRange(12, 1, outcomeRows.length, 4).setValues(outcomeRows);
  report.getRange('B12:C16').setNumberFormat('0.0');
  report.getRange('D12:D16').setNumberFormat('0%');
  report.getRange('A12:D16').setBorder(true, true, true, true, true, true, '#DDD5CD', SpreadsheetApp.BorderStyle.SOLID);

  const chartData = [['Metric', 'Before Workshop', 'After Workshop']].concat(metrics);
  report.getRange(1, 10, chartData.length, 3).setValues(chartData);
  const chart = report.newChart().setChartType(Charts.ChartType.COLUMN)
    .addRange(report.getRange(1, 10, chartData.length, 3)).setNumHeaders(1)
    .setPosition(18, 1, 0, 0)
    .setOption('title', 'Before and After Workshop')
    .setOption('width', 900).setOption('height', 380)
    .setOption('colors', ['#D97742', '#6E93AA'])
    .setOption('fontName', 'Arial').setOption('backgroundColor', '#FFFFFF')
    .setOption('titleTextStyle', { color: '#243746', fontSize: 18, bold: true })
    .setOption('vAxis', { title: 'Score (1-10)', minValue: 0, maxValue: 10, gridlines: { color: '#E7E2DD' } })
    .setOption('legend', { position: 'bottom' }).build();
  report.insertChart(chart);

  report.getRange('A39:H39').merge().setValue('ANONYMOUS PARTICIPANT VOICES')
    .setBackground('#D97742').setFontColor('#FFFFFF').setFontWeight('bold');
  const comments = [];
  if (dashboard.getLastRow() >= 44) {
    const values = dashboard.getRange(44, 4, Math.min(8, dashboard.getLastRow() - 43), 1).getDisplayValues();
    values.forEach(row => { if (row[0]) comments.push(row[0]); });
  }
  const voices = comments.slice(0, 3);
  if (!voices.length) voices.push('No written post-workshop feedback was submitted for this selection.');
  report.getRange(40, 1, voices.length, 8).setValues(voices.map(value => [value, '', '', '', '', '', '', '']));
  for (let i = 0; i < voices.length; i++) report.getRange(40 + i, 1, 1, 8).merge();
  report.getRange(40, 1, voices.length, 8).setWrap(true).setVerticalAlignment('top').setBackground('#FFFCF9');

  report.getRange('A1:H50').setFontFamily('Arial');
  report.setColumnWidths(1, 8, 112);
  report.setRowHeights(1, 4, 34);
  report.setRowHeight(7, 34);
  report.setRowHeight(8, 34);
  report.setRowHeightsForced(40, voices.length, 54);
  report.hideColumns(10, 3);
}

function applyDashboardBranding_(report) {
  const colors = {
    navy: '#243746',
    orange: '#D97742',
    sand: '#B8A18D',
    blue: '#6E93AA',
    slate: '#7D8B92',
    canvas: '#F6F3EF',
    white: '#FFFFFF',
    orangeTint: '#F8E8DC',
    blueTint: '#E5EEF3',
    sandTint: '#EEE8E1',
    line: '#DDD5CD'
  };

  report.setHiddenGridlines(true);
  report.setFrozenRows(2);
  report.getRange('A1:H100').setBackground(colors.canvas).setFontFamily('Arial').setFontColor(colors.navy);

  // Branded title band: logo at left, dashboard title at right.
  report.getRange('A1:F1').breakApart().clearContent();
  report.getRange('A1:B1').merge().setBackground(colors.white);
  report.getRange('C1:F1').merge()
    .setValue('WORKSHOP IMPACT DASHBOARD')
    .setBackground(colors.white).setFontColor(colors.blue)
    .setFontSize(20).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  report.setRowHeight(1, 160);

  // Workshop and response summary band.
  report.getRange('A2:F2').setBackground(colors.sandTint).setVerticalAlignment('middle');
  report.getRange('A2').setBackground(colors.orange).setFontColor(colors.white).setFontWeight('bold');
  report.getRange('B2:C2').setBackground(colors.white).setFontWeight('bold').setFontColor(colors.navy);
  report.getRange('D2').setBackground(colors.blue).setFontColor(colors.white).setFontWeight('bold');
  report.getRange('E2:F2').setBackground(colors.white).setFontWeight('bold').setFontColor(colors.navy);
  report.getRange('A2:F2').setBorder(true, true, true, true, true, true, colors.line, SpreadsheetApp.BorderStyle.SOLID);
  report.setRowHeight(2, 46);

  // Impact callout cards.
  report.getRange('A4').setValue('IMPACT').setBackground(colors.navy).setFontColor(colors.white)
    .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
  report.getRange('B4:C4').setBackground(colors.orangeTint).setFontColor('#9A4F25');
  report.getRange('D4:F4').setBackground(colors.blueTint).setFontColor('#355F78');
  report.getRange('A4:F4').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setWrap(true).setBorder(true, true, true, true, true, true, colors.white, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  report.setRowHeight(4, 48);

  // Data-quality panel beneath the charts.
  report.getRange('A38:F38').setBackground(colors.navy).setFontColor(colors.white)
    .setFontSize(12).setFontWeight('bold').setVerticalAlignment('middle');
  report.getRange('A39:F40').setBackground(colors.white).setFontColor(colors.navy)
    .setFontWeight('bold').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, colors.line, SpreadsheetApp.BorderStyle.SOLID);
  report.getRange('A39:A40').setBackground(colors.orangeTint).setFontColor('#9A4F25');
  report.getRange('C39:C40').setBackground(colors.sandTint);
  report.getRange('E39:E40').setBackground(colors.blueTint).setFontColor('#355F78');
  report.setRowHeight(38, 32);
  report.setRowHeights(39, 2, 34);

  // Feedback section styling.
  report.getRange('A41:F41').setBackground(colors.navy).setFontColor(colors.white)
    .setFontSize(12).setFontWeight('bold').setVerticalAlignment('middle');
  report.setRowHeight(41, 32);
  report.getRange('A43:C43').setBackground(colors.orangeTint).setFontColor('#7C3F21')
    .setFontWeight('bold').setVerticalAlignment('middle');
  report.getRange('D43:F43').setBackground(colors.blueTint).setFontColor('#315A72')
    .setFontWeight('bold').setVerticalAlignment('middle');
  report.setRowHeight(43, 52);
  const feedbackLastRow = Math.max(44, report.getLastRow());
  report.getRange(44, 1, feedbackLastRow - 43, 3).setBackground('#FFFCF9')
    .setBorder(true, true, true, true, false, false, colors.line, SpreadsheetApp.BorderStyle.SOLID);
  report.getRange(44, 4, feedbackLastRow - 43, 3).setBackground('#FBFDFE')
    .setBorder(true, true, true, true, false, false, colors.line, SpreadsheetApp.BorderStyle.SOLID);

  // Balanced column proportions for the dashboard canvas.
  report.setColumnWidth(1, 130);
  for (let column = 2; column <= 6; column++) report.setColumnWidth(column, 166);
  report.setColumnWidth(7, 145);
  report.setColumnWidth(8, 24);

  // Keep the native logo in the top-left brand panel on every refresh.
  const dashboardImages = report.getImages();
  if (dashboardImages.length) {
    dashboardImages[0]
      .setAnchorCell(report.getRange('A1'))
      .setAnchorCellXOffset(40)
      .setAnchorCellYOffset(10)
      .setWidth(210)
      .setHeight(140);
  }
}

/**
 * Applies the Performance Rhythm visual system to every populated supporting
 * tab without changing cell values, formulas, validation, or form links.
 */
function beautifySupportingTabs() {
  const ss = getSurveySpreadsheet_();
  const colors = {
    navy: '#243746', orange: '#D97742', sand: '#B8A18D', blue: '#6E93AA',
    slate: '#7D8B92', canvas: '#F6F3EF', white: '#FFFFFF',
    orangeTint: '#F8E8DC', line: '#DDD5CD'
  };

  const applyBanding = (sheet, headerRow, lastRow, lastColumn, headerColor) => {
    sheet.getBandings().forEach(banding => banding.remove());
    if (lastRow < headerRow || lastColumn < 1) return;
    const banding = sheet.getRange(headerRow, 1, lastRow - headerRow + 1, lastColumn)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
    banding.setHeaderRowColor(headerColor)
      .setFirstRowColor(colors.white)
      .setSecondRowColor(colors.canvas);
  };

  const styleResponseSheet = (name, headerColor, tabColor) => {
    const sheet = ss.getSheetByName(name);
    if (!sheet || sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) return;
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];

    sheet.setHiddenGridlines(true);
    sheet.setFrozenRows(1);
    sheet.setTabColor(tabColor);
    sheet.getRange(1, 1, lastRow, lastColumn)
      .setFontFamily('Arial').setFontColor(colors.navy).setVerticalAlignment('middle');
    applyBanding(sheet, 1, lastRow, lastColumn, headerColor);
    sheet.getRange(1, 1, 1, lastColumn)
      .setBackground(headerColor).setFontColor(colors.white).setFontWeight('bold').setWrap(true)
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
    sheet.setRowHeight(1, 76);
    if (lastRow > 1) {
      sheet.setRowHeights(2, lastRow - 1, 34);
      sheet.getRange(2, 1, lastRow - 1, lastColumn).setVerticalAlignment('top');
    }

    headers.forEach((header, index) => {
      const column = index + 1;
      let width = 108;
      if (index === 0) width = 150;
      else if (/date/i.test(header)) width = 110;
      else if (/time/i.test(header)) width = 100;
      else if (/favorite word/i.test(header)) width = 125;
      else if (/unique number/i.test(header)) width = 95;
      else if (/department/i.test(header)) width = 160;
      else if (/(stressful aspects|insight|comment|suggestion|feedback|experience|Column \d+)/i.test(header)) width = 280;
      else if (header.length > 55) width = 175;
      else if (header.length > 30) width = 150;
      sheet.setColumnWidth(column, width);
      if (width >= 175 && lastRow > 1) sheet.getRange(2, column, lastRow - 1, 1).setWrap(true);
    });
    // Keep long written answers readable without letting a single response
    // turn into an oversized row; the full text remains available in the cell.
    if (lastRow > 1) sheet.setRowHeightsForced(2, lastRow - 1, 48);
  };

  const selector = ss.getSheetByName('Workshop Names');
  if (selector) {
    const lastRow = Math.max(3, selector.getLastRow());
    const lastColumn = Math.max(5, selector.getLastColumn());
    selector.setHiddenGridlines(true);
    selector.setFrozenRows(3);
    selector.setTabColor(colors.orange);
    selector.getRange('A1:E1').breakApart().merge()
      .setBackground(colors.navy).setFontColor(colors.white)
      .setFontFamily('Arial').setFontSize(18).setFontWeight('bold')
      .setHorizontalAlignment('left').setVerticalAlignment('middle');
    selector.setRowHeight(1, 52);
    selector.getRange('A2:E2').setBackground(colors.orangeTint).setFontColor(colors.navy)
      .setFontFamily('Arial').setFontWeight('bold').setVerticalAlignment('middle');
    selector.setRowHeight(2, 38);
    if (selector.getMaxRows() > 3) {
      selector.getRange(4, 1, selector.getMaxRows() - 3, lastColumn).setBackground(colors.white);
    }
    applyBanding(selector, 3, lastRow, lastColumn, colors.blue);
    selector.getRange(3, 1, 1, lastColumn).setBackground(colors.blue).setFontColor(colors.white)
      .setFontFamily('Arial').setFontWeight('bold').setHorizontalAlignment('center');
    selector.setRowHeight(3, 38);
    [80, 165, 190, 230, 285].forEach((width, index) => selector.setColumnWidth(index + 1, width));
    if (lastRow > 3) selector.getRange(4, 5, lastRow - 3, 1).setBackground(colors.orangeTint);
  }

  const matched = ss.getSheetByName('Matched Results');
  if (matched && matched.getLastColumn()) {
    const lastRow = Math.max(2, matched.getLastRow());
    const lastColumn = matched.getLastColumn();
    matched.setHiddenGridlines(true);
    matched.setFrozenRows(2);
    matched.setFrozenColumns(1);
    matched.setTabColor(colors.blue);
    matched.getRange(1, 1, 1, lastColumn).setBackground(colors.navy)
      .setFontColor(colors.white).setFontFamily('Arial').setFontWeight('bold')
      .setFontSize(12).setVerticalAlignment('middle');
    matched.setRowHeight(1, 36);
    applyBanding(matched, 2, lastRow, lastColumn, colors.blue);
    matched.getRange(2, 1, 1, lastColumn).setBackground(colors.blue).setFontColor(colors.white)
      .setFontFamily('Arial').setFontWeight('bold').setWrap(true)
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
    matched.setRowHeight(2, 64);
    matched.getRange(1, 1, lastRow, lastColumn).setFontFamily('Arial');
    matched.setColumnWidth(1, 165);
    for (let column = 2; column <= lastColumn; column++) matched.setColumnWidth(column, 112);
  }

  styleResponseSheet('Pre Responses', colors.orange, colors.orange);
  styleResponseSheet('Post Responses', colors.blue, colors.blue);
  styleResponseSheet('Historical Pre Responses', colors.sand, colors.sand);
  styleResponseSheet('Historical Post Responses', colors.slate, colors.slate);

  const config = ss.getSheetByName('Config');
  if (config && config.getLastRow()) {
    const lastRow = config.getLastRow();
    config.setHiddenGridlines(true);
    config.setFrozenColumns(1);
    config.setTabColor(colors.sand);
    config.getRange(1, 1, lastRow, 2).setFontFamily('Arial').setVerticalAlignment('middle')
      .setBorder(true, true, true, true, true, true, colors.line, SpreadsheetApp.BorderStyle.SOLID);
    config.getRange(1, 1, lastRow, 1).setBackground(colors.navy)
      .setFontColor(colors.white).setFontWeight('bold');
    config.getRange(1, 2, lastRow, 1).setBackground(colors.white)
      .setFontColor(colors.blue).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    config.setColumnWidth(1, 180);
    config.setColumnWidth(2, 620);
    config.setRowHeights(1, lastRow, 38);
  }

  const dashboard = ss.getSheetByName('Live Dashboard');
  if (dashboard) dashboard.setTabColor(colors.navy);
  Logger.log('✓ Supporting tabs beautified.');
}

/** Runs a non-emailing operational check and records the results in Sheets. */
function runSurveyHealthCheck() {
  const ss = getSurveySpreadsheet_();
  let health = ss.getSheetByName('System Health');
  if (!health) health = ss.insertSheet('System Health');
  health.clear();
  const checks = [];
  const add = (name, ok, detail) => checks.push([name, ok ? 'PASS' : 'ACTION NEEDED', detail]);

  const requiredTabs = ['Live Dashboard', 'Client Report', 'Workshop Names', 'Matched Results', 'Pre Responses', 'Post Responses', 'Config'];
  const missingTabs = requiredTabs.filter(name => !ss.getSheetByName(name));
  add('Required spreadsheet tabs', missingTabs.length === 0,
    missingTabs.length ? 'Missing: ' + missingTabs.join(', ') : 'All required tabs are present.');

  const preSheet = ss.getSheetByName('Pre Responses');
  const postSheet = ss.getSheetByName('Post Responses');
  add('Pre-workshop response destination', !!preSheet && preSheet.getLastColumn() >= 12,
    preSheet ? preSheet.getLastRow() - 1 + ' stored responses.' : 'Pre Responses tab is missing.');
  add('Post-workshop response destination', !!postSheet && postSheet.getLastColumn() >= 10,
    postSheet ? postSheet.getLastRow() - 1 + ' stored responses.' : 'Post Responses tab is missing.');

  const formChecks = [
    ['Pre-workshop form', '1r5OZMhLh6H64OayKg2R29ZdEXVHgQS1BG21e47YTM-U'],
    ['Post-workshop form', '1IGw-mc8E5CN4jW6wbm-VSnYcyxo9JX_W8iCXdBk4seI']
  ];
  formChecks.forEach(item => {
    try {
      const form = FormApp.openById(item[1]);
      const accepting = form.isAcceptingResponses();
      add(item[0], accepting, accepting ? 'Open and accepting anonymous responses.' : 'Form is not accepting responses.');
    } catch (error) {
      add(item[0], false, 'Could not open form: ' + error.message);
    }
  });

  const handlers = ScriptApp.getProjectTriggers().map(trigger => trigger.getHandlerFunction());
  add('Form-submit trigger', handlers.indexOf('onSurveyFormSubmit') !== -1,
    handlers.indexOf('onSurveyFormSubmit') !== -1 ? 'Installed.' : 'Trigger must be reinstalled.');
  add('Workshop-filter trigger', handlers.indexOf('onDashboardEdit') !== -1,
    handlers.indexOf('onDashboardEdit') !== -1 ? 'Installed.' : 'Trigger must be reinstalled.');
  add('Daily health-check trigger', handlers.indexOf('runSurveyHealthCheck') !== -1,
    handlers.indexOf('runSurveyHealthCheck') !== -1 ? 'Installed.' : 'Trigger must be reinstalled.');

  const dashboard = ss.getSheetByName('Live Dashboard');
  add('Dashboard charts', !!dashboard && dashboard.getCharts().length >= 2,
    dashboard ? dashboard.getCharts().length + ' charts found.' : 'Dashboard tab is missing.');

  const config = ss.getSheetByName('Config');
  let qrCount = 0;
  if (config && config.getLastRow()) {
    config.getRange(1, 1, config.getLastRow(), 2).getDisplayValues().forEach(row => {
      if (/QR URL/i.test(row[0]) && /^https?:\/\//i.test(row[1])) qrCount++;
    });
  }
  add('Survey QR links', qrCount >= 2, qrCount + ' configured QR links found.');

  const failures = checks.filter(row => row[1] !== 'PASS').length;
  const overall = failures ? 'ACTION NEEDED' : 'ALL SYSTEMS HEALTHY';
  health.getRange('A1:C1').merge().setValue('PERFORMANCE RHYTHM — SURVEY SYSTEM HEALTH')
    .setBackground('#243746').setFontColor('#FFFFFF').setFontSize(18).setFontWeight('bold');
  health.getRange('A2:B2').setValues([['Last checked', new Date()]]);
  health.getRange('A3:B3').setValues([['Overall status', overall]]);
  health.getRange('A5:C5').setValues([['Check', 'Status', 'Details']])
    .setBackground('#6E93AA').setFontColor('#FFFFFF').setFontWeight('bold');
  health.getRange(6, 1, checks.length, 3).setValues(checks);
  health.getRange(6, 2, checks.length, 1).setFontWeight('bold');
  checks.forEach((row, index) => {
    health.getRange(6 + index, 2).setBackground(row[1] === 'PASS' ? '#E6F4EA' : '#FCE8E6')
      .setFontColor(row[1] === 'PASS' ? '#137333' : '#B3261E');
  });
  health.getRange(1, 1, 5 + checks.length, 3).setFontFamily('Arial').setVerticalAlignment('middle');
  health.setHiddenGridlines(true);
  health.setFrozenRows(5);
  health.setTabColor(failures ? '#D97742' : '#6E93AA');
  health.setColumnWidth(1, 235);
  health.setColumnWidth(2, 145);
  health.setColumnWidth(3, 520);
  health.setRowHeights(6, checks.length, 34);
  Logger.log('Health check complete: ' + overall);
}

/** Installs one daily morning health check and runs it immediately. */
function installAutomaticHealthCheck() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'runSurveyHealthCheck') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('runSurveyHealthCheck').timeBased().everyDays(1).atHour(6).create();
  runSurveyHealthCheck();
  Logger.log('✓ Daily health check installed for approximately 6:00 AM.');
}

/**
 * One-time repair for the existing workbook. This does not recreate or edit
 * either Form and does not change any survey questions.
 */
function repairDashboardAndCharts() {
  const ss = getSurveySpreadsheet_();
  const dashboard = ss.getSheetByName('Live Dashboard');
  dashboard.clear();
  dashboard.getCharts().forEach(chart => dashboard.removeChart(chart));
  dashboard.getRange('A1').setValue('Performance Rhythm Workshop — Live Dashboard')
    .setFontSize(16).setFontWeight('bold');
  dashboard.setFrozenRows(1);
  dashboard.setColumnWidth(1, 310);
  dashboard.setColumnWidth(2, 250);
  dashboard.setColumnWidth(4, 310);
  dashboard.setColumnWidth(5, 140);
  const oldNames = ss.getSheetByName('Workshop Names');
  if (oldNames) ss.deleteSheet(oldNames);
  ensureWorkshopNamesSheet_(ss);
  calculateDashboard(ss);
  dashboard.getRange('E28:E30').setNumberFormat('0');
  dashboard.getRange('E33:E54').setNumberFormat('0.00');
  dashboard.getRange('E57:E61').setNumberFormat('0.0%');
  createCharts(ss);
  installDashboardEditTrigger();
  const oldCharts = ss.getSheetByName('Charts');
  if (oldCharts && ss.getSheets().length > 1) ss.deleteSheet(oldCharts);
  Logger.log('✓ Live Dashboard and Charts repaired: ' + ss.getUrl());
}

function createFiveTestSurveys() {
  Logger.log('🧪 Creating 5 test surveys...');
  const files = DriveApp.getFilesByName(CONFIG.spreadsheetName);
  if (!files.hasNext()) { Logger.log('✗ Spreadsheet not found.'); return; }
  
  const ss = SpreadsheetApp.openById(files.next().getId());
  let preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  let postSheet = ss.getSheetByName('Post Responses') || ss.getSheetByName('Form Responses 2');
  
  if (!preSheet || !postSheet) { Logger.log('✗ Sheets not found.'); return; }
  
  if (preSheet.getLastRow() > 1) preSheet.deleteRows(2, preSheet.getLastRow() - 1);
  if (postSheet.getLastRow() > 1) postSheet.deleteRows(2, postSheet.getLastRow() - 1);
  
  const workshop1 = new Date(2026, 7, 19);
  const testTime1 = '9:00 AM';
  const testData = [
    { w: 'Quartz', n: '5', preSt: 6, preTn: 7, preCa: 3, preCl: 2, preRe: 4, postSt: 3, postTn: 4, postCa: 7, postCl: 7, postRe: 7 },
    { w: 'Prism', n: '12', preSt: 8, preTn: 8, preCa: 2, preCl: 3, preRe: 3, postSt: 4, postTn: 5, postCa: 8, postCl: 8, postRe: 8 },
    { w: 'Thistle', n: '7', preSt: 5, preTn: 5, preCa: 5, preCl: 5, preRe: 5, postSt: 4, postTn: 4, postCa: 7, postCl: 7, postRe: 7 },
    { w: 'Beacon', n: '19', preSt: 7, preTn: 6, preCa: 3, preCl: 4, preRe: 4, postSt: 4, postTn: 3, postCa: 8, postCl: 8, postRe: 8 },
    { w: 'Granite', n: '23', preSt: 4, preTn: 4, preCa: 6, preCl: 6, preRe: 6, postSt: 2, postTn: 2, postCa: 8, postCl: 9, postRe: 9 }
  ];
  
  testData.forEach(d => {
    preSheet.appendRow([new Date(), workshop1, testTime1, d.w, d.n, 'Sales', 'Meetings', d.preSt, d.preTn, d.preCa, d.preCl, d.preRe, 'New']);
    postSheet.appendRow([new Date(), workshop1, testTime1, d.w, d.n, d.postSt, d.postTn, d.postCa, d.postCl, d.postRe, 8, 'Great!']);
  });
  
  Logger.log('✓ 5 test surveys created');
}

function createSixAdditionalTestSurveys() {
  Logger.log('🧪 Creating 6 additional test surveys...');
  const files = DriveApp.getFilesByName(CONFIG.spreadsheetName);
  if (!files.hasNext()) { Logger.log('✗ Spreadsheet not found.'); return; }
  
  const ss = SpreadsheetApp.openById(files.next().getId());
  let preSheet = ss.getSheetByName('Pre Responses') || ss.getSheetByName('Form Responses 1');
  let postSheet = ss.getSheetByName('Post Responses') || ss.getSheetByName('Form Responses 2');
  
  if (!preSheet || !postSheet) { Logger.log('✗ Sheets not found.'); return; }
  
  const workshop2 = new Date(2026, 7, 20);
  const testTime2 = '10:00 AM';
  
  const testData = [
    { w: 'Orchid', n: '8', preSt: 7, preTn: 8, preCa: 2, preCl: 3, preRe: 4, postSt: 4, postTn: 4, postCa: 7, postCl: 8, postRe: 8 },
    { w: 'Nebula', n: '15', preSt: 6, preTn: 6, preCa: 4, preCl: 4, preRe: 5, postSt: 3, postTn: 3, postCa: 7, postCl: 8, postRe: 8 },
    { w: 'Mosaic', n: '11', preSt: 8, preTn: 7, preCa: 3, preCl: 2, preRe: 3, postSt: 3, postTn: 2, postCa: 8, postCl: 8, postRe: 8 },
    { w: 'Glacier', n: '24', preSt: 5, preTn: 6, preCa: 5, preCl: 4, preRe: 5, postSt: 2, postTn: 3, postCa: 8, postCl: 8, postRe: 9 },
    { w: 'Saffron', n: '30', preSt: 7, preTn: 7, preCa: 2, preCl: 3, preRe: 4, postSt: 4, postTn: 4, postCa: 7, postCl: 8, postRe: 8 },
    { w: 'Obsidian', n: '9', preSt: 6, preTn: 7, preCa: 3, preCl: 3, preRe: 4, postSt: 3, postTn: 3, postCa: 8, postCl: 8, postRe: 8 }
  ];
  
  testData.forEach(d => {
    preSheet.appendRow([new Date(), workshop2, testTime2, d.w, d.n, 'Customer Success', 'Client demands', d.preSt, d.preTn, d.preCa, d.preCl, d.preRe, 'Familiar']);
    postSheet.appendRow([new Date(), workshop2, testTime2, d.w, d.n, d.postSt, d.postTn, d.postCa, d.postCl, d.postRe, 9, 'Transformative!']);
  });
  
  Logger.log('✓ 6 additional test surveys created');
}

function formatMatchedResultsPercentages() {
  const files = DriveApp.getFilesByName(CONFIG.spreadsheetName);
  if (!files.hasNext()) return;
  
  const ss = SpreadsheetApp.openById(files.next().getId());
  const matched = ss.getSheetByName('Matched Results');
  
  if (!matched) return;
  
  matched.getRange('E:E').setNumberFormat('0.0%');
  matched.getRange('I:I').setNumberFormat('0.0%');
  matched.getRange('M:M').setNumberFormat('0.0%');
  matched.getRange('Q:Q').setNumberFormat('0.0%');
  matched.getRange('U:U').setNumberFormat('0.0%');
  
  Logger.log('✓ Percentages formatted');
}
