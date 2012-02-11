/**
 * The interface definition for a PureMVC [Notifier].
 * 
 * [MacroCommand], [Command], [Mediator] and [Proxy]
 * all have a need to send [Notifications].
 * 
 * The [INotifier] interface provides a common method called
 * [sendNotification] that relieves implementation code of 
 * the necessity to actually construct [INotification]s.
 * 
 * The [Notifier] class, which all of the above mentioned classes
 * extend, also provides an initialized reference to the [Facade]
 * Multiton, which is required for the convienience method
 * for sending [Notification]s, but also eases implementation as these
 * classes have frequent [IFacade] interactions and usually require
 * access to the facade anyway.
 * 
 * See [IFacade], [INotification]
 */
interface INotifier {

  /**
   * Send an [INotification].
   * 
   * Convenience method to prevent having to construct new 
   * notification instances in our implementation code.
   * 
   * Param [notificationName] the name of the notification to send
   * Param [body] - the body of the notification (optional)
   * Param [type] - the type of the notification (optional)
   */ 
  void sendNotification( String notificationName, Object body, String type ); 

  /**
   * Initialize this [INotifier] instance.
   *
   * This is how a [Notifier] gets its [multitonKey]. 
   * Calls to [sendNotification] or to access the
   * facade will fail until after this method 
   * has been called.
   * 
   * Param [key] - the [multitonKey] for this [INotifier] to use
   */
  void initializeNotifier( String key );

  
}
