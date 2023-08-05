// PureMVC Unit Test Library
library puremvc_unit_tests;

// DART HTML Library
// import 'dart:html';

// PureMVC Framework for Dart
import 'package:puremvc/puremvc.dart' as mvc;
// The Unit Testing Framework for Dart
import 'package:test/test.dart';

part 'Test_Controller.dart';
part 'Test_Facade.dart';
part 'Test_MacroCommand.dart';
part 'Test_Mediator.dart';
part 'Test_Model.dart';
// PureMVC Unit Tests
part 'Test_Notification.dart';
part 'Test_Observer.dart';
part 'Test_Proxy.dart';
part 'Test_SimpleCommand.dart';
part 'Test_View.dart';

class Unit_Tests {
  Unit_Tests() {}

  // void onTestResult(TestCase testCase) {
  //   write("${testCase.result}  ${testCase.currentGroup}");
  // }
  //
  // void write(String message) {
  //   document.querySelector('#status')?.innerHtml = message;
  // }

  void run() {
    // Now, run the PureMVC Tests
    Test_Notification().run();
    Test_Observer().run();
    Test_SimpleCommand().run();
    Test_MacroCommand().run();
    Test_Proxy().run();
    Test_Mediator().run();
    Test_Model().run();
    Test_View().run();
    Test_Controller().run();
    Test_Facade().run();
  }
}

/**
 * Application entry point.
 */
void main() {
  // Unit test program, reporting for duty!
  Unit_Tests().run();
}
