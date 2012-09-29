class MVCSimpleCommandTest 
{
  _tests() 
  {
    group('MVCSimpleCommand', ()
    {
      test('Constructor', () {
        // Create a SimpeCommand
        ICommand simpleCommand = new SimpleCommandTestDoubleInputCommand();
        expect( simpleCommand, isNotNull  );
      });
      
      test('execute()', () {
        // Create a SimpeCommand
        ICommand simpleCommand = new SimpleCommandTestDoubleInputCommand();
        
        // Crete a VO and a Notification to pass it to the Command with  
        SimpleCommandTestVO vo = new SimpleCommandTestVO( 5 );
        INotification note = new MVCNotification( "SimpleCommandTestNote", vo );

        // Execute the SimpleCommand with the note
        simpleCommand.execute( note );
        
        // Make sure the SimpleCommand logic was executed
        expect( vo.result, equals(10) );
      });

      test('initializeNotifier()', () {
        // Create a SimpleCommand
        INotifier notifier = new SimpleCommandTestDoubleInputCommand();

        // call initializeNotifier()
        String multitonKey = "SimpleCommandTest";
        notifier.initializeNotifier( multitonKey );
        
        // Make sure the SimpleCommand's multitonKey was set
        expect( notifier.multitonKey, isNotNull );
      });
    });
  }

  run() {
    _tests();
  }
}

class SimpleCommandTestVO 
{
  SimpleCommandTestVO( int this.input ) {
  }
    
  int input;
  int result;
}

class SimpleCommandTestDoubleInputCommand extends MVCSimpleCommand
{
  void execute( INotification note )
  {
    // Get the VO from the note
    SimpleCommandTestVO vo = note.getBody();
    
    // Fabricate a result
    vo.result = 2 * vo.input;
  }
}