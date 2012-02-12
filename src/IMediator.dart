/**
 * The interface definition for a PureMVC [Mediator].
 *
 * In PureMVC, [IMediator] implementors assume these responsibilities:
 * - Implement a common method which returns a list of all [INotification]s the [IMediator] has interest in
 * - Implement a notification callback method
 * - Implement methods that are called when the [IMediator] is registered or removed from an [IView].
 *
 * Additionally, [IMediator]s typically:
 * - Act as an intermediary between one or more view components such as text boxes or list controls, maintaining references and coordinating their behavior.
 * - This is often the place where event listeners are added to view components, and their handlers implemented.
 * - Respond to and generate [INotifications], interacting with of  the rest of the PureMVC app.
 *  
 * When an [IMediator] is registered with the [IView], 
 * the [IView] will call the [IMediator]'s [listNotificationInterests] method. 
 * The [IMediator] will return an [Array] of [INotification] names which it wishes to be notified about.
 * 
 * The [IView] will then create an [Observer] object 
 * encapsulating that [IMediator]'s ([handleNotification]) method
 * and register it as an Observer for each [INotification] name returned by 
 * [listNotificationInterests].
 * 
 * See [INotification], [IView]
 */
interface IMediator extends INotifier
{
    
  /**
   * Get the [IMediator] instance name
   * 
   * Returns [String] - the [IMediator] instance name
   */
  String getMediatorName();
  
  /**
   * Get the [IMediator]'s view component.
   * 
   * Returns [Object] - the view component
   */
  Object getViewComponent();

  /**
   * Set the [IMediator]'s view component.
   * 
   * Param [Object] - the view component
   */
  void setViewComponent( Object viewComponent );
  
  /**
   * List [INotification] interests.
   * 
   * Returns a [List<String>] of the [INotification] names this [IMediator] has an interest in.
   */
  List<String> listNotificationInterests( );
  
  /**
   * Handle an [INotification].
   * 
   * Param [note] - the [INotification] to be handled
   */
  void handleNotification( INotification note );
  
  /**
   * Called by the [IView] when the [IMediator] is registered
   */ 
  void onRegister( );

  /**
   * Called by the [IView] when the [IMediator] is removed
   */ 
  void onRemove( );   
}