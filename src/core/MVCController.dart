/**
 * A Multiton [IController] implementation.
 * 
 * In PureMVC, an [IController] implementor 
 * follows the 'Command and Controller' strategy, and 
 * assumes these responsibilities:
 * 
 * -  Remembering which [ICommand]s are intended to handle which [INotifications].
 * -  Registering itself as an [IObserver] with the [View] for each [INotification] that it has an [ICommand] mapping for.
 * -  Creating a new instance of the proper [ICommand] to handle a given [INotification] when notified by the [IView].
 * -  Calling the [ICommand]'s [execute] method, passing in the [INotification]. 
 * 
 * See [INotification], [ICommand]
 */
class MVCController implements IController
{
    
  /**
   * Constructor. 
   * 
   * This [IController] implementation is a Multiton, 
   * so you should not call the constructor 
   * directly, but instead call the static [getInstance] method, 
   * passing the unique key for this instance 
   * 
   * Throws [MultitonControllerExistsError] Error if instance for this Multiton key has already been constructed
   * 
   */
  MVCController( String key )
  {
    if ( instanceMap[ key ] != null ) throw new MultitonControllerExistsError();
    multitonKey = key;
    instanceMap[ multitonKey ] = this;
    commandMap = new Map<String,Function>();    
    initializeController();    
  }
  
  /**
   * Initialize the Multiton [MVCController] instance.
   * 
   * Called automatically by the constructor. 
   * 
   * Note that if you are using a subclass of [MVCView]
   * in your application, you should also subclass [MVCController]
   * and override the [initializeController] method and set
   * [view] equal to the return value of a call to [getInstance]
   * on your [MVCView] subclass. 
   */
  void initializeController( )
  {
    view = MVCView.getInstance( multitonKey );
  }

  /**
   * <code>Controller</code> Multiton Factory method.
   * 
   * @return the Multiton instance of <code>Controller</code>
   */
  static IController getInstance( String key )
  {
    if ( instanceMap == null ) instanceMap = new Map<String,IController>();
    if ( instanceMap[ key ] == null ) instanceMap[ key ] = new MVCController( key );
    return instanceMap[ key ];
  }

  /**
   * Execute the [ICommand] previously registered as the
   * handler for [INotification]s with the given notification name.
   * 
   * Param [note] - the [INotification] to execute the associated [ICommand] for
   */
  void executeCommand( INotification note )
  {
    Function commandClassRef = commandMap[ note.getName() ];
    if ( commandClassRef == null ) return;

    ICommand commandInstance = commandClassRef();
    commandInstance.initializeNotifier( multitonKey );
    commandInstance.execute( note );
  }

  /**
   * Register a particular [ICommand] class as the handler 
   * for a particular [INotification].
   * 
   * Param [notificationName] - the name of the [INotification]
   * Param [commandClassRef] - the Class constructor of the [ICommand]
   */
  void registerCommand( String notificationName, Function commandClassRef )
  {
    if ( commandMap[ notificationName ] == null ) {
      view.registerObserver( notificationName, new MVCObserver( executeCommand, this ) );
    }
    commandMap[ notificationName ] = commandClassRef;
  }
  
  /**
   * Check if a Command is registered for a given Notification 
   * 
   * Param [notificationName] - the notification name to check on
   * Returns [bool] - whether an [ICommand] is currently registered for the given [notificationName].
   */
  bool hasCommand( String notificationName )
  {
    return commandMap[ notificationName ] != null;
  }

  /**
   * Remove a previously registered [ICommand] to [INotification] mapping.
   * 
   * Param [notificationName] - the name of the [INotification] to remove the [ICommand] mapping for
   */
  void removeCommand( String notificationName )
  {
    // if the Command is registered...
    if ( hasCommand( notificationName ) )
    {
      // remove the observer
      view.removeObserver( notificationName, this );
                  
      // remove the command
      commandMap[ notificationName ] = null;
    }
  }
  
  /**
   * Remove an [IController] instance
   * 
   * Param [key] multitonKey of the [IController] instance to remove
   */
  static void removeController( String key )
  {
    instanceMap[ key ] = null;
  }

  // Local reference to View 
  IView view;
  
  // Mapping of Notification names to Command Class references
  Map<String,Function> commandMap;

  // The Multiton Key for this Core
  String multitonKey;

  // Multiton instance map
  static Map<String,IController> instanceMap;

}

class MultitonControllerExistsError {
  const MultitonControllerExistsError();

  String toString() {
    return "Controller instance for this Multiton key already constructed!";
  }
}
