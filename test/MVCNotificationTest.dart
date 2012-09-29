#import('package:unittest/unittest.dart');
#import('package:puremvc/puremvc.dart');

class MVCNotificationTest 
{
  _tests() 
  {
    group('MVCNotification', ()
    {
      test('Constructor minimum args', () {
        // Create a Notification with a name only
        String name   = "Test";
        INotification note = new MVCNotification( name );
        
        // Make sure the note was created 
        expect( note, isNotNull );
      });
      
      test('.name, getName()', () {
        // Create a Notification with name only
        String name   = "Test";
        INotification note = new MVCNotification( name );
        
        // Make sure the name was set
        expect( name, equals( note.getName() ) );
        expect( name, equals( note.name ) );
      });
      
      test('.type, getType()', () {
        // Create a Notification with name and type only
        String name   = "Test";
        String type   = "Type";
        INotification note = new MVCNotification( name, null, type );
        
        // Make Sure the type was set
        expect( type, equals( note.getType() ) );
        expect( type, equals( note.type ) );
      });
      
      test('.body, getBody()', () {
        // Create a Notification with a body
        String name   = "Test";
        List<String> body  = new List<String>();
        INotification note = new MVCNotification( name, body );
        
        // Make sure the body was set
        expect( body, equals( note.getBody() ) );
        expect( body, equals( note.body ) );
      });
    });
  }
  
  run() {
    _tests();
  }
}