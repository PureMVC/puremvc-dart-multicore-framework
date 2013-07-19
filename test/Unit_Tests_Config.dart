part of puremvc_unit_tests;

class Unit_Tests_Config extends Configuration
{

  void onInit()
  {
    writeStatus("Unit Test Framework Started...");
  }

  void onStart()
  {
    writeStatus("Unit Tests for the PureMVC MultiCore Framework for Dart");
  }

  void onTestResult( TestCase testCase )
  {
    appendRow("<TR><TH BGCOLOR=${(testCase.result == 'pass')?'33FF00':'FF3333'}>${testCase.result}</TH><TD COLSPAN='3'>${testCase.description}</TD></TR>");
    super.onTestResult(testCase);
  }

  void onDone(bool passed)
  {
    writeResult("<TH COLSPAN='4' ALIGN='left' BGCOLOR=${(passed)?'33FF00':'FF3333'}>${(passed)?'PASSED':'FAILED'}</TH>");
  }
  void writeStatus(String message) {
    document.query('#status').innerHtml = message;
  }

  void appendRow(String tableRow) {
    document.query('#outputTable').innerHtml  = "${document.query('#outputTable').innerHtml}${tableRow}";
  }

  void writeResult(String result) {
    document.query('#result').innerHtml = result;
  }
}
