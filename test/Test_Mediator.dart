part of puremvc_unit_tests;

class Test_Mediator {
  _tests() {
    group('Mediator', () {
      test('Constructor', () {
        // Create a Mediator
        String mediatorName = "TestMediator1";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);

        // Make sure it was created
        expect(mediator, isNotNull);
      });

      test('getMediatorName()', () {
        // Create a Mediator
        String mediatorName = "TestMediator2";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);

        // Make sure the Mediator's name was set
        expect(mediator.getName(), equals(mediatorName));
        expect(mediator.name, equals(mediatorName));
      });

      test('Constructor +viewComponent, getViewComponent(), .viewComponent', () {
        // Create a view component
        Object viewComponent = new Object();

        // Create a Mediator with the view component
        String mediatorName = "TestMediator3";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName, viewComponent);

        // Make sure the view component was set
        expect(mediator.getViewComponent(), same(viewComponent));
        expect(mediator.viewComponent, same(viewComponent));
      });

      test('setViewComponent(), getViewComponent()', () {
        // Create a view component
        Object viewComponent = new Object();

        // Create a Mediator
        String mediatorName = "TestMediator4";
        mvc.IMediator mediator = new mvc.Mediator(mediatorName);

        // Call setViewComponent()
        mediator.setViewComponent(viewComponent);

        // Make sure the view component was set
        expect(mediator.getViewComponent(), same(viewComponent));
        expect(mediator.viewComponent, same(viewComponent));
      });

      test('initializeNotifier()', () {
        // Create a Mediator
        String mediatorName = "TestMediator5";
        mvc.INotifier notifier = new mvc.Mediator(mediatorName);

        // Call initializeNotifier()
        String multitonKey = "MediatorTestKey";
        notifier.initializeNotifier(multitonKey);

        // Make sure the Mediator's multitonKey was set
        expect(notifier.multitonKey, isNotNull);
      });
    });
  }

  run() {
    _tests();
  }
}
