function doPost(e) {
  try {
    // Get the spreadsheet by ID
    var spreadsheet = SpreadsheetApp.openById('1nn5yJWydzTNcsiybWLVlv3RkYpGzyKQR_-YHhG-QY2E');
    var sheet = spreadsheet.getSheets()[0]; // Get the first sheet

    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);

    // Prepare the row data in the order of form fields
    var rowData = [
      data.firstName,
      data.lastName,
      data.fatherName,
      data.dateOfBirth,
      data.gender,
      data.aadharNumber,
      data.mobileNumber,
      data.emailAddress,
      data.permanentAddress,
      data.city,
      data.district,
      data.pincode,
      data.courseType,
      data.preferredCourse,
      data.lastQualification,
      data.percentage,
      data.schoolName,
      data.community,
      data.annualFamilyIncome,
      data.referralSource,
      new Date() // Timestamp
    ];

    // Append the row to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Data added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}