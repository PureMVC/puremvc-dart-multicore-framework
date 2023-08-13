part of puremvc_unit_tests;

class Test_SimpleCommand {
  _tests() {
    group('SimpleCommand', () {
      test('Constructor', () {
        // Create a SimpleCommand
        mvc.ICommand simpleCommand = SimpleCommandTestDoubleInputCommand();
        expect(simpleCommand, isNotNull);
      });

      test('execute()', () {
        // Create a SimpleCommand
        mvc.ICommand simpleCommand = SimpleCommandTestDoubleInputCommand();

        // Crete a VO and a Notification to pass it to the Command with
        SimpleCommandTestVO vo = SimpleCommandTestVO(5);
        mvc.INotification note = mvc.Notification("SimpleCommandTestNote", vo);

        // Execute the SimpleCommand with the note
        simpleCommand.execute(note);

        // Make sure the SimpleCommand logic was executed
        expect(vo.result, equals(10));
      });

      test('initializeNotifier()', () {
        // Create a SimpleCommand
        mvc.INotifier notifier = SimpleCommandTestDoubleInputCommand();

        // call initializeNotifier()
        String multitonKey = "SimpleCommandTest";
        notifier.initializeNotifier(multitonKey);

        // Make sure the SimpleCommand's multitonKey was set
        expect(notifier.multitonKey, isNotNull);
      });
    });
  }

  run() {
    _tests();
  }
}

class SimpleCommandTestVO {
  SimpleCommandTestVO(this.input) {}

  final int input;
  int? result;
}

class SimpleCommandTestDoubleInputCommand extends mvc.SimpleCommand {
  void execute(mvc.INotification note) {
    // Get the VO from the note
    SimpleCommandTestVO vo = note.getBody();

    // Fabricate a result
    vo.result = 2 * vo.input;
  }
}
