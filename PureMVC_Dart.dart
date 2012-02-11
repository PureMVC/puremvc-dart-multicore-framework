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

class PureMVC_Dart {

  PureMVC_Dart() {
  }

  void run() {
    write("Hello World!");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new PureMVC_Dart().run();
}
