#import('dart:html');
#source('ICommand.dart');
#source('INotifier.dart');
#source('INotification.dart');
#source('IObserver.dart');
#source('IMediator.dart');
#source('IProxy.dart');
#source('IModel.dart');
#source('IView.dart');
#source('IController.dart');
#source('IFacade.dart');
#source('MVCNotification.dart');
#source('MVCProxy.dart');
#source('MVCObserver.dart');
#source('MVCNotifier.dart');
#source('MVCFacade.dart');
#source('MVCModel.dart');
#source('MVCView.dart');
#source('MVCController.dart');
#source('MVCMediator.dart');
#source('MVCMacroCommand.dart');

class PureMVC {

  PureMVC() {
  }

  void test() 
  {
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
    IProxy proxy = new MVCProxy( "HelloProxy", dataObject );
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
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new PureMVC().test();
}
