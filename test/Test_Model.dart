class Test_Model
{
  _tests() 
  {
    group('Model', ()
    {
      test('getInstance()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest1";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );
        expect( model, isNotNull );
        
        // Same instance retrieved again 
        mvc.IModel again = mvc.Model.getInstance( multitonKey );
        expect( model, same(again) );        
      });
      
      test('registerProxy(), hasProxy()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest2";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "ModelTest2Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        model.registerProxy( proxy );
        
        // Make sure it's there
        expect( model.hasProxy( proxyName ), isTrue );
      });
      
      test('retrieveProxy()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest3";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "ModelTest3Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        model.registerProxy( proxy );
        
        // Make sure same Proxy is retrieved 
        expect( model.retrieveProxy( proxyName ), same(proxy) );
      });
      
      test('removeProxy(), hasProxy()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest4";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );

        // Register a Proxy
        String proxyName = "ModelTest4Proxy";
        mvc.IProxy proxy = new mvc.Proxy( proxyName );
        model.registerProxy( proxy );

        // Make sure it is returned when removed
        expect( model.removeProxy( proxyName ), same(proxy) );
        
        // Make sure Model doesn't know about it anymore
        expect( model.hasProxy( proxyName ), isFalse );
      });
      
      test('Model calls onRegister()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest5";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );

        // Register a Proxy
        mvc.IProxy proxy = new ModelTestProxy();
        model.registerProxy( proxy );

        // Make sure the Model calls the Proxy's onRegister() method 
        expect( proxy.getData(), equals(ModelTestProxy.ON_REGISTER_CALLED) );
      });
      
      test('Model calls onRemove()', () {
        // Unique multiton instance of Model
        String multitonKey = "ModelTest6";
        mvc.IModel model = mvc.Model.getInstance( multitonKey );

        // Register a Proxy
        mvc.IProxy proxy = new ModelTestProxy();
        model.registerProxy( proxy );

        // Remove the Proxy
        model.removeProxy( ModelTestProxy.NAME );

        // Make sure the Model calls the Proxy's onRemove() method 
        expect( proxy.getData(), equals(ModelTestProxy.ON_REMOVE_CALLED) );
      });
    });
  }

  run() {
    _tests();
  }
}

class ModelTestProxy extends mvc.Proxy
{
  static String NAME = "ModelTestProxyClass";
  static String FRESH = "Fresh Instance";
  static String ON_REGISTER_CALLED = "onRegister() Called";
  static String ON_REMOVE_CALLED = "onRemove() Called";
  
  ModelTestProxy():super( NAME ){
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
