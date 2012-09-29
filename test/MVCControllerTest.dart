class MVCControllerTest 
{
  _tests() 
  {
    group('MVCController', ()
    {
      test('getInstance()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest1";
        IController controller = MVCController.getInstance( multitonKey );
        
        // Make sure a Controller instance was returned
        expect( controller, isNotNull );
        
        // Call getInstance() again 
        IController again = MVCController.getInstance( multitonKey );
        
        // Make sure the same Controller instance was returned 
        expect( controller, same(again) );        
      });
      
      test('registerCommand(), hasCommand()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest2";
        IController controller = MVCController.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest2Note";
        controller.registerCommand( noteName, () => new ControllerTestMacroCommand() );
        
        // Make sure it's registered
        expect( controller.hasCommand( noteName ), isTrue );        
      });
      
      test('executeCommand() +SimpleCommand', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest3";
        IController controller = MVCController.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest3Note";
        controller.registerCommand( noteName, () => new ControllerTestDoubleInputCommand() );
        
        // Create a Notification  
        ControllerTestVO vo = new ControllerTestVO( 5 );
        INotification note = new MVCNotification( noteName, vo );
        
        // Have the Controller execute the Command 
        controller.executeCommand( note );
        
        // Make sure the Command executed 
        expect( vo.doubled, equals(10) );        
        expect( vo.squared, equals(null) );        
        
      });
      
      test('executeCommand() +MacroCommand', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest4";
        IController controller = MVCController.getInstance( multitonKey );
        
        // Register a Command 
        String noteName = "ControllerTest4Note";
        controller.registerCommand( noteName, () => new ControllerTestMacroCommand() );
        
        // Create a Notification  
        ControllerTestVO vo = new ControllerTestVO( 5 );
        INotification note = new MVCNotification( noteName, vo );
        
        // Have the Controller execute the Command 
        controller.executeCommand( note );
        
        // Make sure the Command executed 
        expect( vo.doubled, equals(10) );        
        expect( vo.squared, equals(25) );        
        
      });

      test('removeCommand()', () {
        // Get a unique multiton instance of Controller
        String multitonKey = "ControllerTest5";
        IController controller = MVCController.getInstance( multitonKey );
        
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

class ControllerTestMacroCommand extends MVCMacroCommand 
{
  void initializeMacroCommand() 
  {
    // add the subcommands
    addSubCommand( () => new ControllerTestDoubleInputCommand() );
    addSubCommand( () => new ControllerTestSquareInputCommand() );
  }  
}

class ControllerTestDoubleInputCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    // Get the VO from the note body
    ControllerTestVO vo = note.getBody();
    
    // compute the input doubled
    vo.doubled = vo.input * 2; 
  }
}

class ControllerTestSquareInputCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    // Get the VO from the note body
    ControllerTestVO vo = note.getBody();
    
    // Compute the input squared
    vo.squared = vo.input * vo.input; 
  }
}