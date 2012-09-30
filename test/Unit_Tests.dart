// DART HTML Library
#import('dart:html');

// The Unit Testing Framework for Dart
#import('package:unittest/unittest.dart');

// PureMVC Framework for Dart
#import('package:puremvc/puremvc.dart', prefix:'mvc');

// PureMVC Unit Tests
#source('Unit_Tests_Config.dart');
#source('Test_Notification.dart');
#source('Test_Observer.dart');
#source('Test_SimpleCommand.dart');
#source('Test_MacroCommand.dart');
#source('Test_Proxy.dart');
#source('Test_Mediator.dart');
#source('Test_Model.dart');
#source('Test_View.dart');
#source('Test_Controller.dart');
#source('Test_Facade.dart');

class Unit_Tests 
{
  Unit_Tests()
  {  
    Configuration config = new Unit_Tests_Config();
    configure( config );
  }
  
  void onTestResult( TestCase testCase ) {
    write( "${testCase.result}  ${testCase.currentGroup}" );
    
  }
  
  void write(String message) {
    document.query('#status').innerHTML = message;
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