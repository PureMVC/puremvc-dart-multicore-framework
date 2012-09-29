class PureMVC_Unit_Tests_Config extends Configuration
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
  
  void onDone(int passed, int failed, int errors, List results, String uncaughtError)
  {
    writeResult("<TH COLSPAN='4' ALIGN='left' BGCOLOR=${(failed == 0)?'33FF00':'FF3333'}>PASSED: ${passed} ... FAILED: ${failed}</TH>");
  }
  void writeStatus(String message) {
    document.query('#status').innerHTML = message;
  }
  
  void appendRow(String tableRow) {
    document.query('#outputTable').innerHTML = "${document.query('#outputTable').innerHTML}${tableRow}";
  }
  
  void writeResult(String result) {
    document.query('#result').innerHTML = result;
  }
}
