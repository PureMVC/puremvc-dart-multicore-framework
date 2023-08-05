part of puremvc_unit_tests;

class Test_View {
  _tests() {
    group('ViewTest', () {
      test('getInstance()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest1";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Make sure a View instance was returned
        expect(view, isNotNull);

        // Call getInstance() again
        final again = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Make sure the same View instance was returned
        expect(view, same(again));
      });

      test('registerMediator(), hasMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest2";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Register a Mediator
        String mediatorName = "ViewTest3Mediator";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);
        view.registerMediator(mediator);

        // Make sure it's registered
        expect(view.hasMediator(mediatorName), isTrue);
      });

      test('retrieveMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest3";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Register a Mediator
        String mediatorName = "ViewTest3Mediator";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);
        view.registerMediator(mediator);

        // Make sure same mediator is retrieved
        expect(view.retrieveMediator(mediatorName), same(mediator));
      });

      test('removeMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest4";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Register a Mediator
        String mediatorName = "ViewTest4Mediator";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);
        view.registerMediator(mediator);

        // Make sure it's registered
        expect(view.hasMediator(mediatorName), isTrue);

        // Remove Mediator
        view.removeMediator(mediatorName);

        // Make sure the View no longer knows about it
        expect(view.hasMediator(mediatorName), isFalse);
      });

      test('registerObserver(), notifyObserver()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest5";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Register an Observer using this test
        // instance's viewTestMethod as the callback
        String noteName = "ViewTest5Note";
        mvc.IObserver observer = new mvc.Observer(viewTestMethod, this);
        view.registerObserver(noteName, observer);

        // Create a notification
        mvc.INotification note = new mvc.Notification(noteName);

        // Have the View notify the Observer
        view.notifyObservers(note);

        // Make sure the callback was executed
        expect(viewTestVar, equals(noteName));
      });

      test('View calls onRegister()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest6";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();

        // Register a ViewTestMediator
        mvc.IMediator mediator = new ViewTestMediator(vc);
        view.registerMediator(mediator);

        // Make sure it's registered
        expect(view.hasMediator(ViewTestMediator.NAME), isTrue);

        // Make sure the Mediator's onRegister() method was called
        expect(vc.onRegisterCalled, isTrue);
      });

      test('View calls onRemove()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest7";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();

        // Register a ViewTestMediator
        mvc.IMediator mediator = new ViewTestMediator(vc);
        view.registerMediator(mediator);

        // Make sure it's registered
        expect(view.hasMediator(ViewTestMediator.NAME), isTrue);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator.NAME);

        // Make sure the Mediator's onRemove() method was called
        expect(vc.onRemoveCalled, isTrue);
      });

      test('View calls listNotificationInterests()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest8";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();

        // Register a ViewTestMediator
        mvc.IMediator mediator = new ViewTestMediator(vc);
        view.registerMediator(mediator);

        // Make sure the Mediator's listNotificationInterests() method was called
        expect(vc.listNotificationInterestsCalled, isTrue);
      });

      test('View calls handleNotification()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest9";
        final view = mvc.View.getInstance(multitonKey) as mvc.IView;

        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();

        // Register a ViewTestMediator
        mvc.IMediator mediator = new ViewTestMediator(vc);
        view.registerMediator(mediator);

        // Create a Notification
        mvc.INotification note = new mvc.Notification(ViewTestNotes.NOTE_2);

        // Send the Notification
        view.notifyObservers(note);

        // Make sure the Mediator's listNotificationInterests() method was called
        expect(vc.handleNotificationCalled, isTrue);
      });
    });
  }

  // A callback method for the test Observer
  void viewTestMethod(mvc.INotification note) {
    viewTestVar = note.getName();
  }

  String? viewTestVar;

  run() {
    _tests();
  }
}

class ViewTestNotes {
  static String NOTE_1 = "ViewTest/note/name/1";
  static String NOTE_2 = "ViewTest/note/name/2";
  static String NOTE_3 = "ViewTest/note/name/3";
}

class ViewTestViewComponent {
  bool onRegisterCalled = false;
  bool onRemoveCalled = false;
  bool listNotificationInterestsCalled = false;
  bool handleNotificationCalled = false;
}

class ViewTestMediator extends mvc.Mediator {
  // Name Mediator will be registered as
  static String NAME = "ViewTestMediator";

  // Constructor
  ViewTestMediator(ViewTestViewComponent viewComponent) : super(NAME, viewComponent) {}

  // Accessors that cast viewComponent to the correct type for this Mediator
  ViewTestViewComponent get vc {
    return viewComponent;
  }

  void set vc(ViewTestViewComponent viewTestViewComponent) {
    viewComponent = viewTestViewComponent;
  }

  // Called when Mediator is registered
  void onRegister() {
    vc.onRegisterCalled = true;
  }

  // Also called when Mediator is registered
  List<String> listNotificationInterests() {
    vc.listNotificationInterestsCalled = true;
    return [ViewTestNotes.NOTE_1, ViewTestNotes.NOTE_2, ViewTestNotes.NOTE_3];
  }

  // Called when a notification this Mediator is interested in is sent
  void handleNotification(mvc.INotification note) {
    vc.handleNotificationCalled = true;
  }

  // Called when Mediator is removed
  void onRemove() {
    vc.onRemoveCalled = true;
  }
}
