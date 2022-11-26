const newLine = /\r?\n/;
const fieldDelimiter = ",";

export function convertCsvToJson(parsedCsv) {
  try {
    var lines = parsedCsv.split(newLine);
    var headers = lines[0].split(fieldDelimiter);
    var jsonResult = [];
    for (let i = 1; i < lines.length; i++) {
      var currentLine = lines[i].split(fieldDelimiter);
      if (hasContent(currentLine)) {
        jsonResult.push(buildJsonResult(headers, currentLine));
      }
    }

    return jsonResult;
  } catch (e) {
    throw new Error("is not file csv");
  }
}

function hasContent(values) {
  if (values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      if (values[i]) {
        return true;
      }
    }
  }
  return false;
}

function buildJsonResult(headers, currentLine) {
  var jsonObject = {};
  for (let j = 0; j < headers.length; j++) {
    var propertyName = String(headers[j]).trim();
    var value = currentLine[j];

    // if (this.isParseSubArray(value)) {
    //   value = this.buildJsonSubArray(value);
    // }
    //
    // if (this.printValueFormatByType && !Array.isArray(value)) {
    //   value = stringUtils.getValueFormatByType(currentLine[j]);
    // }
    //

    jsonObject[propertyName] = value;
  }
  return jsonObject;
}
