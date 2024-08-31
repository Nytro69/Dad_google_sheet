function insertImagesAndNames() {
  // Get the active spreadsheet and the active sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Get the root folder where all image folders are located
  var rootFolder = DriveApp.getFolderById('YOUR_ROOT_FOLDER_ID_HERE'); 
  
  // Start from row 2 (change if you want it to start somewhere else)
  var row = 2;
  
  // Iterate through all folders in the root folder
  var folders = rootFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var folderName = folder.getName();
    
    // Check if there's an "online" subfolder
    var onlineFolders = folder.getFoldersByName('online');
    if (onlineFolders.hasNext()) {
      var onlineFolder = onlineFolders.next();
      
      // Get the first image file in the online folder
      var images = onlineFolder.getFilesByType(MimeType.JPEG);
      if (images.hasNext()) {
        var image = images.next();
        var imageId = image.getId();
        var imageName = image.getName();
        
        // Insert the image in column A (you can change column in the getRange, it's 1 by default, 1 -> A, 2 -> B, 3 -> C ...)
        var imageCell = sheet.getRange(row, 1);
        imageCell.setFormula('=IMAGE("https://drive.google.com/uc?export=view&id=' + imageId + '")');
        
        // Insert the image name in column B (you can change column in the getRange, it's 2 by default, 1 -> A, 2 -> B, 3 -> C ...)
        sheet.getRange(row, 2).setValue(folderName);
        
        // Move to the next row
        row++;
      }
    }
  }
}
