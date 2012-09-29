class MVCObserverTest 
{
  _tests() 
  {
    group('MVCObserver', ()
    {
      test('Constructor null args', () {
        // Create a blind Observer
        IObserver observer = new MVCObserver( null, null );
        
        // Make sure Observer was created
        expect( observer, isNotNull );
      });
      
      test('Constructor complete args', () {
        // Create an observer with callback method and caller instance defined
        IObserver observer = new MVCObserver( this.observerTestMethod, this );
        
        // Make sure the Observer was created
        expect( observer, isNotNull  );
        
        // Make sure caller and callback were set
        expect( observer.getNotifyMethod(), isNotNull  );
        expect( observer.notifyMethod, isNotNull  );
        expect( observer.getNotifyContext(), isNotNull  );
        expect( observer.notifyContext, isNotNull  );
        
      });

      test('Constructor minimum args', () {
        // Create an Observer with callack only
        IObserver observer = new MVCObserver( this.observerTestMethod );
        
        // Make sure Observer was created
        expect( observer, isNotNull  );
        
        // Make sure callback method was set
        expect( observer.getNotifyMethod(), isNotNull );
      });
      
      test('setNotifyMethod()', () {
        // Create an Observer
        IObserver observer = new MVCObserver( null );
        
        // Call setNotifyMethod()
        observer.setNotifyMethod( observerTestMethod );
        
        // Make sure callback method was set
        expect( observer.getNotifyMethod(), isNotNull );
        expect( observer.notifyMethod, isNotNull );
        
      });

      test('setNotifyContext()', () {
        // Create an Observer 
        IObserver observer = new MVCObserver( null );
        
        // Call setNotifyContext()
        observer.setNotifyContext( this );
        
        // Make sure caller was set
        expect( observer.getNotifyContext(), isNotNull );
        expect( observer.getNotifyContext(), same(this) );
        expect( observer.notifyContext, isNotNull );
        expect( observer.notifyContext, same(this) );
      });

      test('compareNotifyContext()', () {
        // Create an Observer with only a caller
        IObserver observer = new MVCObserver( null, this );
        
        // Make sure the caller was set
        expect( observer.compareNotifyContext( this ), isTrue );
      });

      test('notifyObserver()', () {
        // Create an Observer with this test instance's observerTestMethod() as the callback
        IObserver observer = new MVCObserver( this.observerTestMethod, this );
        
        // Create a Notification 
        String name = "Test";
        INotification note = new MVCNotification( name );
        
        // Notify the Observer
        observer.notifyObserver( note );
        
        // Make sure the Observer was notified
        expect( observerTestNote, isNotNull );
        expect( observerTestNote.name, equals(name) );
      });
    });
  }

  // Test Notification 
  MVCNotification observerTestNote;
  
  // Callback method for Observer
  observerTestMethod( INotification note ){
    observerTestNote = note;
  }
  
  run() {
    _tests();
  }
}
