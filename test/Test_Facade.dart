part of puremvc_unit_tests;

class Test_Facade
{
  _tests()
  {
    // Test the Facade specific functionality
    group('Facade::IFacade', ()
    {
      test('getInstance()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Make sure a Facade instance was returned
        expect( facade, isNotNull );

        // Call getInstance() again
        mvc.IFacade again = mvc.Facade.getInstance( multitonKey );

        // Make sure the same Facade instance was returned
        expect( facade, same(again) );

        // Make sure the Facade's multitonKey was set
        expect( facade.multitonKey, equals(multitonKey) );

        // Make sure the Model was created
        expect( facade.model, isNotNull );

        // Make sure the Model's multitonKey was set
        expect( facade.model.multitonKey, equals(multitonKey) );

        // Make sure the View was created
        expect( facade.view, isNotNull );

        // Make sure the View's multitonKey was set
        expect( facade.view.multitonKey, equals(multitonKey) );

        // Make sure the Controller was created
        expect( facade.controller, isNotNull );

        // Make sure the Controller's multitonKey was set
        expect( facade.controller.multitonKey, equals(multitonKey) );
      });

      test('getInstance(), hasCore()', () {

        // Make sure it's not reported as registered first
        String multitonKey = "FacadeTest0";
        Expect.isFalse( mvc.Facade.hasCore( multitonKey ) );

        // Get a unique multiton instance of Facade
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Make sure it's registered
        Expect.isTrue( mvc.Facade.hasCore( multitonKey ) );
      });

      test('removeCore(), hasCore()', () {

        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest1";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Make sure it's registered
        expect( mvc.Facade.hasCore( multitonKey ), isTrue );

        // Remove the core
        mvc.Facade.removeCore(multitonKey);

        // Make sure the core is no longer registered
        expect( mvc.Facade.hasCore( multitonKey ), isFalse );
      });
    });

    // Test the Facade's IController interface functionality
    group('Facade::IController', ()
    {
      test('registerCommand(), hasCommand()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest2";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Command
        String noteName = "FacadeTest2Note";
        facade.registerCommand( noteName, () => new FacadeTestMacroCommand() );

        // Make sure it's registered
        expect( facade.hasCommand( noteName ), isTrue );
      });

      test('sendNotification() ->SimpleCommand', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest3";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Command
        String noteName = "FacadeTest3Note";
        facade.registerCommand( noteName, () => new FacadeTestDoubleInputCommand() );

        // Create a value object
        FacadeTestVO vo = new FacadeTestVO( 5 );

        // Have the Facade send the note, triggering the Command
        facade.sendNotification( noteName, vo );

        // Make sure the Command executed
        expect( vo.doubled, equals(10) );
        expect( vo.squared, equals(null) );
      });

      test('sendNotification() ->MacroCommand', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest4";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Command
        String noteName = "FacadeTest4Note";
        facade.registerCommand( noteName, () => new FacadeTestMacroCommand() );

        // Create a value object
        FacadeTestVO vo = new FacadeTestVO( 5 );

        // Have the Facade execute the Command
        facade.sendNotification( noteName, vo );

        // Make sure the Command executed
        expect( vo.doubled, equals(10) );
        expect( vo.squared, equals(25) );
      });

      test('removeCommand()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest5";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Command
        String noteName = "FacadeTest5Note";
        facade.registerCommand( noteName, () => new FacadeTestMacroCommand() );

        // Make sure it's registered
        expect( facade.hasCommand( noteName ), isTrue );

        // Remove the Command
        facade.removeCommand( noteName );

        // Make sur the Controller doesn't know about it any more
        expect( facade.hasCommand( noteName ), isFalse );
      });
    });

    // Test the Facade's IView interface functionality
    group('Facade::IView', ()
    {
      test('registerMediator(), hasMediator()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest6";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Mediator
        String mediatorName = "FacadeTest6Mediator";
        mvc.IMediator mediator = new mvc.Mediator( mediatorName );
        facade.registerMediator( mediator );

        // Make sure it's registered
        expect( facade.hasMediator( mediatorName ), isTrue );
      });

      test('retrieveMediator()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest7";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Mediator
        String mediatorName = "FacadeTest7Mediator";
        mvc.IMediator mediator = new mvc.Mediator( mediatorName );
        facade.registerMediator( mediator );

        // Make sure same mediator is retrieved
        expect( facade.retrieveMediator( mediatorName ), same(mediator) );
      });

      test('removeMediator()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest8";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Mediator
        String mediatorName = "FacadeTest8Mediator";
        mvc.IMediator mediator = new mvc.Mediator( mediatorName );
        facade.registerMediator( mediator );

        // Make sure it's registered
        expect( facade.hasMediator( mediatorName ), isTrue );

        // Remove Mediator
        facade.removeMediator( mediatorName );

        // Make sure the Facade no longer knows about it
        expect( facade.hasMediator( mediatorName ), isFalse );
      });

      test('registerObserver(), notifyObserver()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest8";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register an Observer using this test
        // instance's facadeTestMethod as the callback
        String noteName = "FacadeTest8Note";
        mvc.IObserver observer = new mvc.Observer( facadeTestMethod, this );
        facade.registerObserver( noteName, observer );

        // Create a notification
        mvc.INotification note = new mvc.Notification( noteName );

        // Have the Facade notify the Observer
        facade.notifyObservers( note );

        // Make sure the callback was executed
        expect( facadeTestVar, equals(noteName) );
      });

      test('registerMediator(), ->mediator.onRegister()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest9";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Create a view component
        FacadeTestViewComponent vc = new FacadeTestViewComponent();

        // Register a FacadeTestMediator
        mvc.IMediator mediator = new FacadeTestMediator( vc );
        facade.registerMediator( mediator );

        // Make sure it's registered
        expect( facade.hasMediator( FacadeTestMediator.NAME ), isTrue );

        // Make sure the Mediator's onRegister() method was called
        expect( vc.onRegisterCalled, isTrue );
      });

      test('removeMediator(), ->mediator.onRemove()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest10";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Create a view component
        FacadeTestViewComponent vc = new FacadeTestViewComponent();

        // Register a FacadeTestMediator
        mvc.IMediator mediator = new FacadeTestMediator( vc );
        facade.registerMediator( mediator );

        // Make sure it's registered
        expect( facade.hasMediator( FacadeTestMediator.NAME ), isTrue );

        // Remove the Mediator
        facade.removeMediator( FacadeTestMediator.NAME );

        // Make sure the Mediator's onRemove() method was called
        expect( vc.onRemoveCalled, isTrue );
      });

      test('registerMediator(), ->mediator.listNotificationInterests()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest11";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Create a view component
        FacadeTestViewComponent vc = new FacadeTestViewComponent();

        // Register a FacadeTestMediator
        mvc.IMediator mediator = new FacadeTestMediator( vc );
        facade.registerMediator( mediator );

        // Make sure the Mediator's listNotificationInterests() method was called
        expect( vc.listNotificationInterestsCalled, isTrue );
      });

      test('sendNotification(), ->handleNotification()', () {
        // Get a unique multiton instance of Facade
        String multitonKey = "FacadeTest12";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Create a view component
        FacadeTestViewComponent vc = new FacadeTestViewComponent();

        // Register a FacadeTestMediator
        mvc.IMediator mediator = new FacadeTestMediator( vc );
        facade.registerMediator( mediator );

        // Send the Notification
        facade.sendNotification( FacadeTestNotes.NOTE_2  );

        // Make sure the Mediator's listNotificationInterests() method was called
        expect( vc.handleNotificationCalled, isTrue );
      });
    });

    // Test the Facade's IModel interface functionality
    group('Facade::IModel', ()
    {
      test('registerProxy(), hasProxy()', () {
        // Unique multiton instance of Facade
        String multitonKey = "FacadeTest13";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "FacadeTest13Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        facade.registerProxy( proxy );

        // Make sure it's there
        expect( facade.hasProxy( proxyName ), isTrue );
      });

      test('retrieveProxy()', () {
        // Unique multiton instance of Facade
        String multitonKey = "FacadeTest14";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "FacadeTest14Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        facade.registerProxy( proxy );

        // Make sure same Proxy is retrieved
        expect( facade.retrieveProxy( proxyName ), same(proxy) );
      });

      test('removeProxy(), hasProxy()', () {
        // Unique multiton instance of Facade
        String multitonKey = "FacadeTest15";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "FacadeTest15Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        facade.registerProxy( proxy );

        // Make sure it is returned when removed
        expect( facade.removeProxy( proxyName ), same(proxy) );

        // Make sure Facade doesn't know about it anymore
        expect( facade.hasProxy( proxyName ), isFalse );
      });

      test('registerProxy(), ->proxy.onRegister()', () {
        // Unique multiton instance of Facade
        String multitonKey = "FacadeTest16";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Proxy
        mvc.IProxy proxy = new FacadeTestProxy();
        facade.registerProxy( proxy );

        // Make sure the Proxy's onRegister() method is called
        expect( proxy.getData(), equals(FacadeTestProxy.ON_REGISTER_CALLED) );
      });

      test('removeProxy(), ->proxy.onRemove()', () {
        // Unique multiton instance of Facade
        String multitonKey = "FacadeTest17";
        mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );

        // Register a Proxy
        mvc.IProxy proxy = new FacadeTestProxy();
        facade.registerProxy( proxy );

        // Remove the Proxy
        facade.removeProxy( FacadeTestProxy.NAME );

        // Make sure the Proxy's onRemove() method is called
        expect( proxy.getData(), equals(FacadeTestProxy.ON_REMOVE_CALLED) );
      });
    });
  }

  run() {
    _tests();
  }
}

// A callback method for the test Observer
void facadeTestMethod( mvc.INotification note ) {
  facadeTestVar = note.getName();
}

String facadeTestVar;

class FacadeTestNotes {

  static String NOTE_1 = "FacadeTest/note/name/1";
  static String NOTE_2 = "FacadeTest/note/name/2";
  static String NOTE_3 = "FacadeTest/note/name/3";
}

class FacadeTestViewComponent
{
  bool onRegisterCalled = false;
  bool onRemoveCalled = false;
  bool listNotificationInterestsCalled = false;
  bool handleNotificationCalled = false;
}

class FacadeTestMediator extends mvc.Mediator
{
  // Name Mediator will be registered as
  static String NAME = "FacadeTestMediator";

  // Constructor
  FacadeTestMediator( FacadeTestViewComponent viewComponent ):super( NAME, viewComponent ){}

  // Accessors that cast viewComponent to the correct type for this Mediator
  FacadeTestViewComponent get vc { return viewComponent; }
  void set vc( FacadeTestViewComponent facadeTestViewComponent ) { viewComponent = facadeTestViewComponent; }

  // Called when Mediator is registered
  void onRegister()
  {
    vc.onRegisterCalled = true;
  }

  // Also called when Mediator is registered
  List<String> listNotificationInterests()
  {
    vc.listNotificationInterestsCalled = true;
    return [ FacadeTestNotes.NOTE_1,
             FacadeTestNotes.NOTE_2,
             FacadeTestNotes.NOTE_3 ];
  }

  // Called when a notification this Mediator is interested in is sent
  void handleNotification( mvc.INotification note )
  {
    vc.handleNotificationCalled = true;
  }

  // Called when Mediator is removed
  void onRemove()
  {
    vc.onRemoveCalled = true;
  }
}

class FacadeTestProxy extends mvc.Proxy
{
  static String NAME = "FacadeTestProxyClass";
  static String FRESH = "Fresh Instance";
  static String ON_REGISTER_CALLED = "onRegister() Called";
  static String ON_REMOVE_CALLED = "onRemove() Called";

  FacadeTestProxy():super( NAME ){
    setData( FRESH );
  }

  void onRegister()
  {
    setData( ON_REGISTER_CALLED );
  }

  void onRemove()
  {
    setData( ON_REMOVE_CALLED );
  }
}

class FacadeTestVO
{
  int input;
  int doubled;
  int squared;

  FacadeTestVO( int this.input ){}
}

class FacadeTestMacroCommand extends mvc.MacroCommand
{
  void initializeMacroCommand()
  {
    // add the subcommands
    addSubCommand( () => new FacadeTestDoubleInputCommand() );
    addSubCommand( () => new FacadeTestSquareInputCommand() );
  }
}

class FacadeTestDoubleInputCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note )
  {
    // Get the VO from the note body
    FacadeTestVO vo = note.getBody();

    // compute the input doubled
    vo.doubled = vo.input * 2;
  }
}

class FacadeTestSquareInputCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note )
  {
    // Get the VO from the note body
    FacadeTestVO vo = note.getBody();

    // Compute the input squared
    vo.squared = vo.input * vo.input;
  }
}
