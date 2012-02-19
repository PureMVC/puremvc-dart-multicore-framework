/**
 * The interface definition for a PureMVC [MVCController].
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
interface IController
{

  /**
   * Register a particular [ICommand] class as the handler 
   * for a particular [INotification].
   * 
   * Param [notificationName] - the name of the [INotification]
   * Param [commandClassRef] - the Class constructor of the [ICommand]
   */
  void registerCommand( String notificationName, Function commandClassRef );
  
  /**
   * Execute the [ICommand] previously registered as the
   * handler for [INotification]s with the given notification name.
   * 
   * Param [note] - the [INotification] to execute the associated [ICommand] for
   */
  void executeCommand( INotification note );

  /**
   * Remove a previously registered [ICommand] to [INotification] mapping.
   * 
   * Param [notificationName] - the name of the [INotification] to remove the [ICommand] mapping for
   */
  void removeCommand( String notificationName );

  /**
   * Check if a Command is registered for a given Notification 
   * 
   * Param [notificationName] - the notification name to check on
   * Returns [bool] - whether an [ICommand] is currently registered for the given [notificationName].
   */
  bool hasCommand( String notificationName );

  /**
   * This IController's Multiton Key
   */
  void set multitonKey( String key );
  String get multitonKey();
  
}
