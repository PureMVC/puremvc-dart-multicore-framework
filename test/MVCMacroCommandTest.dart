#import('package:unittest/unittest.dart');
#import('package:puremvc/puremvc.dart');

class MVCMacroCommandTest 
{
  _tests() 
  {
    group('MVCMacroCommand', ()
    {
      test('Constructor', () {
        // Create a MacroCommand
        ICommand macroCommand = new MacroCommandTestCommand();
        expect( macroCommand, isNotNull );
      });
      
      test('execute()', () {
        // Create a MacroCommand
        ICommand macroCommand = new MacroCommandTestCommand();
        
        // Create a VO and a Notification to pass it to the Command with
        MacroCommandTestVO vo = new MacroCommandTestVO( 5 );
        INotification note = new MVCNotification( "MacroCommandTest", vo );
        
        // Execute the MacroCommand execute the note
        macroCommand.execute(note);
        expect( vo.doubled, equals(10) );
        expect( vo.squared, equals(25) );
      });

      test('initializeNotifier()', () {
        // Create a MacroCommand
        INotifier notifier = new MacroCommandTestCommand();
        
        // Call initializeNotifier()
        String multitonKey = "MacroCommandTest";
        notifier.initializeNotifier( multitonKey );
        
        // Make sure MacroCommand's multitonKey was set
        expect( notifier.multitonKey, isNotNull );
      });
    });
  }

  run() {
    _tests();
  }
}

class MacroCommandTestVO 
{
  int input;
  int doubled;
  int squared;

  MacroCommandTestVO( int this.input ) {}
}

class MacroCommandTestCommand extends MVCMacroCommand 
{
  void initializeMacroCommand() {
    // Add the subcommands
    addSubCommand( () => new MacroCommandTestDoubleInputCommand() );
    addSubCommand( () => new MacroCommandTestSquareInputCommand() );
  }  
}

class MacroCommandTestDoubleInputCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    // Get the VO from the note body
    MacroCommandTestVO vo = note.getBody();
    
    // Compute the input doubled
    vo.doubled = vo.input * 2;
  }
}

class MacroCommandTestSquareInputCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    // Get the VO from the note body
    MacroCommandTestVO vo = note.getBody();

    // Compute the input doubled
    vo.squared = vo.input * vo.input;
  }
}