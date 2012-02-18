/**
 * A base [IMediator] implementation. 
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
class MVCMediator extends MVCNotifier implements IMediator
{

  /**
   * The name of the [IMediator]. 
   * 
   * Typically, an [MVCMediator] subclass will be written to serve
   * one specific control or group controls and so,
   * will not have a need to be dynamically named. 
   */
  static String NAME = "Mediator";
    
  /**
   * Constructor.
   */
  MVCMediator( [String mediatorName, Dynamic viewComponent] ) 
  {
    this.mediatorName = (mediatorName != null)?mediatorName:NAME; 
    setViewComponent( viewComponent );    
  }
  
  /**
   * Get the [IMediator] instance name
   * 
   * Returns [String] - the [IMediator] instance name
   */
  String getMediatorName() 
  {    
    return mediatorName;
  }

  /**
   * Set the [IMediator]'s view component.
   * 
   * Param [Dynamic] - the view component
   */
  void setViewComponent( Dynamic component ) 
  {
    viewComponent = component;
  }

  /**
   * Get the [IMediator]'s view component.
   * 
   * Returns [Object] - the view component
   */
  Object getViewComponent()
  {    
    return viewComponent;
  }

  /**
   * List [INotification] interests.
   * 
   * Returns a [List<String>] of the [INotification] names this [IMediator] has an interest in.
   */
  List<String> listNotificationInterests( )
  {
    return new List<String>();
  }

  /**
   * Handle an [INotification].
   * 
   * Param [note] - the [INotification] to be handled
   */
  void handleNotification( INotification note ) {}
  
  /**
   * Called by the [IView] when the [IMediator] is registered
   */ 
  void onRegister( ) {}

  /**
   * Called by the [IView] when the [IMediator] is removed
   */ 
  void onRemove( ) {}

  // the mediator name
  String mediatorName;

  // The view component
  Object viewComponent;
}
