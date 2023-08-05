part of puremvc_unit_tests;

class Test_MacroCommand {
  _tests() {
    group('MacroCommand', () {
      test('Constructor', () {
        // Create a MacroCommand
        mvc.ICommand macroCommand = new MacroCommandTestCommand();
        expect(macroCommand, isNotNull);
      });

      test('execute()', () {
        // Create a MacroCommand
        mvc.ICommand macroCommand = new MacroCommandTestCommand();

        // Create a VO and a Notification to pass it to the Command with
        MacroCommandTestVO vo = new MacroCommandTestVO(5);
        mvc.INotification note = new mvc.Notification("MacroCommandTest", vo);

        // Execute the MacroCommand execute the note
        macroCommand.execute(note);
        expect(vo.doubled, equals(10));
        expect(vo.squared, equals(25));
      });

      test('initializeNotifier()', () {
        // Create a MacroCommand
        mvc.INotifier notifier = new MacroCommandTestCommand();

        // Call initializeNotifier()
        String multitonKey = "MacroCommandTest";
        notifier.initializeNotifier(multitonKey);

        // Make sure MacroCommand's multitonKey was set
        expect(notifier.multitonKey, isNotNull);
      });
    });
  }

  run() {
    _tests();
  }
}

class MacroCommandTestVO {
  final int input;
  int? doubled;
  int? squared;

  MacroCommandTestVO(this.input) {}
}

class MacroCommandTestCommand extends mvc.MacroCommand {
  void initializeMacroCommand() {
    // Add the subcommands
    addSubCommand(() => new MacroCommandTestDoubleInputCommand());
    addSubCommand(() => new MacroCommandTestSquareInputCommand());
  }
}

class MacroCommandTestDoubleInputCommand extends mvc.SimpleCommand {
  void execute(mvc.INotification note) {
    // Get the VO from the note body
    MacroCommandTestVO vo = note.getBody();

    // Compute the input doubled
    vo.doubled = vo.input * 2;
  }
}

class MacroCommandTestSquareInputCommand extends mvc.SimpleCommand {
  void execute(mvc.INotification note) {
    // Get the VO from the note body
    MacroCommandTestVO vo = note.getBody();

    // Compute the input doubled
    vo.squared = vo.input * vo.input;
  }
}
