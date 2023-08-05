part of puremvc_unit_tests;

class Test_Notification {
  _tests() {
    group('Notification', () {
      test('Constructor minimum args', () {
        // Create a Notification with a name only
        String name = "Test";
        mvc.INotification note = mvc.Notification(name);

        // Make sure the note was created
        expect(note, isNotNull);
      });

      test('.name, getName()', () {
        // Create a Notification with name only
        String name = "Test";
        mvc.INotification note = mvc.Notification(name);

        // Make sure the name was set
        expect(name, equals(note.getName()));
      });

      test('.type, getType()', () {
        // Create a Notification with name and type only
        String name = "Test";
        String type = "Type";
        mvc.INotification note = mvc.Notification(name, null, type);

        // Make Sure the type was set
        expect(type, equals(note.getType()));
      });

      test('.body, getBody()', () {
        // Create a Notification with a body
        String name = "Test";
        List<String> body = List<String>.empty(growable: true);
        mvc.INotification note = mvc.Notification(name, body);

        // Make sure the body was set
        expect(body, equals(note.getBody()));
      });
    });
  }

  run() {
    _tests();
  }
}
