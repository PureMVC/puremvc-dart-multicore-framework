class MVCViewTest 
{
  _tests() 
  {
    group('MVCViewTest', ()
    {
      test('getInstance()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest1";
        IView view = MVCView.getInstance( multitonKey );
        
        // Make sure a View instance was returned
        expect( view, isNotNull );
        
        // Call getInstance() again 
        IView again = MVCView.getInstance( multitonKey );
        
        // Make sure the same View instance was returned 
        expect( view, same(again) );        
      });
      
      test('registerMediator(), hasMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest2";
        IView view = MVCView.getInstance( multitonKey );
        
        // Register a Mediator
        String mediatorName = "ViewTest3Mediator";
        IMediator mediator = new MVCMediator( mediatorName );
        view.registerMediator( mediator );
        
        // Make sure it's registered
        expect( view.hasMediator( mediatorName ), isTrue );        
      });

      test('retrieveMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest3";
        IView view = MVCView.getInstance( multitonKey );
        
        // Register a Mediator 
        String mediatorName = "ViewTest3Mediator";
        IMediator mediator = new MVCMediator( mediatorName );
        view.registerMediator( mediator );
        
        // Make sure same mediator is retrieved
        expect( view.retrieveMediator( mediatorName ), same(mediator) );
      });
      
      test('removeMediator()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest4";
        IView view = MVCView.getInstance( multitonKey );
        
        // Register a Mediator 
        String mediatorName = "ViewTest4Mediator";
        IMediator mediator = new MVCMediator( mediatorName );
        view.registerMediator( mediator );
        
        // Make sure it's registered
        expect( view.hasMediator( mediatorName ), isTrue );        
        
        // Remove Mediator
        view.removeMediator( mediatorName );
        
        // Make sure the View no longer knows about it
        expect( view.hasMediator( mediatorName ), isFalse );        
      });
      
      test('registerObserver(), notifyObserver()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest5";
        IView view = MVCView.getInstance( multitonKey );
        
        // Register an Observer using this test 
        // instance's viewTestMethod as the callback
        String noteName = "ViewTest5Note";
        IObserver observer = new MVCObserver( viewTestMethod, this );
        view.registerObserver( noteName, observer );
        
        // Create a notification
        INotification note = new MVCNotification( noteName );
        
        // Have the View notify the Observer
        view.notifyObservers( note );
        
        // Make sure the callback was executed
        expect( viewTestVar, equals(noteName) );
      });

      test('View calls onRegister()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest6";
        IView view = MVCView.getInstance( multitonKey );
        
        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();
        
        // Register a ViewTestMediator 
        IMediator mediator = new ViewTestMediator( vc );
        view.registerMediator( mediator );
        
        // Make sure it's registered
        expect( view.hasMediator( ViewTestMediator.NAME ), isTrue );        
       
        // Make sure the Mediator's onRegister() method was called
        expect( vc.onRegisterCalled, isTrue );
      });
      
      test('View calls onRemove()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest7";
        IView view = MVCView.getInstance( multitonKey );
        
        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();
        
        // Register a ViewTestMediator 
        IMediator mediator = new ViewTestMediator( vc );
        view.registerMediator( mediator );
        
        // Make sure it's registered
        expect( view.hasMediator( ViewTestMediator.NAME ), isTrue );        
       
        // Remove the Mediator
        view.removeMediator( ViewTestMediator.NAME );
        
        // Make sure the Mediator's onRemove() method was called
        expect( vc.onRemoveCalled, isTrue );
      });

      test('View calls listNotificationInterests()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest8";
        IView view = MVCView.getInstance( multitonKey );
        
        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();
        
        // Register a ViewTestMediator 
        IMediator mediator = new ViewTestMediator( vc );
        view.registerMediator( mediator );

        // Make sure the Mediator's listNotificationInterests() method was called
        expect( vc.listNotificationInterestsCalled, isTrue );
      });

      test('View calls handleNotification()', () {
        // Get a unique multiton instance of View
        String multitonKey = "ViewTest9";
        IView view = MVCView.getInstance( multitonKey );
        
        // Create a view component
        ViewTestViewComponent vc = new ViewTestViewComponent();
        
        // Register a ViewTestMediator 
        IMediator mediator = new ViewTestMediator( vc );
        view.registerMediator( mediator );

        // Create a Notification  
        INotification note = new MVCNotification( ViewTestNotes.NOTE_2 );
        
        // Send the Notification
        view.notifyObservers( note );
        
        // Make sure the Mediator's listNotificationInterests() method was called
        expect( vc.handleNotificationCalled, isTrue );
      });
    });
  }

  // A callback method for the test Observer 
  void viewTestMethod( INotification note ) {
    viewTestVar = note.getName();
  }
  
  String viewTestVar;
  
  run() {
    _tests();
  }
}

class ViewTestNotes {
  
  static String NOTE_1 = "ViewTest/note/name/1";
  static String NOTE_2 = "ViewTest/note/name/2";
  static String NOTE_3 = "ViewTest/note/name/3"; 
}

class ViewTestViewComponent
{
  bool onRegisterCalled = false;
  bool onRemoveCalled = false;
  bool listNotificationInterestsCalled = false;
  bool handleNotificationCalled = false;
}

class ViewTestMediator extends MVCMediator
{
  // Name Mediator will be registered as 
  static String NAME = "ViewTestMediator";
  
  // Constructor
  ViewTestMediator( ViewTestViewComponent viewComponent ):super( NAME, viewComponent ){}  

  // Accessors that cast viewComponent to the correct type for this Mediator
  ViewTestViewComponent get vc() { return viewComponent; }
  void set vc( ViewTestViewComponent viewTestViewComponent ) { viewComponent = viewTestViewComponent; }
  
  // Called when Mediator is registered
  void onRegister()
  {
    vc.onRegisterCalled = true;
  }
  
  // Also called when Mediator is registered 
  List<String> listNotificationInterests()
  {
    vc.listNotificationInterestsCalled = true;
    return [ ViewTestNotes.NOTE_1, 
             ViewTestNotes.NOTE_2,
             ViewTestNotes.NOTE_3 ];    
  }
  
  // Called when a notification this Mediator is interested in is sent
  void handleNotification( INotification note ) 
  {
    vc.handleNotificationCalled = true;
  }
  
  // Called when Mediator is removed
  void onRemove()
  {
    vc.onRemoveCalled = true;
  }
}
