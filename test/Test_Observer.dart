part of puremvc_unit_tests;

class Test_Observer {
  _tests() {
    group('Observer', () {
      test('Constructor null args', () {
        // Create a blind Observer
        mvc.IObserver observer = mvc.Observer(() {}, null);

        // Make sure Observer was created
        expect(observer, isNotNull);
      });

      test('Constructor complete args', () {
        // Create an observer with callback method and caller instance defined
        mvc.IObserver observer = mvc.Observer(this.observerTestMethod, this);

        // Make sure the Observer was created
        expect(observer, isNotNull);

        // Make sure caller and callback were set
        expect(observer.getNotifyMethod(), isNotNull);
        expect(observer.getNotifyContext(), isNotNull);
      });

      test('Constructor minimum args', () {
        // Create an Observer with callback only
        mvc.IObserver observer = mvc.Observer(this.observerTestMethod);

        // Make sure Observer was created
        expect(observer, isNotNull);

        // Make sure callback method was set
        expect(observer.getNotifyMethod(), isNotNull);
      });

      test('setNotifyMethod()', () {
        // Create an Observer
        mvc.IObserver observer = mvc.Observer(null);

        // Call setNotifyMethod()
        observer.setNotifyMethod(observerTestMethod);

        // Make sure callback method was set
        expect(observer.getNotifyMethod(), isNotNull);
      });

      test('setNotifyContext()', () {
        // Create an Observer
        mvc.IObserver observer = mvc.Observer(null);

        // Call setNotifyContext()
        observer.setNotifyContext(this);

        // Make sure caller was set
        expect(observer.getNotifyContext(), isNotNull);
        expect(observer.getNotifyContext(), same(this));
        expect(observer.notifyContext, isNotNull);
      });

      test('compareNotifyContext()', () {
        // Create an Observer with only a caller
        mvc.IObserver observer = mvc.Observer(null, this);

        // Make sure the caller was set
        expect(observer.compareNotifyContext(this), isTrue);
      });

      test('notifyObserver()', () {
        // Create an Observer with this test instance's observerTestMethod() as the callback
        mvc.IObserver observer = mvc.Observer(this.observerTestMethod, this);

        // Create a Notification
        String name = "Test";
        mvc.INotification note = mvc.Notification(name);

        // Notify the Observer
        observer.notifyObserver(note);

        // Make sure the Observer was notified
        expect(observerTestNote, isNotNull);
        expect(observerTestNote!.getName(), equals(name));
      });
    });
  }

  // Test Notification
  mvc.INotification? observerTestNote;

  // Callback method for Observer
  observerTestMethod(mvc.INotification note) {
    observerTestNote = note;
  }

  run() {
    _tests();
  }
}
