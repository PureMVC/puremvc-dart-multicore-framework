// PureMVC Unit Test Library
library puremvc_unit_tests;

// DART HTML Library
import 'dart:html';

// The Unit Testing Framework for Dart
import 'package:unittest/unittest.dart';
import 'package:unittest/html_enhanced_config.dart';

// PureMVC Framework for Dart
import 'package:puremvc/puremvc.dart' as mvc;

// PureMVC Unit Tests
part 'Test_Notification.dart';
part 'Test_Observer.dart';
part 'Test_SimpleCommand.dart';
part 'Test_MacroCommand.dart';
part 'Test_Proxy.dart';
part 'Test_Mediator.dart';
part 'Test_Model.dart';
part 'Test_View.dart';
part 'Test_Controller.dart';
part 'Test_Facade.dart';

class Unit_Tests
{
  Unit_Tests()
  {
   // unittestConfiguration = new Unit_Tests_Config();
   useHtmlEnhancedConfiguration();
  }

  void onTestResult( TestCase testCase ) {
    write( "${testCase.result}  ${testCase.currentGroup}" );

  }

  void write(String message) {
    document.querySelector('#status').innerHtml = message;
  }

  void run() {

    // Now, run the PureMVC Tests
    new Test_Notification().run();
    new Test_Observer().run();
    new Test_SimpleCommand().run();
    new Test_MacroCommand().run();
    new Test_Proxy().run();
    new Test_Mediator().run();
    new Test_Model().run();
    new Test_View().run();
    new Test_Controller().run();
    new Test_Facade().run();
  }
}


/**
 * Application entry point.
 */
void main()
{
  // Unit test program, reporting for duty!
  new Unit_Tests().run();
}