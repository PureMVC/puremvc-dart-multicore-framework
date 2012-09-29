// DART HTML Library
#import('dart:html');

// The Unit Testing Framework for Dart
#import("package:unittest/unittest.dart");

// PureMVC Framework for Dart
#import("package:puremvc/puremvc.dart");

// PureMVC Unit Tests
#source('PureMVC_Unit_Tests_Config.dart');
#source('MVCNotificationTest.dart');
#source('MVCObserverTest.dart');
#source('MVCSimpleCommandTest.dart');
#source('MVCMacroCommandTest.dart');
#source('MVCProxyTest.dart');
#source('MVCMediatorTest.dart');
#source('MVCModelTest.dart');
#source('MVCViewTest.dart');
#source('MVCControllerTest.dart');
#source('MVCFacadeTest.dart');

class PureMVC_Dart_Unit_Tests 
{
  PureMVC_Dart_Unit_Tests()
  {  
    Configuration config = new PureMVC_Unit_Tests_Config();
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
    new MVCNotificationTest().run();
    new MVCObserverTest().run();
    new MVCSimpleCommandTest().run();
    new MVCMacroCommandTest().run();
    new MVCProxyTest().run();
    new MVCMediatorTest().run();
    new MVCModelTest().run();
    new MVCViewTest().run();
    new MVCControllerTest().run();
    new MVCFacadeTest().run();
  }
} 


/** 
 * Application entry point.
 */
void main() 
{
  // Unit test program, reporting for duty!
  new PureMVC_Dart_Unit_Tests().run();  
}