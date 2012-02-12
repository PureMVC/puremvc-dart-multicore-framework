#import('dart:html');
#import('src/puremvc.dart');

class PureMVC_Dart {

  PureMVC_Dart() {
  }

  void test() 
  {
    write("Testing");

    // Get a Facade
    String multitonKey = "Test Core";
    IFacade facade = MVCFacade.getInstance( multitonKey );
    write ("Facade created");
    
    // Create some data 
    List<String> dataObject = new List<String>();
    dataObject.add("Hello");
    dataObject.add("World");
    write ("Data Object created");
    
    // Register a Proxy to hold the data
    String proxyName = "MessageProxy";
    IProxy proxy = new MVCProxy( proxyName, dataObject );
    write( "Proxy created");
    
    facade.registerProxy( proxy );
    write ("Proxy registered");
    
    // Now retrieve the Proxy
    IProxy retrievedProxy = facade.retrieveProxy( proxyName );
    write ("Proxy retrieved");

    List<String> retrievedObject = retrievedProxy.getData();
    write ("Data Object retrieved");
    
    write("List Length: " + retrievedObject.length );

  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = document.query('#status').innerHTML + "<br/>" + message;
  }
}

void main() {
  new PureMVC_Dart().test();
}
