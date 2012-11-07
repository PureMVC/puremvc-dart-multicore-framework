part of puremvc_unit_tests;

class Test_Notification
{
  _tests()
  {
    group('Notification', ()
    {
      test('Constructor minimum args', () {
        // Create a Notification with a name only
        String name   = "Test";
        mvc.INotification note = new mvc.Notification( name );

        // Make sure the note was created
        expect( note, isNotNull );
      });

      test('.name, getName()', () {
        // Create a Notification with name only
        String name   = "Test";
        mvc.INotification note = new mvc.Notification( name );

        // Make sure the name was set
        expect( name, equals( note.getName() ) );
        expect( name, equals( note.name ) );
      });

      test('.type, getType()', () {
        // Create a Notification with name and type only
        String name   = "Test";
        String type   = "Type";
        mvc.INotification note = new mvc.Notification( name, null, type );

        // Make Sure the type was set
        expect( type, equals( note.getType() ) );
        expect( type, equals( note.type ) );
      });

      test('.body, getBody()', () {
        // Create a Notification with a body
        String name   = "Test";
        List<String> body  = new List<String>();
        mvc.INotification note = new mvc.Notification( name, body );

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