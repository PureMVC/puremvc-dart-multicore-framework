import 'dart:html';
import 'package:puremvc/puremvc.dart' as mvc;

class Framework_Verify {

  Framework_Verify() {
  }

  void verify()
  {
    String multitonKey = "Test Core";
    String dataPoint1 = "Hello";
    String dataPoint2 = "World";
    String proxyName = "DataProxy";
    List<String> retrievedObject;
    String badJuju = "";

    try {
      write ("<UL>");

      // Get a Facade
      mvc.IFacade facade = mvc.Facade.getInstance( multitonKey );
      write ("<LI>Facade created for ${multitonKey}.");

      // Create some data
      List<String> dataObject = new List<String>();
      write ("<LI>Data Object (List&ltString&gt) created.</LI>");
      dataObject.add(dataPoint1);
      write ("<LI>Data point added '${dataPoint1}'.</LI>");
      dataObject.add(dataPoint2);
      write ("<LI>Data point added '${dataPoint2}'.</LI>");

      // Register a Proxy to hold the data
      mvc.IProxy proxy = new mvc.Proxy( proxyName, dataObject );
      write( "<LI>Proxy '${proxyName}' created with for Data Object.</LI>");
      facade.registerProxy( proxy );
      write ("<LI>Proxy '${proxyName}' registered with Model, via Facade.</LI>");

      // Now retrieve the Proxy
      mvc.IProxy retrievedProxy = facade.retrieveProxy( proxyName );
      write ("<LI>Proxy '${proxyName}' retrieved from Model, via Facade.</LI>");

      // And get the data
      retrievedObject = retrievedProxy.getData();
      write ("<LI>Data Object (List&ltString&gt) retrieved from ${proxyName}</LI>");
      write("<LI>Data Object (List&ltString&gt) Length: ${retrievedObject.length}</LI>" );
      write("<LI>Contents: ${retrievedObject[0]} ${retrievedObject[1]}</LI>");

      write ("</UL>");
      // Prove errors will be reported
      // throw "Fungers! I've got jelly in my ears!";

    } on Error catch ( e ) {
      // Catch any error
      badJuju = e.toString();

    } finally {
      // Report final status
      if ( badJuju.length == 0 && retrievedObject != null
           && retrievedObject[0] == dataPoint1
           && retrievedObject[1] == dataPoint2 ){
        write( "<P/><B>Science!</B> PureMVC is purring like a kitten. Take her out for a spin!");
      } else {
        write( "<P/><B>Claptrap!</B> Someone's thrown a spanner in the works.");
        if( badJuju.length>0 ) write( "<B>Bad juju reported:</B> ${badJuju}");
      }
    }

  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.querySelector('#text').innerHtml = "${document.querySelector('#text').innerHtml}${message}";
  }
}

void main() {
  new Framework_Verify().verify();
}
