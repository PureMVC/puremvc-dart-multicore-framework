#import('package:unittest/unittest.dart');
#import('package:puremvc/puremvc.dart');

class MVCProxyTest 
{
  _tests() 
  {
    group('MVCProxyTest', ()
    {
      test('Constructor +name', () {
        String proxyName = "TestProxy1";
        IProxy proxy = new MVCProxy( proxyName );
        expect( proxy, isNotNull );
      });
      
      test('getName(), .name', () {
        // Create a Proxy
        String proxyName = "TestProxy2";
        IProxy proxy = new MVCProxy( proxyName );
        
        // Make sure the Proxy name was set
        expect( proxy.getName(), equals(proxyName) );
        expect( proxy.name, equals(proxyName) );
      });
      
      test('Constructor +data, getData(), .data', () {
        // Create some data
        List<String> data = ['red', 'green', 'blue'];

        // Create a Proxy with that data
        String proxyName = "TestProxy3";
        IProxy proxy = new MVCProxy( proxyName, data );
        
        // Make sure the Proxy was created
        expect( proxy, isNotNull );

        // Make sure the data was set
        expect( proxy.getData(), same(data) );
        expect( proxy.data, same(data) );
      });
      
      test('setData(), getData(), .data', () {
        // Create some data
        List<String> data = ['red', 'green', 'blue'];

        // Create a Proxy
        String proxyName = "TestProxy4";
        IProxy proxy = new MVCProxy( proxyName );
        
        // Call setData()
        proxy.setData( data );
        
        // Make sure the data was set
        expect( proxy.getData(), same(data) );
        expect( proxy.data, same(data) );
        
      });
      
      test('initializeNotifier()', () {
        // Create a Proxy
        String proxyName = "TestProxy5";
        INotifier notifier = new MVCProxy( proxyName );
        
        // Call initializeNotifier()
        String multitonKey = "ProxyTestKey";
        notifier.initializeNotifier( multitonKey );
        
        // Make sure the Proxy's multitonKey was set
        expect( notifier.multitonKey, isNotNull );
      });
    });
  }

  run() {
    _tests();
  }
}
