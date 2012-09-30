class Test_Controller 
{
  _tests() 
  {
    group('Controller', ()
    {
      test('getInstance()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest1";
        mvc.IController controller = mvc.Controller.getInstance( multitonKey );
        
        // Make sure a Controller instance was returned
        expect( controller, isNotNull );
        
        // Call getInstance() again 
        mvc.IController again = mvc.Controller.getInstance( multitonKey );
        
        // Make sure the same Controller instance was returned 
        expect( controller, same(again) );        
      });
      
      test('registerCommand(), hasCommand()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest2";
        mvc.IController controller = mvc.Controller.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest2Note";
        controller.registerCommand( noteName, () => new ControllerTestMacroCommand() );
        
        // Make sure it's registered
        expect( controller.hasCommand( noteName ), isTrue );        
      });
      
      test('executeCommand() +SimpleCommand', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest3";
        mvc.IController controller = mvc.Controller.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest3Note";
        controller.registerCommand( noteName, () => new ControllerTestDoubleInputCommand() );
        
        // Create a Notification  
        ControllerTestVO vo = new ControllerTestVO( 5 );
        mvc.INotification note = new mvc.Notification( noteName, vo );
        
        // Have the Controller execute the Command 
        controller.executeCommand( note );
        
        // Make sure the Command executed 
        expect( vo.doubled, equals(10) );        
        expect( vo.squared, equals(null) );        
        
      });
      
      test('executeCommand() +MacroCommand', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest4";
        mvc.IController controller = mvc.Controller.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest4Note";
        controller.registerCommand( noteName, () => new ControllerTestMacroCommand() );
        
        // Create a Notification  
        ControllerTestVO vo = new ControllerTestVO( 5 );
        mvc.INotification note = new mvc.Notification( noteName, vo );
        
        // Have the Controller execute the Command 
        controller.executeCommand( note );
        
        // Make sure the Command executed 
        expect( vo.doubled, equals(10) );        
        expect( vo.squared, equals(25) );        
        
      });

      test('removeCommand()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest5";
        mvc.IController controller = mvc.Controller.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest5Note";
        controller.registerCommand( noteName, () => new ControllerTestMacroCommand() );
        
        // Make sure it's registered
        Expect.isTrue( controller.hasCommand( noteName ) );

        // Remove the Command
        controller.removeCommand( noteName );
        
        // Make sur the Controller doesn't know about it any more 
        expect( controller.hasCommand( noteName ), isFalse );
      });
    });
  }

  run() {
    _tests();
  }
}

class ControllerTestVO 
{
  int input;
  int doubled;
  int squared;
  
  ControllerTestVO( int this.input ){}
}

class ControllerTestMacroCommand extends mvc.MacroCommand 
{
  void initializeMacroCommand() 
  {
    // add the subcommands
    addSubCommand( () => new ControllerTestDoubleInputCommand() );
    addSubCommand( () => new ControllerTestSquareInputCommand() );
  }  
}

class ControllerTestDoubleInputCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note ) 
  {
    // Get the VO from the note body
    ControllerTestVO vo = note.getBody();
    
    // compute the input doubled
    vo.doubled = vo.input * 2; 
  }
}

class ControllerTestSquareInputCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note ) 
  {
    // Get the VO from the note body
    ControllerTestVO vo = note.getBody();
    
    // Compute the input squared
    vo.squared = vo.input * vo.input; 
  }
}